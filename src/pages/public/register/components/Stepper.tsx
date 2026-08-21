import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StepperProps = {
	steps: string[];
	current: number;
	maxVisited: number;
	onStepClick: (step: number) => void;
};

/**
 * Trilha do cadastro em barras: cada etapa e um segmento que preenche quando
 * e concluida, com o rotulo embaixo. Substituiu as bolinhas ligadas por fios —
 * ocupa menos altura, cabe no celular sem cortar rotulo e mostra o progresso
 * de relance, sem precisar contar circulos.
 *
 * Etapas ja visitadas sao clicaveis, para voltar e corrigir um campo.
 */
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
									concluida && "bg-blue-deep",
									atual && "bg-blue-bright",
									!concluida && !atual && "bg-blue-tint-2/70",
									clicavel && "group-hover:bg-blue",
								)}
							/>

							<span className="flex min-w-0 items-center gap-1.5">
								<span
									aria-hidden="true"
									className={cn(
										"grid size-[18px] shrink-0 place-items-center rounded-full text-[10px] font-bold transition-colors",
										concluida && "bg-blue-deep text-white",
										atual && "bg-blue-bright text-white",
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
