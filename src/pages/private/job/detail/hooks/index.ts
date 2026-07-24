import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import services from "@/services";
import type { EnumJobStatus, IGetJobResponse } from "@/services/types/i-job";
import { formatAppointmentLocation } from "../../format";
import { isEndedStatus } from "../../list/utils";
import { toFinalResult, toReports, toStepItems } from "../../mapper";
import type {
	AppointmentDetail,
	AppointmentFinalResult,
	AppointmentReport,
	AppointmentStepItem,
} from "../../types";

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

type DonationTrail = {
	steps: AppointmentStepItem[];
	reports: AppointmentReport[];
	finalResult?: AppointmentFinalResult;
};

const EMPTY_TRAIL: DonationTrail = { steps: [], reports: [] };

const DONATION_SCAN_CHUNK = 5;

async function fetchDonationTrail(
	job: IGetJobResponse,
): Promise<DonationTrail> {
	if (!job.id_user_common || !job.id_step) return EMPTY_TRAIL;

	try {
		const [donations, jobs] = await Promise.all([
			services.donation.list({
				page: 1,
				page_size: 50,
				id_user_common: job.id_user_common,
			}),
			services.job.list({
				page: 1,
				page_size: 50,
				id_user_common: job.id_user_common,
			}),
		]);

		let donation: Awaited<ReturnType<typeof services.donation.get>> | undefined;

		for (
			let index = 0;
			index < donations.data.length && !donation;
			index += DONATION_SCAN_CHUNK
		) {
			const chunk = donations.data.slice(index, index + DONATION_SCAN_CHUNK);
			const details = await Promise.all(
				chunk.map((item) => services.donation.get(item.id_donation)),
			);
			donation = details.find((detail) =>
				detail.steps.some((step) => step.id_donation_step === job.id_step),
			);
		}

		if (!donation) return EMPTY_TRAIL;

		const steps = toStepItems(donation.steps, job);
		const reports = toReports(donation.steps, jobs.data);
		const finalResult = toFinalResult(job, donation, jobs.data, reports);

		return { steps, reports, finalResult };
	} catch {
		return EMPTY_TRAIL;
	}
}

export function useAppointmentDetail(id_job: string) {
	return useQuery({
		queryKey: ["appointment-detail", id_job],
		enabled: Boolean(id_job),
		staleTime: 10000,
		queryFn: async (): Promise<AppointmentDetail> => {
			const job = await services.job.get(id_job);

			const [donor, address, trail] = await Promise.all([
				job.id_user_common
					? services.user.get(job.id_user_common, {
							show_address: true,
							show_baby: false,
							show_donations_completed: false,
							show_current_donation: false,
						})
					: undefined,
				job.id_address ? services.user.getAddresses(job.id_address) : undefined,
				fetchDonationTrail(job),
			]);

			return {
				id: job.id_job,
				donorName: donor?.name ?? "—",
				donorPhone: donor?.phone_number,
				donorEmail: donor?.email,
				dateSet: job.date_set ?? "",
				locationName: formatAppointmentLocation(
					address ?? donor?.addresses?.[0],
				),
				stepName: job.name,
				description: job.description,
				status: job.status,
				hasReport: Boolean(job.user_feedback),
				ended: isEndedStatus(job.status),
				steps: trail.steps,
				reports: trail.reports,
				finalResult: trail.finalResult,
			};
		},
	});
}
