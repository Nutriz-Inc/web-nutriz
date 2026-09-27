import { EnumJobStatus } from "@/services/types/i-job";
import { onlyDigits } from "@/utils/formatter";
import type { Appointment, AppointmentStatus } from "../types";

const ENDED_STATUSES: AppointmentStatus[] = [
	EnumJobStatus.Done,
	EnumJobStatus.Failed,
];

export function isEndedStatus(status: AppointmentStatus): boolean {
	return ENDED_STATUSES.includes(status);
}

export function getReportHint(
	appointment: Appointment,
	canFillReport = true,
): {
	text: string;
	highlighted: boolean;
} {
	if (appointment.hasReport) {
		return { text: "Relatório disponível · toque para ver", highlighted: true };
	}
	if (isEndedStatus(appointment.status)) {
		return { text: "Encerrado sem relatório", highlighted: false };
	}
	if (!canFillReport) {
		return { text: "Relatório ainda não preenchido", highlighted: false };
	}
	return { text: "Toque para preencher o relatório", highlighted: true };
}

export function toDateSetParam(dateFilter: string): string | undefined {
	const digits = onlyDigits(dateFilter);
	if (digits.length !== 8) return undefined;

	const day = digits.slice(0, 2);
	const month = digits.slice(2, 4);
	const year = digits.slice(4, 8);
	return `${year}-${month}-${day}`;
}
