import { EnumJobStatus } from "@/services/types/i-job";
import { onlyDigits } from "@/utils/formatter";
import { formatAppointmentDate } from "../format";
import type { Appointment, AppointmentStatus } from "../types";

export type AppointmentTab = "andamento" | "concluidas";

const ENDED_STATUSES: AppointmentStatus[] = [
	EnumJobStatus.Done,
	EnumJobStatus.Failed,
];

export function isEndedStatus(status: AppointmentStatus): boolean {
	return ENDED_STATUSES.includes(status);
}

export function getReportHint(appointment: Appointment): {
	text: string;
	highlighted: boolean;
} {
	if (appointment.hasReport) {
		return { text: "Relatório disponível · toque para ver", highlighted: true };
	}
	if (isEndedStatus(appointment.status)) {
		return { text: "Encerrado sem relatório", highlighted: false };
	}
	return { text: "Toque para preencher o relatório", highlighted: true };
}

function formatDateFilter(digits: string): string {
	return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}

export function filterAppointments(
	appointments: Appointment[],
	tab: AppointmentTab,
	dateFilter: string,
): Appointment[] {
	const digits = onlyDigits(dateFilter);
	const hasFullDate = digits.length === 8;

	return appointments.filter((appointment) => {
		const matchesTab =
			tab === "concluidas"
				? isEndedStatus(appointment.status)
				: !isEndedStatus(appointment.status);
		if (!matchesTab) return false;

		if (!hasFullDate) return true;
		return (
			formatAppointmentDate(appointment.dateSet) === formatDateFilter(digits)
		);
	});
}
