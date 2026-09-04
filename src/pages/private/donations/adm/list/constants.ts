import type { FilterChipOption } from "@/components/full/FilterChips";
import { EnumDonationStepName } from "@/services/types/i-donation";
import { STEP_DISPLAY } from "./components/StatusBadge";

export type StepFilter = "all" | EnumDonationStepName;
export type ActiveFilter = "all" | "active" | "inactive";
export type RecurrentFilter = "all" | "recurrent" | "first";

export const STEP_FILTER_OPTIONS: FilterChipOption<StepFilter>[] = [
	{ key: "all", label: "Todas as etapas" },
	{
		key: EnumDonationStepName.BloodTest,
		label: STEP_DISPLAY[EnumDonationStepName.BloodTest].label,
	},
	{
		key: EnumDonationStepName.CollectMilk,
		label: STEP_DISPLAY[EnumDonationStepName.CollectMilk].label,
	},
	{
		key: EnumDonationStepName.DeliverMilkingKit,
		label: STEP_DISPLAY[EnumDonationStepName.DeliverMilkingKit].label,
	},
	{
		key: EnumDonationStepName.MilkAnalysis,
		label: STEP_DISPLAY[EnumDonationStepName.MilkAnalysis].label,
	},
];

export const ACTIVE_FILTER_OPTIONS: FilterChipOption<ActiveFilter>[] = [
	{ key: "all", label: "Todas" },
	{ key: "active", label: "Em andamento" },
	{ key: "inactive", label: "Concluídas" },
];

export const RECURRENT_FILTER_OPTIONS: FilterChipOption<RecurrentFilter>[] = [
	{ key: "all", label: "Todos os tipos" },
	{ key: "recurrent", label: "Recorrentes" },
	{ key: "first", label: "Não recorrentes" },
];
