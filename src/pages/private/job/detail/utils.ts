import { EnumJobStatus } from "@/services/types/i-job";
import { formatAppointmentDate } from "../format";
import type { AppointmentDetail, AppointmentStepItem } from "../types";

export function getSubLabel(step: AppointmentStepItem, ended: boolean): string {
	const date = step.date ? ` · ${formatAppointmentDate(step.date)}` : "";
	switch (step.state) {
		case "done":
			return `Concluída${date}`;
		case "failed":
			return `Não concluída${date}`;
		case "current":
			return "Etapa atual";
		default:
			return ended ? "Não realizada" : "Aguardando liberação";
	}
}

export function getStepLabel(appointment: AppointmentDetail): string {
    if (appointment.status === EnumJobStatus.Failed) {
        return "Interrompida na etapa";
    }
    if (appointment.status === EnumJobStatus.Done) {
        return "Etapa final da doação";
    }
    return "Etapa atual da doação";
}