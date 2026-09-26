import { Fuel, MapPinned, Milk, TriangleAlert } from "lucide-react";
import { CountUp } from "@/components/full/CountUp";
import type { FiltroDeIndicadores } from "@/services/types/i-analytics";
import { useIndicador } from "../hooks/use-indicadores";
import { formatOptionalDecimal } from "../utils";
import { IndicadorIndisponivel } from "./IndicadorIndisponivel";
import { PainelCard } from "./PainelCard";
import { RouteStatItem } from "./RouteStatItem";

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
				<p className="py-8 text-center text-[13px] text-ink-3">
					Nenhuma rota concluída no período.
				</p>
			) : (
				<div className="flex flex-col gap-5">
					<div className="flex flex-wrap items-end gap-x-3 gap-y-1">
						<p className="text-[40px] font-bold leading-none tabular-nums text-blue-deep">
							{dados.km_por_litro_coletado == null ? (
								"—"
							) : (
								<CountUp value={dados.km_por_litro_coletado} decimals={1} />
							)}
						</p>
						<p className="pb-1 text-[13px] text-ink-2">
							km por litro · {formatOptionalDecimal(dados.km_rodados, " km", 0)}{" "}
							em {dados.rotas_concluidas} rotas
						</p>
					</div>
					{dados.rotas_com_km_implausivel > 0 ? (
						<p className="-mt-2 text-[12px] text-ink-2">
							{dados.rotas_com_km_implausivel} rota(s) com mais de{" "}
							{dados.km_maximo_por_rota} km registrados ficaram fora da conta.
						</p>
					) : null}
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
						<RouteStatItem
							icon={<Milk className="size-[15px]" strokeWidth={1.6} />}
							label="Litros por rota"
							value={formatOptionalDecimal(dados.litros_por_rota, " L")}
							hint={`${formatOptionalDecimal(dados.litros_coletados_nas_rotas, " L")} coletados`}
						/>
						<RouteStatItem
							icon={<MapPinned className="size-[15px]" strokeWidth={1.6} />}
							label="Paradas por rota"
							value={formatOptionalDecimal(dados.paradas_por_rota)}
							hint={`${dados.paradas_feitas} de ${dados.paradas} realizadas`}
						/>
						<RouteStatItem
							icon={<TriangleAlert className="size-[15px]" strokeWidth={1.6} />}
							label="Imprevistos"
							value={formatOptionalDecimal(dados.taxa_de_imprevisto_pct, "%")}
							hint={`${dados.paradas_com_imprevisto} paradas não realizadas`}
						/>
					</div>
				</div>
			)}
		</PainelCard>
	);
}
