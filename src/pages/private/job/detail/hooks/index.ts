import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStepDefinitions } from "@/pages/private/donations/common/info/constants";
import services from "@/services";
import type { IGetJobResponse } from "@/services/types/i-job";
import { EnumJobStatus } from "@/services/types/i-job";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { isEndedStatus } from "../../list/utils";
import type {
	AppointmentDetail,
	AppointmentFinalResult,
	AppointmentReport,
	AppointmentStepItem,
} from "../../types";
import { formatLocation } from "../../utils";

type UpdateAppointmentInput = {
	status: EnumJobStatus;
	report: string;
};

export function useUpdateAppointment(id_job: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ status, report }: UpdateAppointmentInput) =>
			services.job.update(id_job, {
				status,
				...(report.trim() ? { user_feedback: report.trim() } : {}),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["appointment-detail", id_job],
			});
			queryClient.invalidateQueries({ queryKey: ["appointments-list"] });
		},
	});
}

async function fetchNurseName(id_user?: string): Promise<string> {
	if (!id_user) return "—";

	try {
		const nurse = await services.user.get(id_user, {
			show_address: false,
			show_baby: false,
			show_donations_completed: false,
			show_current_donation: false,
		});
		return nurse.name ?? "—";
	} catch {
		return "—";
	}
}

async function fetchJobDonationRecurrence(job: IGetJobResponse) {
	if (!job.id_user_common) return false;

	try {
		const { data } = await services.job.list({
			page: 1,
			page_size: DEFAULT_PAGE_SIZE,
			id_user_common: job.id_user_common,
		});

		const id_donation = data.find(
			(item) => item.id_job === job.id_job,
		)?.id_donation;

		if (!id_donation) return false;

		const donation = await services.donation.get(id_donation);

		return donation.is_recurrent;
	} catch {
		return false;
	}
}

function toStepItems(
	job: IGetJobResponse,
	isRecurrent: boolean,
): AppointmentStepItem[] {
	const definitions = getStepDefinitions(isRecurrent);
	const currentOrder = definitions.find(
		(definition) => definition.name === job.name,
	)?.order;

	return definitions.map((definition) => {
		if (currentOrder === undefined || definition.order > currentOrder) {
			return { name: definition.name, state: "locked" as const };
		}
		if (definition.order < currentOrder) {
			return { name: definition.name, state: "done" as const };
		}
		if (job.status === EnumJobStatus.Done) {
			return {
				name: definition.name,
				state: "done" as const,
				date: job.updated_at ?? job.date_set,
			};
		}
		if (job.status === EnumJobStatus.Failed) {
			return {
				name: definition.name,
				state: "failed" as const,
				date: job.updated_at ?? job.date_set,
			};
		}
		return { name: definition.name, state: "current" as const };
	});
}

function toReports(
	job: IGetJobResponse,
	responsible: string,
): AppointmentReport[] {
	if (!job.user_feedback) return [];

	return [
		{
			stepName: job.name,
			status: job.status,
			date: job.updated_at ?? job.date_set ?? job.created_at,
			responsible,
			text: job.user_feedback,
		},
	];
}

function toFinalResult(
	job: IGetJobResponse,
	responsible: string,
): AppointmentFinalResult | undefined {
	if (job.status !== EnumJobStatus.Done && job.status !== EnumJobStatus.Failed)
		return undefined;

	const description =
		job.user_feedback ??
		(job.status === EnumJobStatus.Done
			? `Etapa "${job.name}" concluída com sucesso.`
			: `Doação encerrada na etapa ${job.name}.`);

	return {
		status: job.status,
		description,
		endedAt: job.updated_at ?? job.date_set ?? "",
		responsible,
	};
}

export function useAppointmentDetail(id_job: string) {
	return useQuery({
		queryKey: ["appointment-detail", id_job],
		enabled: Boolean(id_job),
		staleTime: 10000,
		queryFn: async (): Promise<AppointmentDetail> => {
			const job = await services.job.get(id_job);
			const ended = isEndedStatus(job.status);

			const [donor, address, nurseName, isRecurrent] = await Promise.all([
				job.id_user_common
					? services.user.get(job.id_user_common, {
							show_address: true,
							show_baby: false,
							show_donations_completed: false,
							show_current_donation: false,
						})
					: undefined,
				job.id_address ? services.user.getAddresses(job.id_address) : undefined,
				ended ? fetchNurseName(job.id_user) : "—",
				fetchJobDonationRecurrence(job),
			]);

			return {
				id: job.id_job,
				id_user_common: job.id_user_common,
				donorName: donor?.name ?? "—",
				donorPhone: donor?.phone_number,
				donorEmail: donor?.email,
				dateSet: job.date_set ?? "",
				locationName: formatLocation(address ?? donor?.addresses?.[0]),
				stepName: job.name,
				description: job.description,
				status: job.status,
				hasReport: Boolean(job.user_feedback),
				ended,
				steps: toStepItems(job, isRecurrent),
				reports: toReports(job, nurseName),
				finalResult: ended ? toFinalResult(job, nurseName) : undefined,
			};
		},
	});
}
