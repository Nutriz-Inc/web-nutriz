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
							"shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-[13px] font-semibold transition-colors",
							active
								? "bg-blue-deep-fill text-white"
								: "border border-line bg-surface text-ink-2 hover:border-blue-tint-2 hover:bg-blue-tint hover:text-blue-deep",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</>
	);
}
