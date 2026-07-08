import { cn } from "@/lib/utils";
import { EnumDonationStepName } from "@/services/types/i-donation";
import { STEP_DISPLAY } from "./StatusBadge";

export type StepFilter = "all" | EnumDonationStepName;

const FILTERS: { key: StepFilter; label: string }[] = [
	{ key: "all", label: "Todas" },
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

type FilterChipsProps = {
	value: StepFilter;
	onChange: (value: StepFilter) => void;
};

export function FilterChips({ value, onChange }: FilterChipsProps) {
	return (
		<div className="flex gap-2.5 overflow-x-auto pb-1">
			{FILTERS.map((filter) => {
				const active = filter.key === value;

				return (
					<button
						key={filter.key}
						type="button"
						onClick={() => onChange(filter.key)}
						className={cn(
							"shrink-0 whitespace-nowrap rounded-full px-[18px] py-2.5 text-[14px] font-semibold transition-colors",
							active
								? "bg-[#00458b] text-white"
								: "border border-[#e5e7eb] bg-white text-[#6b7280]",
						)}
					>
						{filter.label}
					</button>
				);
			})}
		</div>
	);
}