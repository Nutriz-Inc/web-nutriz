import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RoundCheckboxProps = {
	id: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	accent: "pink" | "navy";
	children: ReactNode;
	describedBy?: string;
	invalid?: boolean;
};

const ACCENTS = {
	pink: {
		checked: "border-[#e0457a] bg-[#e0457a]",
		focus: "focus-visible:outline-[#e0457a]",
	},
	navy: {
		checked: "border-[#0d3b6e] bg-[#0d3b6e]",
		focus: "focus-visible:outline-[#0d3b6e]",
	},
};

export function RoundCheckbox({
	id,
	checked,
	onChange,
	accent,
	children,
	describedBy,
	invalid = false,
}: RoundCheckboxProps) {
	const tones = ACCENTS[accent];

	return (
		<div className="flex items-start gap-3">
			<span className="relative mt-0.5 grid size-[18px] shrink-0 place-items-center">
				<input
					type="checkbox"
					id={id}
					checked={checked}
					onChange={(event) => onChange(event.target.checked)}
					aria-describedby={describedBy}
					aria-invalid={invalid || undefined}
					className={cn(
						"size-[18px] cursor-pointer appearance-none rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
						tones.focus,
						checked
							? tones.checked
							: invalid
								? "border-[#dc2626] bg-white"
								: "border-[#a1a1aa] bg-white",
					)}
				/>
				{checked && (
					<Check
						className="pointer-events-none absolute size-3 text-white"
						aria-hidden
					/>
				)}
			</span>
			<label htmlFor={id} className="cursor-pointer select-none">
				{children}
			</label>
		</div>
	);
}
