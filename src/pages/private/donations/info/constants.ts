import { FlaskConical, Milk, Truck, Warehouse } from "lucide-react";
import { EnumDonationStepName } from "@/services/types/i-donation";

export type StepVisualStatus = "done" | "current" | "waiting";

export const BADGE_LABEL: Record<StepVisualStatus, string> = {
	done: "CONCLUÍDO",
	current: "EM ANDAMENTO",
	waiting: "AGUARDANDO",
};

export const BADGE_CLASSNAME: Record<StepVisualStatus, string> = {
	done: "bg-[#e1f5ee] text-[#0f6e56]",
	current: "bg-[#dbe7f6] text-[#00458b]",
	waiting: "bg-[#eef0f4] text-[#9aa3b8]",
};

export interface StepDefinition {
	order: number;
	name: EnumDonationStepName;
	description: string;
	icon: typeof FlaskConical;
}

export const STEP_DEFINITIONS: StepDefinition[] = [
	{
		order: 1,
		name: EnumDonationStepName.BloodTest,
		description: "Realização dos exames pré-coleta à domicílio",
		icon: FlaskConical,
	},
	{
		order: 2,
		name: EnumDonationStepName.DeliverMilkingKit,
		description: "Entrega do kit de ordenha no domicílio",
		icon: Truck,
	},
	{
		order: 3,
		name: EnumDonationStepName.CollectMilk,
		description: "Coleta do leite humano à domicílio",
		icon: Milk,
	},
	{
		order: 4,
		name: EnumDonationStepName.MilkAnalysis,
		description: "Análise do material coletado e armazenamento no estoque.",
		icon: Warehouse,
	},
];
