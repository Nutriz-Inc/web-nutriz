import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type WizardProgressProps = {
	steps: string[];
	current: number;
	maxVisited: number;
	onStepClick: (step: number) => void;
};

/**
 * Trilha vertical das etapas, dentro do painel da marca (so no desktop).
 * O `Stepper` horizontal continua existindo para o mobile, onde nao ha painel.
 *
 * Ela e clicavel nas etapas ja visitadas, igual ao Stepper — quem chegou na
 * revisao consegue voltar para corrigir um campo sem passar por todas.
 */
export function WizardProgress({
	steps,
	current,
	maxVisited,
	onStepClick,
}: WizardProgressProps) {
	return (
		<ol className="flex flex-col" aria-label="Etapas do cadastro">
			{steps.map((label, index) => {
				const concluida = index < current;
				const atual = index === current;
				const visitada = index <= maxVisited;
				const clicavel = visitada && !atual;

				return (
					<li
						key={label}
						className="flex gap-4"
						aria-current={atual ? "step" : undefined}
					>
						<div className="flex flex-col items-center">
							<span
								className={cn(
									"grid size-9 shrink-0 place-items-center rounded-full border text-[13px] font-bold transition-colors",
									concluida && "border-white/0 bg-white text-blue-deep",
									atual && "border-white bg-white/15 text-white",
									!concluida &&
										!atual &&
										"border-white/25 bg-white/5 text-white/55",
								)}
							>
								{concluida ? (
									<Check className="size-4" aria-hidden="true" />
								) : (
									index + 1
								)}
							</span>

							{index < steps.length - 1 && (
								<span
									aria-hidden="true"
									className={cn(
										"w-px flex-1",
										concluida ? "bg-white/70" : "bg-white/20",
									)}
								/>
							)}
						</div>

						<button
							type="button"
							onClick={() => clicavel && onStepClick(index)}
							disabled={!clicavel}
							className={cn(
								"-mt-0.5 pb-6 text-left outline-none focus-visible:underline",
								clicavel ? "cursor-pointer" : "cursor-default",
							)}
						>
							<span
								className={cn(
									"block text-[10px] font-bold uppercase tracking-[0.12em]",
									atual ? "text-blue-tint-2" : "text-white/45",
								)}
							>
								Etapa {index + 1}
							</span>
							<span
								className={cn(
									"mt-0.5 block text-[15px]",
									atual
										? "font-bold text-white"
										: concluida
											? "font-semibold text-white/85"
											: "font-medium text-white/55",
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
