import { EnumJobStatus } from "@/services/types/i-job";
import type { AppointmentStatus } from "../types";

export const STATUS_OPTION_DESCRIPTION: Record<AppointmentStatus, string> = {
	[EnumJobStatus.Pending]: "Antes da realização da ação.",
	[EnumJobStatus.Done]: "Ação deu certo e a doação foi encerrada.",
	[EnumJobStatus.Failed]: "Etapa não deu certo e a doação foi encerrada.",
};

export const STATUS_OPTION_ORDER: AppointmentStatus[] = [
	EnumJobStatus.Pending,
	EnumJobStatus.Done,
	EnumJobStatus.Failed,
];
