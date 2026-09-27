import type { FilterChipOption } from "@/components/full/FilterChips";

export type PeriodPreset = "month" | "quarter" | "semester" | "year" | "custom";

export const PERIOD_PRESET_OPTIONS: FilterChipOption<PeriodPreset>[] = [
	{ key: "month", label: "Este mês" },
	{ key: "quarter", label: "Últimos 3 meses" },
	{ key: "semester", label: "Últimos 6 meses" },
	{ key: "year", label: "Este ano" },
	{ key: "custom", label: "Personalizado" },
];

export const BAR_SHADES = [
	"bg-blue-deep",
	"bg-blue-deep/80",
	"bg-blue-deep/60",
	"bg-blue-deep/40",
];
