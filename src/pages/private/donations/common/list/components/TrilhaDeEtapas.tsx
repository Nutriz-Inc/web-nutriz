import { cn } from "@/lib/utils";
import type { EnumDonationStepName } from "@/services/types/i-donation";
import { STEP_DISPLAY } from "@/utils/status";
import type { StepDefinition } from "../../info/constants";

type TrilhaDeEtapasProps = {
	etapas: StepDefinition[];
	atual?: EnumDonationStepName;
};

export function TrilhaDeEtapas({ etapas, atual }: TrilhaDeEtapasProps) {
	const posicaoAtual = etapas.findIndex((etapa) => etapa.name === atual);

	return (
		<ol
			className="grid gap-2"
			style={{
				gridTemplateColumns: `repeat(${etapas.length}, minmax(0, 1fr))`,
			}}
		>
			{etapas.map((etapa, posicao) => {
				const feita = posicao < posicaoAtual;
				const corrente = posicao === posicaoAtual;

				return (
					<li
						key={etapa.name}
						aria-current={corrente ? "step" : undefined}
						className="flex min-w-0 flex-col gap-2"
					>
						<span className="relative h-1.5 overflow-hidden rounded-full bg-white/20">
							{feita || corrente ? (
								<span
									className={cn(
										"absolute inset-y-0 left-0 rounded-full bg-white motion-safe:preenche-barra",
										feita ? "w-full" : "w-1/2",
									)}
									style={{ animationDelay: `${posicao * 120}ms` }}
								/>
							) : null}
						</span>
						<span
							className={cn(
								"text-rotulo leading-tight break-words",
								corrente
									? "font-semibold text-white"
									: feita
										? "text-white/80"
										: "text-white/55",
							)}
						>
							{STEP_DISPLAY[etapa.name].label}
						</span>
					</li>
				);
			})}
		</ol>
	);
}
