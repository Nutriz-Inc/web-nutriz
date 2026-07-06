import { cn } from "@/lib/utils";

export type FilterKey = "all" | "home";

const FILTERS: { key: FilterKey; label: string }[] = [
	{ key: "all", label: "Todos" },
	{ key: "home", label: "Coleta Domiciliar" },
];

type FilterTabsProps = {
	value: FilterKey;
	onChange: (value: FilterKey) => void;
};

export function FilterTabs({ value, onChange }: FilterTabsProps) {
	return (
		<div className="flex gap-2 overflow-x-auto pb-1">
			{FILTERS.map((filter) => {
				const active = filter.key === value;

				return (
					<button
						key={filter.key}
						type="button"
						onClick={() => onChange(filter.key)}
						className={cn(
							"shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-[10.5px] font-bold transition-colors",
							active
								? "border-[#387ccd] bg-[#387ccd] text-white"
								: "border-[#e0e0e0] bg-white font-normal text-[#888]",
						)}
					>
						{filter.label}
					</button>
				);
			})}
		</div>
	);
}
