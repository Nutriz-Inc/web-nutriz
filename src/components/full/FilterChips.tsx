import { cn } from "@/lib/utils";

export type FilterChipOption<T extends string> = {
	key: T;
	label: string;
};

type FilterChipsProps<T extends string> = {
	options: FilterChipOption<T>[];
	value: T;
	onChange: (value: T) => void;
};

export function FilterChips<T extends string>({
	options,
	value,
	onChange,
}: FilterChipsProps<T>) {
	return (
		<>
			{options.map((option) => {
				const active = option.key === value;

				return (
					<button
						key={option.key}
						type="button"
						onClick={() => onChange(option.key)}
						className={cn(
							"shrink-0 whitespace-nowrap rounded-full px-[18px] py-2.5 text-[14px] font-semibold transition-colors",
							active
								? "bg-[#00458b] text-white"
								: "border border-[#e5e7eb] bg-white text-[#6b7280]",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</>
	);
}
