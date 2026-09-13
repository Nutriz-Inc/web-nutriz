import type { IGetAdmDashboardResponse } from "@/services/types/i-dashboard";
import { STEP_NUMBER } from "@/utils/constants";
import { formatDecimal, formatOptionalDecimal, toPercent } from "../../utils";
import { RelatorioBarrasPorMes } from "./RelatorioBarrasPorMes";
import { RelatorioCartaoDeNotas } from "./RelatorioCartaoDeNotas";
import { RelatorioCartaoDestacado } from "./RelatorioCartaoDestacado";
import { RelatorioFaixaDeDados } from "./RelatorioFaixaDeDados";
import { RelatorioFaixaTopo } from "./RelatorioFaixaTopo";
import { RelatorioRosca } from "./RelatorioRosca";
import { RelatorioSecao } from "./RelatorioSecao";
import { RelatorioTabelaDeEtapas } from "./RelatorioTabelaDeEtapas";
import { RelatorioTabelaDeSatisfacao } from "./RelatorioTabelaDeSatisfacao";
import "./relatorio.css";

type RelatorioDoDashboardProps = {
	data?: IGetAdmDashboardResponse;
	periodo: string;
	emissao: string;
	emitidoPor: string;
};

const MESES_NO_RELATORIO = 12;

export function RelatorioDoDashboard({
	data,
	periodo,
	emissao,
	emitidoPor,
}: RelatorioDoDashboardProps) {
	const porMes = (data?.milk_collected_by_month ?? []).slice(
		-MESES_NO_RELATORIO,
	);

	const etapas = [...(data?.active_donations_by_step ?? [])].sort(
		(a, b) => STEP_NUMBER[a.step] - STEP_NUMBER[b.step],
	);
	const totalAtivas = etapas.reduce((soma, item) => soma + item.count, 0);
	const gargalo = etapas.reduce(
		(acumulado, item) => (item.count > acumulado.count ? item : acumulado),
		etapas[0],
	);

	const avaliacoes = data?.feedback_by_score ?? [];
	const totalAvaliacoes = avaliacoes.reduce(
		(soma, item) => soma + item.count,
		0,
	);
	const notaMedia = totalAvaliacoes
		? avaliacoes.reduce((soma, item) => soma + item.score * item.count, 0) /
			totalAvaliacoes
		: 0;
	const positivas = avaliacoes
		.filter((item) => item.score >= 4)
		.reduce((soma, item) => soma + item.count, 0);

	const litrosCaptados = (data?.total_milk_collected ?? 0) / 1000;
	const aproveitamento = toPercent(data?.bottles_utilization_rate ?? 0);
	const recorrencia = toPercent(data?.donor_recurrence_rate ?? 0);

	return (
		<article className="relatorio">
			<RelatorioFaixaTopo
				periodo={periodo}
				emissao={emissao}
				emitidoPor={emitidoPor}
			/>

			<RelatorioFaixaDeDados
				colunas={[
					{
						rotulo: "Leite captado",
						valor: `${formatDecimal(litrosCaptados)} L`,
					},
					{ rotulo: "Doações ativas", valor: String(totalAtivas) },
					{
						rotulo: "Não concluídas",
						valor: String(data?.donations_with_error ?? 0),
					},
					{
						rotulo: "Frascos entregues",
						valor: String(data?.bottles_count ?? 0),
					},
				]}
			/>

			<div className="relatorio-cartoes">
				<RelatorioCartaoDestacado
					rotulo="Aproveitamento dos frascos"
					detalhe={`${data?.discarded_bottles_count ?? 0} frascos descartados`}
				>
					<RelatorioRosca
						percentual={aproveitamento}
						corDoArco="#662e9b"
						corDoTrilho="#dde8f3"
					/>
				</RelatorioCartaoDestacado>

				<RelatorioCartaoDestacado
					rotulo="Recorrência de doadoras"
					detalhe="Doadoras com mais de uma doação"
				>
					<RelatorioRosca
						percentual={recorrencia}
						corDoArco="#43bccd"
						corDoTrilho="#dde8f3"
					/>
				</RelatorioCartaoDestacado>

				<RelatorioCartaoDestacado
					rotulo="Satisfação das doadoras"
					detalhe={
						totalAvaliacoes
							? `${Math.round((positivas / totalAvaliacoes) * 100)}% positivas · ${totalAvaliacoes} avaliações`
							: "Nenhuma avaliação no período"
					}
				>
					<p className="relatorio-cartao-valor">
						{totalAvaliacoes ? formatDecimal(notaMedia) : "—"}
					</p>
				</RelatorioCartaoDestacado>
			</div>

			<RelatorioSecao
				titulo="Litros captados por mês"
				nota={`Total de ${formatDecimal(litrosCaptados)} L no período`}
			>
				{porMes.length ? (
					<RelatorioBarrasPorMes porMes={porMes} />
				) : (
					<p className="relatorio-vazio">
						Nenhum dado disponível para o período selecionado.
					</p>
				)}
			</RelatorioSecao>

			<div className="relatorio-colunas">
				<RelatorioSecao
					titulo="Doações ativas por etapa"
					nota="Onde estão paradas"
				>
					{etapas.length ? (
						<RelatorioTabelaDeEtapas
							etapas={etapas}
							total={totalAtivas}
							gargalo={gargalo}
						/>
					) : (
						<p className="relatorio-vazio">
							Nenhuma doação ativa no período selecionado.
						</p>
					)}
				</RelatorioSecao>

				<RelatorioSecao
					titulo="Nível de satisfação"
					nota={
						totalAvaliacoes
							? `Média de ${formatDecimal(notaMedia)} de 5`
							: undefined
					}
				>
					{totalAvaliacoes ? (
						<RelatorioTabelaDeSatisfacao
							feedbackByScore={avaliacoes}
							total={totalAvaliacoes}
						/>
					) : (
						<p className="relatorio-vazio">
							Nenhuma avaliação no período selecionado.
						</p>
					)}
				</RelatorioSecao>
			</div>

			<div className="relatorio-notas">
				<RelatorioCartaoDeNotas
					titulo="Frascos"
					notas={[
						{
							chave: "entregues",
							rotulo: "Frascos entregues",
							valor: String(data?.bottles_count ?? 0),
						},
						{
							chave: "descartados",
							rotulo: "Frascos descartados",
							valor: String(data?.discarded_bottles_count ?? 0),
						},
						{
							chave: "media",
							rotulo: "Média por doadora",
							valor: formatOptionalDecimal(data?.average_bottles_per_donor),
						},
						{
							chave: "taxa",
							rotulo: "Taxa de aproveitamento",
							valor: `${aproveitamento}%`,
						},
					]}
				/>

				<RelatorioCartaoDeNotas
					titulo="Operação de rotas"
					notas={[
						{
							chave: "km",
							rotulo: "Quilometragem média",
							valor: formatOptionalDecimal(
								data?.average_mileage_per_route,
								" km",
							),
						},
						{
							chave: "paradas",
							rotulo: "Paradas por rota",
							valor: formatOptionalDecimal(data?.average_stops_per_route),
						},
						{
							chave: "duracao",
							rotulo: "Duração média",
							valor: formatOptionalDecimal(
								data?.average_route_duration_hours,
								" h",
							),
						},
						{
							chave: "resposta",
							rotulo: "Tempo médio de resposta",
							valor: formatOptionalDecimal(
								data?.average_service_time_hours,
								" h",
							),
						},
					]}
				/>
			</div>

			<p className="relatorio-rodape">
				Documento gerado automaticamente pela plataforma Nutriz em {emissao}. Os
				números refletem o período {periodo}, conforme o filtro aplicado no
				painel no momento da emissão.
			</p>
		</article>
	);
}
