import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FiltroDeIndicadores } from "@/services/types/i-analytics";
import { useIndicador } from "../hooks/use-indicadores";
import { formatOptionalDecimal } from "../utils";
import { IndicadorIndisponivel } from "./IndicadorIndisponivel";
import { PainelCard } from "./PainelCard";

export function FunilCard({ filtro }: { filtro: FiltroDeIndicadores }) {
	const consulta = useIndicador("funil_doadora", filtro);
	const dados = consulta.data;

	return (
		<PainelCard
			icon={<Filter className="size-[15px]" strokeWidth={1.6} />}
			title="Jornada da doadora"
			subtitle={
				dados
					? `${dados.doacoes_iniciadas} doações iniciadas no período · onde avançam e onde param`
					: "Onde as doações avançam e onde param"
			}
		>
			{!dados ? (
				<IndicadorIndisponivel
					carregando={consulta.isLoading}
					onTentarDeNovo={() => consulta.refetch()}
				/>
			) : (
				<ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{dados.etapas.map((etapa, posicao) => {
						const maisLenta = etapa.etapa === dados.gargalo_por_tempo;
						const conversao = etapa.conversao_da_etapa_pct ?? 0;

						return (
							<li
								key={etapa.etapa}
								className={cn(
									"flex flex-col gap-3 rounded-card-sm border p-4",
									maisLenta
										? "border-orange/40 bg-orange-tint/40"
										: "border-line bg-canvas",
								)}
							>
								<div className="flex items-center justify-between gap-2">
									<p className="text-[12px] font-semibold text-ink-2">
										{posicao + 1}. {etapa.etapa}
									</p>
									{maisLenta ? (
										<Badge tone="orange" size="sm">
											Mais lenta
										</Badge>
									) : null}
								</div>
								<div className="flex items-baseline gap-1.5">
									<p className="text-[28px] font-bold leading-none tabular-nums text-ink">
										{formatOptionalDecimal(
											etapa.conversao_da_etapa_pct,
											"%",
											0,
										)}
									</p>
									<p className="text-[12px] text-ink-2">concluem</p>
								</div>
								<div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
									<div
										className={cn(
											"h-full rounded-full",
											maisLenta ? "bg-orange" : "bg-blue-deep",
										)}
										style={{ width: `${Math.min(conversao, 100)}%` }}
									/>
								</div>
								<p className="text-[12px] leading-relaxed text-ink-2">
									{etapa.doacoes_que_concluiram} de {etapa.doacoes_que_chegaram}{" "}
									·{" "}
									{formatOptionalDecimal(
										etapa.dias_medios_para_concluir,
										" dias",
									)}{" "}
									em média
									<br />
									{etapa.doacoes_ativas_nesta_etapa_agora} nesta etapa agora
									{etapa.paradas_ha_mais_de_7_dias > 0
										? ` · ${etapa.paradas_ha_mais_de_7_dias} há mais de 7 dias`
										: ""}
								</p>
							</li>
						);
					})}
				</ol>
			)}
		</PainelCard>
	);
}
