import { FlaskConical, Milk, Truck } from "lucide-react";
import { EnumDonationStepName } from "@/services/types/i-donation";

export interface StepDefinition {
	order: number;
	name: EnumDonationStepName;
	title: string;
	icon: typeof FlaskConical;
}

export const STEP_DEFINITIONS: StepDefinition[] = [
	{
		order: 1,
		name: EnumDonationStepName.BloodTest,
		title: "Exame",
		icon: FlaskConical,
	},
	{
		order: 2,
		name: EnumDonationStepName.DeliverMilkingKit,
		title: "Entrega",
		icon: Truck,
	},
	{
		order: 3,
		name: EnumDonationStepName.CollectMilk,
		title: "Coleta",
		icon: Milk,
	},
	{
		order: 4,
		name: EnumDonationStepName.MilkAnalysis,
		title: "Estocagem",
		icon: FlaskConical,
	},
];
