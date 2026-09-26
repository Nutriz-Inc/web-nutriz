import { Snowflake } from "lucide-react";
import type { FiltroDeIndicadores } from "@/services/types/i-analytics";
import { formatDateBR } from "@/utils/formatter";
import { useIndicador } from "../hooks/use-indicadores";
import { formatOptionalDecimal } from "../utils";
import { CORES_DO_GRAFICO } from "./charts/paleta";
import { RoscaComCentro } from "./charts/RoscaComCentro";
import { IndicadorIndisponivel } from "./IndicadorIndisponivel";
import { PainelCard } from "./PainelCard";

const CONFIG = {
	dentro: { label: "Dentro das 6h", color: CORES_DO_GRAFICO.principal },
	acima: { label: "Acima das 6h", color: CORES_DO_GRAFICO.atencao },
};

export function CadeiaFriaCard({ filtro }: { filtro: FiltroDeIndicadores }) {
	const consulta = useIndicador("cadeia_fria", filtro);
	const dados = consulta.data;

	return (
		<PainelCard
			icon={<Snowflake className="size-[15px]" strokeWidth={1.6} />}
			title="Cadeia fria"
			subtitle="Rotas encerradas dentro do limite de 6 horas da rBLH"
		>
			{!dados ? (
				<IndicadorIndisponivel
					carregando={consulta.isLoading}
					onTentarDeNovo={() => consulta.refetch()}
				/>
			) : dados.rotas_com_duracao_medida === 0 ? (
				<p className="py-8 text-center text-apoio text-ink-3">
					Nenhuma rota encerrada no período.
				</p>
			) : (
				<div className="flex flex-col gap-5 sm:flex-row sm:items-center">
					<RoscaComCentro
						config={CONFIG}
						fatias={[
							{
								chave: "dentro",
								valor: dados.rotas_dentro_de_6h,
								cor: CORES_DO_GRAFICO.principal,
							},
							{
								chave: "acima",
								valor: dados.rotas_acima_de_6h,
								cor: CORES_DO_GRAFICO.atencao,
							},
						]}
						destaque={formatOptionalDecimal(dados.conformidade_6h_pct, "%", 0)}
						legenda="no limite"
					/>
					<dl className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3">
						<div>
							<dt className="text-rotulo text-ink-2">Duração média</dt>
							<dd className="text-destaque font-bold tabular-nums text-ink">
								{formatOptionalDecimal(dados.duracao_media_horas, "h")}
							</dd>
						</div>
						<div>
							<dt className="text-rotulo text-ink-2">
								Previsto no planejamento
							</dt>
							<dd className="text-destaque font-bold tabular-nums text-ink">
								{formatOptionalDecimal(dados.duracao_estimada_media_horas, "h")}
							</dd>
						</div>
						<div>
							<dt className="text-rotulo text-ink-2">Rotas medidas</dt>
							<dd className="text-destaque font-bold tabular-nums text-ink">
								{dados.rotas_com_duracao_medida}
							</dd>
						</div>
						<div>
							<dt className="text-rotulo text-ink-2">Acima de 6h</dt>
							<dd
								className={
									dados.rotas_acima_de_6h > 0
										? "text-destaque font-bold tabular-nums text-orange"
										: "text-destaque font-bold tabular-nums text-ink"
								}
							>
								{dados.rotas_acima_de_6h}
							</dd>
						</div>
					</dl>
				</div>
			)}
			{dados && dados.rotas_que_passaram_de_6h.length > 0 ? (
				<ul className="flex flex-col gap-1.5 border-t border-line pt-4">
					{dados.rotas_que_passaram_de_6h.slice(0, 3).map((rota) => (
						<li
							key={`${rota.rota}-${rota.data}`}
							className="flex items-baseline justify-between gap-3 text-rotulo text-ink-2"
						>
							<span className="truncate">
								{rota.rota} · {rota.motorista ?? "—"} ·{" "}
								{rota.data ? formatDateBR(rota.data.slice(0, 10)) : "—"}
							</span>
							<span className="shrink-0 font-semibold tabular-nums text-orange">
								{formatOptionalDecimal(rota.horas, "h")}
							</span>
						</li>
					))}
				</ul>
			) : null}
		</PainelCard>
	);
}
