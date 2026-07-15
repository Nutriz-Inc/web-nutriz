import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StepperProps = {
	steps: string[];
	current: number;
	maxVisited: number;
	onStepClick: (step: number) => void;
};

export function Stepper({
	steps,
	current,
	maxVisited,
	onStepClick,
}: StepperProps) {
	return (
		<ol className="flex w-full items-start" aria-label="Etapas do cadastro">
			{steps.map((label, index) => {
				const done = index < current;
				const active = index === current;
				const visited = index <= maxVisited;
				const clickable = visited && !active;

				return (
					<li
						key={label}
						className={cn("flex items-start", index > 0 && "flex-1")}
						aria-current={active ? "step" : undefined}
					>
						{index > 0 && (
							<span
								aria-hidden
								className={cn(
									"mx-2 mt-4 h-0.5 flex-1 rounded-full sm:mx-3",
									done || active ? "bg-[#0d3b6e]" : "bg-[#e4e4e7]",
								)}
							/>
						)}

						<button
							type="button"
							onClick={() => clickable && onStepClick(index)}
							disabled={!clickable}
							aria-label={`Etapa ${index + 1}: ${label}${
								done ? " (concluída)" : visited && !active ? " (visitada)" : ""
							}`}
							className={cn(
								"flex min-w-0 flex-col items-center gap-1.5",
								clickable ? "cursor-pointer" : "cursor-default",
							)}
						>
							<span
								className={cn(
									"grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold transition-colors",
									done && "bg-[#0d3b6e] text-white",
									active &&
										"border-2 border-[#0d3b6e] bg-white text-[#0d3b6e] ring-4 ring-[#0d3b6e]/12",
									!done &&
										!active &&
										(visited
											? "border-2 border-[#0d3b6e]/40 bg-white text-[#0d3b6e]"
											: "border border-[#e4e4e7] bg-white text-[#a1a1aa]"),
								)}
							>
								{done ? <Check className="size-4" aria-hidden /> : index + 1}
							</span>
							<span
								className={cn(
									"hidden whitespace-nowrap text-[12px] sm:block",
									active && "font-semibold text-[#0d3b6e]",
									done && "font-medium text-[#09090b]",
									!done &&
										!active &&
										(visited ? "text-[#0d3b6e]/70" : "text-[#a1a1aa]"),
								)}
							>
								{label}
							</span>
						</button>
					</li>
				);
			})}
		</ol>
	);
}
