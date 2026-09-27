import { Fuel } from "lucide-react";
import { CountUp } from "@/components/full/CountUp";
import type { FiltroDeIndicadores } from "@/services/types/i-analytics";
import { useIndicador } from "../hooks/use-indicadores";
import { formatOptionalDecimal } from "../utils";
import { CelulaDeNumero } from "./CelulaDeNumero";
import { GradeDeNumeros } from "./GradeDeNumeros";
import { IndicadorIndisponivel } from "./IndicadorIndisponivel";
import { PainelCard } from "./PainelCard";

export function LogisticaCard({ filtro }: { filtro: FiltroDeIndicadores }) {
	const consulta = useIndicador("logistica", filtro);
	const dados = consulta.data;

	return (
		<PainelCard
			icon={<Fuel className="size-[15px]" strokeWidth={1.6} />}
			title="Eficiência da coleta"
			subtitle="Quilômetros rodados para cada litro de leite coletado"
		>
			{!dados ? (
				<IndicadorIndisponivel
					carregando={consulta.isLoading}
					onTentarDeNovo={() => consulta.refetch()}
				/>
			) : dados.rotas_concluidas === 0 ? (
				<p className="py-8 text-center text-apoio text-ink-3">
					Nenhuma rota concluída no período.
				</p>
			) : (
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-1.5">
						<p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
							<span className="text-numero font-semibold leading-none tracking-tight tabular-nums text-blue-deep">
								{dados.km_por_litro_coletado == null ? (
									"—"
								) : (
									<CountUp value={dados.km_por_litro_coletado} decimals={1} />
								)}
							</span>
							<span className="text-apoio text-ink-2">km por litro</span>
						</p>
						<p className="text-rotulo text-ink-3">
							{formatOptionalDecimal(dados.km_rodados, " km", 0)} em{" "}
							{dados.rotas_concluidas} rotas concluídas
							{dados.rotas_com_km_implausivel > 0
								? ` · ${dados.rotas_com_km_implausivel} rota(s) com mais de ${dados.km_maximo_por_rota} km ficaram fora da conta`
								: ""}
						</p>
					</div>
					<GradeDeNumeros className="grid-cols-1 sm:grid-cols-3">
						<CelulaDeNumero
							valor={formatOptionalDecimal(dados.litros_por_rota, " L")}
							rotulo="Litros por rota"
							detalhe={`${formatOptionalDecimal(dados.litros_coletados_nas_rotas, " L")} coletados`}
						/>
						<CelulaDeNumero
							valor={formatOptionalDecimal(dados.paradas_por_rota)}
							rotulo="Paradas por rota"
							detalhe={`${dados.paradas_feitas} de ${dados.paradas} realizadas`}
						/>
						<CelulaDeNumero
							valor={formatOptionalDecimal(dados.taxa_de_imprevisto_pct, "%")}
							rotulo="Paradas com imprevisto"
							detalhe={`${dados.paradas_com_imprevisto} não realizadas`}
							tom={dados.paradas_com_imprevisto > 0 ? "atencao" : "neutro"}
						/>
					</GradeDeNumeros>
				</div>
			)}
		</PainelCard>
	);
}
