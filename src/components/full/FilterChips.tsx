import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
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
	const grupo = useId();
	const semMovimento = useReducedMotion();

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
							"relative isolate shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-apoio font-semibold transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.97]",
							active
								? "border border-transparent text-white"
								: "border border-line bg-surface text-ink-2 hover:border-blue-tint-2 hover:bg-blue-tint hover:text-blue-deep",
						)}
					>
						{active ? (
							<motion.span
								layoutId={`chip-ativo-${grupo}`}
								aria-hidden="true"
								className="absolute -inset-px -z-10 rounded-full bg-blue-deep-fill"
								transition={
									semMovimento
										? { duration: 0 }
										: { type: "spring", duration: 0.38, bounce: 0.12 }
								}
							/>
						) : null}
						{option.label}
					</button>
				);
			})}
		</>
	);
}
