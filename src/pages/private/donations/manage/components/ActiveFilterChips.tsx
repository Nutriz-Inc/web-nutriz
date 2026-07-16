import { cn } from "@/lib/utils";

export type ActiveFilter = "all" | "active" | "inactive";

const FILTERS: { key: ActiveFilter; label: string }[] = [
	{ key: "all", label: "Todas" },
	{ key: "active", label: "Em andamento" },
	{ key: "inactive", label: "Concluídas" },
];

type ActiveFilterChipsProps = {
	value: ActiveFilter;
	onChange: (value: ActiveFilter) => void;
};

export function ActiveFilterChips({ value, onChange }: ActiveFilterChipsProps) {
	return (
		<>
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
		</>
	);
}
