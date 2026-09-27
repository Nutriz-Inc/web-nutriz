import { Radio } from "lucide-react";
import { formatTimeBR } from "@/utils/formatter";
import { useIndicador } from "../hooks/use-indicadores";
import { CelulaDeNumero } from "./CelulaDeNumero";
import { GradeDeNumeros } from "./GradeDeNumeros";
import { IndicadorIndisponivel } from "./IndicadorIndisponivel";
import { PainelCard } from "./PainelCard";
import { RotaEmAndamentoLinha } from "./RotaEmAndamentoLinha";

function AoVivo({ horario }: { horario: string }) {
	return (
		<span className="inline-flex items-center gap-2">
			<span className="relative flex size-1.5" aria-hidden="true">
				<span className="absolute inline-flex size-full rounded-full bg-success opacity-50 motion-safe:animate-ping" />
				<span className="relative inline-flex size-1.5 rounded-full bg-success" />
			</span>
			Atualizado às {horario}, a cada minuto
		</span>
	);
}

export function OperacaoAgoraCard() {
	const consulta = useIndicador("operacao_agora", {}, true);
	const dados = consulta.data;

	const alertas = dados
		? [
				{
					valor: dados.alertas.rotas_passando_de_6h,
					rotulo: "Rotas acima de 6 horas",
					para: "/rotas",
					grave: true,
				},
				{
					valor: dados.alertas.rotas_em_alerta_5h,
					rotulo: "Rotas perto das 6 horas",
					para: "/rotas",
				},
				{
					valor: dados.alertas.rotas_agendadas_que_nao_iniciaram,
					rotulo: "Rotas que não saíram no horário",
					para: "/rotas",
				},
				{
					valor: dados.alertas.exames_vencidos_com_doacao_ativa,
					rotulo: "Exames vencidos com doação ativa",
					para: "/gestao-doacoes",
					grave: true,
				},
				{
					valor: dados.alertas.exames_vencendo_em_30_dias,
					rotulo: "Exames vencendo em 30 dias",
					para: "/gestao-doacoes",
				},
				{
					valor: dados.alertas.doacoes_paradas_ha_mais_de_7_dias,
					rotulo: "Doações paradas há mais de 7 dias",
					para: "/gestao-doacoes",
				},
			]
		: [];

	const pendencias = alertas.filter((alerta) => alerta.valor > 0).length;

	return (
		<PainelCard
			icon={<Radio className="size-[15px]" strokeWidth={1.6} />}
			title="Operação agora"
			subtitle={
				dados ? (
					<AoVivo horario={formatTimeBR(new Date())} />
				) : (
					"O que está acontecendo neste momento"
				)
			}
		>
			{!dados ? (
				<IndicadorIndisponivel
					carregando={consulta.isLoading}
					onTentarDeNovo={() => consulta.refetch()}
				/>
			) : (
				<div className="grid grid-cols-1 gap-x-8 gap-y-2.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
					<div className="flex min-h-5 items-baseline justify-between gap-3 lg:col-start-1 lg:row-start-1">
						<p className="text-apoio font-semibold text-ink">Hoje</p>
					</div>
					<GradeDeNumeros className="auto-rows-fr grid-cols-2 lg:col-start-1 lg:row-start-2">
						<CelulaDeNumero
							valor={dados.rotas_em_andamento.length}
							rotulo="Rotas na rua"
						/>
						<CelulaDeNumero
							valor={dados.rotas_agendadas_hoje}
							rotulo="Rotas agendadas hoje"
						/>
						<CelulaDeNumero
							valor={dados.agendamentos_pendentes_hoje}
							rotulo="Agendamentos de hoje"
						/>
						<CelulaDeNumero
							valor={dados.agendamentos_atrasados}
							rotulo="Agendamentos atrasados"
							tom={dados.agendamentos_atrasados > 0 ? "atencao" : "neutro"}
							para="/gestao-agendamentos"
						/>
					</GradeDeNumeros>

					<div className="mt-5 flex min-h-5 items-baseline justify-between gap-3 lg:col-start-2 lg:row-start-1 lg:mt-0">
						<p className="text-apoio font-semibold text-ink">Pede atenção</p>
						<p className="text-rotulo text-ink-2">
							{pendencias === 0
								? "Nenhuma pendência"
								: `${pendencias} de ${alertas.length} com pendência`}
						</p>
					</div>
					<GradeDeNumeros className="auto-rows-fr grid-cols-2 sm:grid-cols-3 lg:col-start-2 lg:row-start-2">
						{alertas.map((alerta) => (
							<CelulaDeNumero
								key={alerta.rotulo}
								valor={alerta.valor}
								rotulo={alerta.rotulo}
								para={alerta.para}
								tom={
									alerta.valor === 0
										? "em-dia"
										: alerta.grave
											? "grave"
											: "atencao"
								}
							/>
						))}
					</GradeDeNumeros>

					<div className="mt-5 flex flex-col gap-2.5 lg:col-span-2 lg:row-start-3">
						<p className="text-apoio font-semibold text-ink">Rotas na rua</p>
						{dados.rotas_em_andamento.length > 0 ? (
							<div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
								{dados.rotas_em_andamento.map((rota) => (
									<RotaEmAndamentoLinha key={rota.id_rota} rota={rota} />
								))}
							</div>
						) : (
							<p className="border-t border-line pt-2.5 text-apoio text-ink-2">
								Nenhuma rota em andamento.{" "}
								{dados.rotas_agendadas_hoje > 0
									? `${dados.rotas_agendadas_hoje} agendada(s) para hoje.`
									: "Nada agendado para hoje."}
							</p>
						)}
					</div>
				</div>
			)}
		</PainelCard>
	);
}
