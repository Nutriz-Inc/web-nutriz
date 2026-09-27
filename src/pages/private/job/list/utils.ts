import { EnumJobStatus } from "@/services/types/i-job";
import type { Appointment, AppointmentStatus } from "../types";

const ENDED_STATUSES: AppointmentStatus[] = [
	EnumJobStatus.Done,
	EnumJobStatus.Failed,
];

export function isEndedStatus(status: AppointmentStatus): boolean {
	return ENDED_STATUSES.includes(status);
}

export function resumoDoRelatorio(
	appointment: Appointment,
	canFillReport = true,
): { texto: string; destaque: boolean } {
	if (appointment.hasReport) return { texto: "Disponível", destaque: true };
	if (isEndedStatus(appointment.status)) {
		return { texto: "Sem relatório", destaque: false };
	}
	if (!canFillReport) return { texto: "A preencher", destaque: false };
	return { texto: "Preencher", destaque: true };
}
