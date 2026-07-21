import type { EnumDonationStepStatus } from "@/services/types/i-donation";

// O status de um agendamento reaproveita o enum de status de etapa da doação
// (Pending/Review/Done/Warn/Failed), que mapeia exatamente para os 5 status do
// design: Aguardando, Em Processamento, Concluído, Atenção, Não Concluído.
export type AppointmentStatus = EnumDonationStepStatus;

// As etapas exibidas no fluxo de agendamento seguem o design (não o
// EnumDonationStepName, que difere). Ficam centralizadas em steps.ts.
export type AppointmentStepName =
	| "Exames"
	| "Coleta"
	| "Análise do Leite"
	| "Confirmação";

// Um agendamento atribuído a um(a) enfermeiro(a). Espelha o que o endpoint
// `GET /internal/job` (services.job.list) deverá enriquecer no futuro:
// donorName ← user_common_name, dateSet ← date_set, locationName ← address,
// stepName ← id_step, status ← status da etapa atual.
export type Appointment = {
	id: string;
	donorName: string;
	dateSet: string; // ISO
	locationName: string;
	stepName: AppointmentStepName;
	status: AppointmentStatus;
	hasReport: boolean;
};

export type AppointmentStepState = "done" | "failed" | "current" | "locked";

export type AppointmentStepItem = {
	name: AppointmentStepName;
	state: AppointmentStepState;
	date?: string; // ISO, preenchido quando concluída/não concluída
};

export type AppointmentReport = {
	stepName: AppointmentStepName;
	status: AppointmentStatus;
	date: string; // ISO
	responsible: string;
	text: string;
};

export type AppointmentFinalResult = {
	status: AppointmentStatus; // Done ou Failed
	description: string;
	endedAt: string; // ISO
	responsible: string;
};

export type AppointmentDetail = Appointment & {
	ended: boolean;
	finalResult?: AppointmentFinalResult;
	steps: AppointmentStepItem[];
	reports: AppointmentReport[];
};
