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
		<ol
			className="flex w-full items-start gap-2"
			aria-label="Etapas do cadastro"
		>
			{steps.map((label, index) => {
				const concluida = index < current;
				const atual = index === current;
				const visitada = index <= maxVisited;
				const clicavel = visitada && !atual;

				return (
					<li
						key={label}
						className="min-w-0 flex-1"
						aria-current={atual ? "step" : undefined}
					>
						<button
							type="button"
							onClick={() => clicavel && onStepClick(index)}
							disabled={!clicavel}
							aria-label={`Etapa ${index + 1}: ${label}${
								concluida
									? " (concluída)"
									: visitada && !atual
										? " (visitada)"
										: ""
							}`}
							className={cn(
								"group flex w-full flex-col gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-blue-bright/50",
								clicavel ? "cursor-pointer" : "cursor-default",
							)}
						>
							<span
								aria-hidden="true"
								className={cn(
									"h-1.5 w-full rounded-full transition-colors",
									concluida && "bg-blue-deep-fill",
									atual && "bg-blue-bright-fill",
									!concluida && !atual && "bg-blue-tint-2/70",
									clicavel && "group-hover:bg-blue-fill",
								)}
							/>

							<span className="flex min-w-0 items-center gap-1.5">
								<span
									aria-hidden="true"
									className={cn(
										"grid size-[18px] shrink-0 place-items-center rounded-full text-[10px] font-bold transition-colors",
										concluida && "bg-blue-deep-fill text-white",
										atual && "bg-blue-bright-fill text-white",
										!concluida &&
											!atual &&
											"bg-blue-tint-2/70 text-blue-deep/70",
									)}
								>
									{concluida ? (
										<Check className="size-3" strokeWidth={3} />
									) : (
										index + 1
									)}
								</span>

								<span
									className={cn(
										"hidden truncate text-[12px] sm:block",
										atual && "font-bold text-blue-deep",
										concluida && "font-semibold text-ink-2",
										!concluida && !atual && "font-medium text-ink-3",
									)}
								>
									{label}
								</span>
							</span>
						</button>
					</li>
				);
			})}
		</ol>
	);
}
