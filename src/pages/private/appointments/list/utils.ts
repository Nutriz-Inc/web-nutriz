import { EnumDonationStepStatus } from "@/services/types/i-donation";
import { onlyDigits } from "@/utils/formatter";
import { formatAppointmentDate } from "../format";
import type { Appointment, AppointmentStatus } from "../types";

export type AppointmentTab = "andamento" | "concluidas";

const ENDED_STATUSES: AppointmentStatus[] = [
	EnumDonationStepStatus.Done,
	EnumDonationStepStatus.Failed,
];

export function isEndedStatus(status: AppointmentStatus): boolean {
	return ENDED_STATUSES.includes(status);
}

function formatDateFilter(digits: string): string {
	return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}

// Filtra pela aba (andamento/concluídas) e, opcionalmente, por uma data
// no formato dd/mm/aaaa digitada no filtro de período.
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
