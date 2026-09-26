import { cn } from "@/lib/utils";
import type { EnumDonationStepName } from "@/services/types/i-donation";
import { STEP_DISPLAY } from "@/utils/status";
import { getStepDefinitions } from "../../../common/info/constants";

type TrilhaDaDoacaoProps = {
	etapaAtual: EnumDonationStepName | null;
	ativa: boolean;
	comErro: boolean;
	recorrente: boolean;
};

export function TrilhaDaDoacao({
	etapaAtual,
	ativa,
	comErro,
	recorrente,
}: TrilhaDaDoacaoProps) {
	const etapas = getStepDefinitions(recorrente);
	const posicao = etapas.findIndex((etapa) => etapa.name === etapaAtual);
	const concluida = !ativa && !comErro;
	const atual = posicao >= 0 ? etapas[posicao] : null;

	const legenda = concluida
		? "Todas as etapas concluídas"
		: atual
			? `Etapa ${atual.order} de ${etapas.length} · ${STEP_DISPLAY[atual.name].label}`
			: "Etapa ainda não definida";

	return (
		<div className="flex min-w-0 flex-col gap-2">
			<div className="flex items-center gap-1" role="img" aria-label={legenda}>
				{etapas.map((etapa, indice) => {
					const feita = concluida || indice < posicao;
					const agora = !concluida && indice === posicao;

					return (
						<span
							key={etapa.name}
							className={cn(
								"h-1.5 flex-1 rounded-full",
								feita && (concluida ? "bg-success" : "bg-blue-deep"),
								agora && (comErro ? "bg-danger" : "bg-blue-bright"),
								!feita && !agora && "bg-surface-3",
							)}
						/>
					);
				})}
			</div>
			<p className="truncate text-[12px] text-ink-2">{legenda}</p>
		</div>
	);
}
