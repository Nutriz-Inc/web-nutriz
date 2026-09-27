import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FiltroDeIndicadores } from "@/services/types/i-analytics";
import { useIndicador } from "../hooks/use-indicadores";
import { formatOptionalDecimal } from "../utils";
import { GradeDeNumeros } from "./GradeDeNumeros";
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
				<GradeDeNumeros className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					{dados.etapas.map((etapa, posicao) => {
						const maisLenta = etapa.etapa === dados.gargalo_por_tempo;
						const conversao = etapa.conversao_da_etapa_pct ?? 0;

						return (
							<div
								key={etapa.etapa}
								className="flex min-w-0 flex-col gap-3 bg-surface px-4 py-4"
							>
								<p className="flex items-baseline gap-2 text-rotulo text-ink-2">
									<span className="tabular-nums text-ink-3">
										{String(posicao + 1).padStart(2, "0")}
									</span>
									<span className="truncate font-semibold text-ink">
										{etapa.etapa}
									</span>
								</p>

								<p className="flex items-baseline gap-1.5">
									<span className="text-titulo font-semibold leading-none tracking-tight tabular-nums text-ink">
										{formatOptionalDecimal(
											etapa.conversao_da_etapa_pct,
											"%",
											0,
										)}
									</span>
									<span className="text-rotulo text-ink-2">concluem</span>
								</p>

								<div className="h-1 w-full overflow-hidden rounded-full bg-surface-3">
									<div
										className={cn(
											"h-full rounded-full",
											maisLenta ? "bg-orange" : "bg-blue-deep",
										)}
										style={{ width: `${Math.min(conversao, 100)}%` }}
									/>
								</div>

								<dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-rotulo">
									<dt className="text-ink-3">Concluíram</dt>
									<dd className="text-right tabular-nums text-ink">
										{etapa.doacoes_que_concluiram} de{" "}
										{etapa.doacoes_que_chegaram}
									</dd>
									<dt className="text-ink-3">Tempo médio</dt>
									<dd
										className={cn(
											"text-right tabular-nums",
											maisLenta ? "font-semibold text-orange" : "text-ink",
										)}
									>
										{formatOptionalDecimal(
											etapa.dias_medios_para_concluir,
											" dias",
										)}
									</dd>
									<dt className="text-ink-3">Nesta etapa agora</dt>
									<dd className="text-right tabular-nums text-ink">
										{etapa.doacoes_ativas_nesta_etapa_agora}
										{etapa.paradas_ha_mais_de_7_dias > 0
											? ` (${etapa.paradas_ha_mais_de_7_dias} paradas)`
											: ""}
									</dd>
								</dl>

								{maisLenta ? (
									<p className="text-rotulo font-medium text-orange">
										Etapa mais lenta do período
									</p>
								) : null}
							</div>
						);
					})}
				</GradeDeNumeros>
			)}
		</PainelCard>
	);
}
