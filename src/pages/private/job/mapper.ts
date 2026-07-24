import type {
	DonationStep,
	IGetDonationResponse,
} from "@/services/types/i-donation";
import { EnumDonationStepStatus } from "@/services/types/i-donation";
import type { IGetJobResponse, IJobResponse } from "@/services/types/i-job";
import { EnumJobStatus } from "@/services/types/i-job";
import { formatAppointmentLocation } from "./format";
import { findStepDefinition } from "./steps";
import type {
	Appointment,
	AppointmentFinalResult,
	AppointmentReport,
	AppointmentStepItem,
} from "./types";

export function toAppointment(job: IJobResponse): Appointment {
	return {
		id: job.id_job,
		donorName: job.user_common_name ?? "—",
		dateSet: job.date_set ?? "",
		locationName: formatAppointmentLocation(job.address),
		stepName: job.name,
		description: job.description,
		status: job.status,
		hasReport: Boolean(job.user_feedback),
	};
}

function sortSteps(steps: DonationStep[]): DonationStep[] {
	return [...steps].sort((a, b) => {
		const orderA = findStepDefinition(a.name)?.order ?? 99;
		const orderB = findStepDefinition(b.name)?.order ?? 99;
		if (orderA !== orderB) return orderA - orderB;
		return a.created_at.localeCompare(b.created_at);
	});
}

export function toStepItems(
	steps: DonationStep[],
	job: IGetJobResponse,
): AppointmentStepItem[] {
	return sortSteps(steps).map((step) => {
		if (step.status === EnumDonationStepStatus.Done) {
			return {
				name: step.name,
				state: "done" as const,
				date: step.completed_at ?? step.set_date,
			};
		}
		if (step.status === EnumDonationStepStatus.Failed) {
			return {
				name: step.name,
				state: "failed" as const,
				date: step.completed_at ?? step.set_date,
			};
		}
		if (step.id_donation_step === job.id_step) {
			if (job.status === EnumJobStatus.Done) {
				return {
					name: step.name,
					state: "done" as const,
					date: job.updated_at ?? job.date_set,
				};
			}
			if (job.status === EnumJobStatus.Failed) {
				return {
					name: step.name,
					state: "failed" as const,
					date: job.updated_at ?? job.date_set,
				};
			}
			return { name: step.name, state: "current" as const };
		}
		return { name: step.name, state: "locked" as const };
	});
}

export function toReports(
	steps: DonationStep[],
	jobs: IJobResponse[],
): AppointmentReport[] {
	const stepsById = new Map(steps.map((step) => [step.id_donation_step, step]));

	return jobs
		.filter((job) => job.user_feedback && stepsById.has(job.id_step))
		.map((job) => ({
			stepName: stepsById.get(job.id_step)?.name ?? job.name,
			status: job.status,
			date: job.updated_at ?? job.date_set ?? job.created_at,
			responsible: job.user_nurse_name ?? "—",
			text: job.user_feedback ?? "",
		}))
		.sort((a, b) => a.date.localeCompare(b.date));
}

export function toFinalResult(
	job: IGetJobResponse,
	donation: IGetDonationResponse,
	jobs: IJobResponse[],
	reports: AppointmentReport[],
): AppointmentFinalResult | undefined {
	if (
		job.status !== EnumJobStatus.Done &&
		job.status !== EnumJobStatus.Failed
	) {
		return undefined;
	}

	const self = jobs.find((item) => item.id_job === job.id_job);
	const lastReport = reports[reports.length - 1];

	const description =
		donation.user_feedback ??
		(job.status === EnumJobStatus.Done
			? donation.quantity_donated
				? `Doação concluída com sucesso. ${donation.quantity_donated} ml aprovados e destinados ao BLH.`
				: "Doação concluída com sucesso."
			: `Doação encerrada na etapa ${job.name}.`);

	return {
		status: job.status,
		description,
		endedAt: job.updated_at ?? job.date_set ?? "",
		responsible: self?.user_nurse_name ?? lastReport?.responsible ?? "—",
	};
}
