import { FlaskConical } from "lucide-react";
import {
	EnumDonationStepName,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";
import { EnumJobStatus } from "@/services/types/i-job";

export type AdminStepVisualStatus = "done" | "current" | "locked";

export interface AdminStepDefinition {
	order: number;
	name: EnumDonationStepName;
	label: string;
	icon: typeof FlaskConical;
}

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

export const JOB_STATUS_BADGE_CLASSNAME: Record<EnumJobStatus, string> = {
	[EnumJobStatus.Pending]: "bg-[#faeeda] text-[#854f0b]",
	[EnumJobStatus.Done]: "bg-[#e1f5ee] text-[#0f6e56]",
	[EnumJobStatus.Failed]: "bg-[#fcebeb] text-[#a32d2d]",
};

export const EDITABLE_STATUSES = Object.values(EnumDonationStepStatus).filter(
	(status) =>
		status !== EnumDonationStepStatus.Done &&
		status !== EnumDonationStepStatus.Failed,
);
