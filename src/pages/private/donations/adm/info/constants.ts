import type { BadgeTone } from "@/components/ui/badge";
import { EnumDonationStepStatus } from "@/services/types/i-donation";
import { EnumJobStatus } from "@/services/types/i-job";

export type AdminStepVisualStatus = "done" | "current" | "locked";

export const ADMIN_STEP_STATUS_LABEL: Record<EnumDonationStepStatus, string> = {
	[EnumDonationStepStatus.Pending]: "Pendente",
	[EnumDonationStepStatus.Review]: "Em análise",
	[EnumDonationStepStatus.Done]: "Concluído",
	[EnumDonationStepStatus.Warn]: "Aviso",
	[EnumDonationStepStatus.Failed]: "Erro",
};

export const JOB_STATUS_LABEL: Record<EnumJobStatus, string> = {
	[EnumJobStatus.Pending]: "Pendente",
	[EnumJobStatus.Done]: "Concluído",
	[EnumJobStatus.Failed]: "Falhou",
};

export const JOB_STATUS_TONE: Record<EnumJobStatus, BadgeTone> = {
	[EnumJobStatus.Pending]: "warning",
	[EnumJobStatus.Done]: "success",
	[EnumJobStatus.Failed]: "error",
};

export const EDITABLE_STATUSES = Object.values(EnumDonationStepStatus).filter(
	(status) =>
		status !== EnumDonationStepStatus.Done &&
		status !== EnumDonationStepStatus.Failed,
);
