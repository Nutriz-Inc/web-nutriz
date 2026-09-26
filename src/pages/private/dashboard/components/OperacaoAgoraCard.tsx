import { Radio } from "lucide-react";
import { formatTimeBR } from "@/utils/formatter";
import { useIndicador } from "../hooks/use-indicadores";
import { AlertaOperacional } from "./AlertaOperacional";
import { IndicadorIndisponivel } from "./IndicadorIndisponivel";
import { NumeroDoDia } from "./NumeroDoDia";
import { PainelCard } from "./PainelCard";
import { RotaEmAndamentoLinha } from "./RotaEmAndamentoLinha";

export function OperacaoAgoraCard() {
	const consulta = useIndicador("operacao_agora", {}, true);
	const dados = consulta.data;

	const alertas = dados
		? [
				{
					quantidade: dados.alertas.rotas_passando_de_6h,
					rotulo: "Rotas acima de 6 horas",
					destino: "/rotas",
					grave: true,
				},
				{
					quantidade: dados.alertas.rotas_em_alerta_5h,
					rotulo: "Rotas perto do limite de 6 horas",
					destino: "/rotas",
				},
				{
					quantidade: dados.alertas.exames_vencidos_com_doacao_ativa,
					rotulo: "Exames vencidos com doação ativa",
					destino: "/gestao-doacoes",
					grave: true,
				},
				{
					quantidade: dados.alertas.exames_vencendo_em_30_dias,
					rotulo: "Exames vencendo em 30 dias",
					destino: "/gestao-doacoes",
				},
				{
					quantidade: dados.alertas.doacoes_paradas_ha_mais_de_7_dias,
					rotulo: "Doações paradas há mais de 7 dias",
					destino: "/gestao-doacoes",
				},
				{
					quantidade: dados.alertas.rotas_agendadas_que_nao_iniciaram,
					rotulo: "Rotas que não saíram no horário",
					destino: "/rotas",
				},
			].filter((alerta) => alerta.quantidade > 0)
		: [];

	return (
		<PainelCard
			icon={<Radio className="size-[15px]" strokeWidth={1.6} />}
			title="Operação agora"
			subtitle={
				dados
					? `Atualizado às ${formatTimeBR(new Date())} · a cada minuto`
					: "O que está acontecendo neste momento"
			}
		>
			{!dados ? (
				<IndicadorIndisponivel
					carregando={consulta.isLoading}
					onTentarDeNovo={() => consulta.refetch()}
				/>
			) : (
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr]">
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
							<NumeroDoDia
								valor={dados.rotas_em_andamento.length}
								rotulo="Rotas em andamento"
							/>
							<NumeroDoDia
								valor={dados.rotas_agendadas_hoje}
								rotulo="Rotas agendadas hoje"
							/>
							<NumeroDoDia
								valor={dados.agendamentos_pendentes_hoje}
								rotulo="Agendamentos de hoje"
							/>
							<NumeroDoDia
								valor={dados.agendamentos_atrasados}
								rotulo="Agendamentos atrasados"
								atencao
							/>
						</div>

						{dados.rotas_em_andamento.length > 0 ? (
							<div className="flex flex-col gap-2.5">
								{dados.rotas_em_andamento.map((rota) => (
									<RotaEmAndamentoLinha key={rota.id_rota} rota={rota} />
								))}
							</div>
						) : (
							<p className="rounded-card-sm bg-surface-2 px-4 py-3 text-[13px] text-ink-2">
								Nenhuma rota na rua agora.
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1">
						<p className="px-3 pb-1 text-xs font-bold uppercase tracking-[0.06em] text-ink-2">
							Pede atenção
						</p>
						{alertas.length > 0 ? (
							alertas.map((alerta) => (
								<AlertaOperacional key={alerta.rotulo} {...alerta} />
							))
						) : (
							<p className="px-3 py-2 text-[13px] text-success">
								Tudo em dia por aqui.
							</p>
						)}
					</div>
				</div>
			)}
		</PainelCard>
	);
}
