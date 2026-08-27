import { cn } from "@/lib/utils";

export type SegmentedOption<T extends string> = {
	key: T;
	label: string;
};

type SegmentedProps<T extends string> = {
	options: SegmentedOption<T>[];
	value: T;
	onChange: (value: T) => void;
	fullWidth?: boolean;
	size?: "md" | "lg";
	className?: string;
	idPrefix?: string;
	"aria-label"?: string;
};

export function Segmented<T extends string>({
	options,
	value,
	onChange,
	fullWidth = false,
	size = "md",
	className,
	idPrefix,
	"aria-label": ariaLabel,
}: SegmentedProps<T>) {
	return (
		<div
			role="tablist"
			aria-label={ariaLabel}
			className={cn(
				"flex w-fit items-center gap-1 rounded-full bg-blue-tint p-1",
				fullWidth && "w-full",
				className,
			)}
		>
			{options.map((option) => {
				const active = option.key === value;

				return (
					<button
						key={option.key}
						type="button"
						role="tab"
						id={idPrefix ? `${idPrefix}-tab-${option.key}` : undefined}
						aria-selected={active}
						aria-controls={
							idPrefix ? `${idPrefix}-panel-${option.key}` : undefined
						}
						onClick={() => onChange(option.key)}
						className={cn(
							"shrink-0 whitespace-nowrap rounded-full px-5 text-[13px] font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-blue-bright/50",
							size === "lg" ? "min-h-11 py-2.5" : "py-2",
							fullWidth && "flex-1 shrink",
							active
								? "bg-blue-deep-fill text-white shadow-soft"
								: "text-ink-2 hover:text-ink",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
