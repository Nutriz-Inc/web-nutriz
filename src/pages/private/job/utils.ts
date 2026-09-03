import type { IJobResponse } from "@/services/types/i-job";
import type { Address } from "@/services/types/i-user";
import type { Appointment } from "./types";

export function formatLocation(address?: Address): string {
	if (!address) return "—";

	const street = [address.street, address.number ?? "s/n"]
		.filter(Boolean)
		.join(", ");
	const region = [address.city, address.state].filter(Boolean).join("/");

	return [street, address.neighborhood, region].filter(Boolean).join(" - ");
}

export function toAppointment(job: IJobResponse): Appointment {
	return {
		id: job.id_job,
		donorName: job.user_common_name ?? "—",
		nurseName: job.user_nurse_name,
		dateSet: job.date_set ?? "",
		locationName: formatLocation(job.address),
		stepName: job.name,
		description: job.description,
		status: job.status,
		hasReport: Boolean(job.user_feedback),
	};
}
