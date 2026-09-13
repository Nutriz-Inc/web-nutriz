import { FlaskConical } from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";
import type { BottleStats } from "@/services/types/i-dashboard";
import { formatDecimal, toPercent } from "../utils";
import { LegendaDeSeries } from "./charts/LegendaDeSeries";
import { CORES_DO_GRAFICO } from "./charts/paleta";
import { RoscaComCentro } from "./charts/RoscaComCentro";
import { DashboardCardHeader } from "./DashboardCardHeader";

type BottlesCardProps = {
	stats: BottleStats;
};

const configuracao = {
	aproveitados: { label: "Aproveitados", color: CORES_DO_GRAFICO.roxo },
	descartados: { label: "Descartados", color: CORES_DO_GRAFICO.vermelho },
} satisfies ChartConfig;

export function BottlesCard({ stats }: BottlesCardProps) {
	const {
		bottles_count,
		discarded_bottles_count,
		average_bottles_per_donor,
		bottles_utilization_rate,
	} = stats;

	const utilizationPercent = toPercent(bottles_utilization_rate);
	const usedCount = Math.max(bottles_count - discarded_bottles_count, 0);

	const fatias = [
		{
			chave: "aproveitados",
			valor: usedCount,
			cor: CORES_DO_GRAFICO.roxo,
		},
		{
			chave: "descartados",
			valor: discarded_bottles_count,
			cor: CORES_DO_GRAFICO.vermelho,
		},
	];

	return (
		<div className="flex h-full w-full flex-col gap-4 rounded-card-sm border border-line bg-surface p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<FlaskConical className="size-[15px]" strokeWidth={1.6} />}
				title="Aproveitamento dos Frascos"
				subtitle="Frascos utilizados e descartados no período"
			/>

			{bottles_count === 0 ? (
				<p className="py-8 text-center text-[13px] text-ink-3">
					Nenhum frasco registrado no período selecionado.
				</p>
			) : (
				<>
					<div className="flex items-center gap-4 sm:gap-6">
						<RoscaComCentro
							config={configuracao}
							fatias={fatias}
							destaque={`${utilizationPercent}%`}
							legenda="aproveitados"
						/>

						<LegendaDeSeries
							itens={[
								{
									rotulo: "Aproveitados",
									valor: usedCount,
									cor: CORES_DO_GRAFICO.roxo,
								},
								{
									rotulo: "Descartados",
									valor: discarded_bottles_count,
									cor: CORES_DO_GRAFICO.vermelho,
								},
							]}
						/>
					</div>

					<div className="mt-auto flex flex-col gap-3">
						<div className="h-px w-full bg-blue-tint" />
						<div className="flex gap-8">
							<div className="flex flex-col gap-0.5">
								<p className="text-[11px] text-ink-3">Frascos coletados</p>
								<p className="text-[16px] font-bold tabular-nums text-ink">
									{bottles_count}
								</p>
							</div>
							<div className="flex flex-col gap-0.5">
								<p className="text-[11px] text-ink-3">Média por doadora</p>
								<p className="text-[16px] font-bold tabular-nums text-ink">
									{formatDecimal(average_bottles_per_donor)}
								</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
