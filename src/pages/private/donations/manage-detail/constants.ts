import { FlaskConical, Milk, Truck, Warehouse } from "lucide-react";
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

export const ADMIN_STEP_DEFINITIONS: AdminStepDefinition[] = [
	{
		order: 1,
		name: EnumDonationStepName.BloodTest,
		label: "Exame",
		icon: FlaskConical,
	},
	{
		order: 2,
		name: EnumDonationStepName.DeliverMilkingKit,
		label: "Entrega do Kit de Ordenha",
		icon: Truck,
	},
	{
		order: 3,
		name: EnumDonationStepName.CollectMilk,
		label: "Coleta",
		icon: Milk,
	},
	{
		order: 4,
		name: EnumDonationStepName.MilkAnalysis,
		label: "Estocagem",
		icon: Warehouse,
	},
];

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
