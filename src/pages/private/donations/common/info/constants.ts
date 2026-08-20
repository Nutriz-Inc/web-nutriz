import { FlaskConical, Milk, Truck, Warehouse } from "lucide-react";
import type { BadgeTone } from "@/components/ui/badge";
import { EnumDonationStepName } from "@/services/types/i-donation";

export type StepVisualStatus = "done" | "current" | "waiting";

export const BADGE_LABEL: Record<StepVisualStatus, string> = {
	done: "CONCLUÍDO",
	current: "EM ANDAMENTO",
	waiting: "AGUARDANDO",
};

export const BADGE_TONE: Record<StepVisualStatus, BadgeTone> = {
	done: "success",
	current: "brand",
	waiting: "neutral",
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
