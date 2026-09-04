import { FlaskConical, Milk, Truck, Warehouse } from "lucide-react";
import type { BadgeTone } from "@/components/ui/badge";
import {
	EnumDonationStepName,
} from "@/services/types/i-donation";
import { RECURRENT_DONATION_STEP_NAMES } from "@/utils/donation";

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

export const RECURRENT_STEP_DEFINITIONS: StepDefinition[] =
	STEP_DEFINITIONS.filter((definition) =>
		RECURRENT_DONATION_STEP_NAMES.includes(definition.name),
	).map((definition, index) => ({ ...definition, order: index + 1 }));

export function getStepDefinitions(isRecurrent?: boolean): StepDefinition[] {
	return isRecurrent ? RECURRENT_STEP_DEFINITIONS : STEP_DEFINITIONS;
}
