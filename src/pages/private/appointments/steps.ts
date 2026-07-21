import type { AppointmentStepName } from "./types";

// Ordem canônica das etapas do fluxo de agendamento, conforme o design.
export const APPOINTMENT_STEP_ORDER: AppointmentStepName[] = [
	"Exames",
	"Coleta",
	"Análise do Leite",
	"Confirmação",
];
