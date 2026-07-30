import type { FilterChipOption } from "@/components/full/FilterChips";

export type PeriodPreset = "month" | "quarter" | "semester" | "year" | "custom";

export const PERIOD_PRESET_OPTIONS: FilterChipOption<PeriodPreset>[] = [
	{ key: "month", label: "Este mês" },
	{ key: "quarter", label: "Últimos 3 meses" },
	{ key: "semester", label: "Últimos 6 meses" },
	{ key: "year", label: "Este ano" },
	{ key: "custom", label: "Personalizado" },
];

export const SCORE_OPACITY: Record<number, string> = {
	5: "bg-[#f25ca2]",
	4: "bg-[#f25ca2]/80",
	3: "bg-[#f25ca2]/70",
	2: "bg-[#f25ca2]/50",
	1: "bg-[#f25ca2]/35",
};

export const BAR_SHADES = [
	"bg-[#00458b]",
	"bg-[#00458b]/80",
	"bg-[#00458b]/60",
	"bg-[#00458b]/40",
];
