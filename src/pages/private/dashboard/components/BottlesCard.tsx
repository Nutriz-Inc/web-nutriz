import { FlaskConical } from "lucide-react";
import type { BottleStats } from "@/services/types/i-dashboard";
import { formatDecimal, toPercent } from "../utils";
import { DashboardCardHeader } from "./DashboardCardHeader";

type BottlesCardProps = {
	stats: BottleStats;
};

export function BottlesCard({ stats }: BottlesCardProps) {
	const {
		bottles_count,
		discarded_bottles_count,
		average_bottles_per_donor,
		bottles_utilization_rate,
	} = stats;

	const utilizationPercent = toPercent(bottles_utilization_rate);
	const usedCount = Math.max(bottles_count - discarded_bottles_count, 0);
	const usedPercent = bottles_count ? (usedCount / bottles_count) * 100 : 0;

	return (
		<div className="flex w-full flex-col gap-[22px] rounded-card-sm border border-line bg-surface p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<FlaskConical className="size-4 text-blue-deep" />}
				iconBg="bg-canvas"
				title="Aproveitamento dos Frascos"
				subtitle="Frascos utilizados e descartados no período"
			/>

			{bottles_count === 0 ? (
				<p className="py-8 text-center text-[13px] text-ink-3">
					Nenhum frasco registrado no período selecionado.
				</p>
			) : (
				<>
					<div className="flex flex-col gap-3">
						<div className="flex items-baseline justify-between gap-3">
							<p className="text-[28px] font-medium text-ink">
								{utilizationPercent}%
							</p>
							<p className="text-[12px] text-ink-3">Taxa de aproveitamento</p>
						</div>

						<div className="flex h-8 w-full overflow-hidden rounded-md bg-ink-3/[0.13]">
							<div
								className="h-full bg-blue-deep"
								style={{ width: `${usedPercent}%` }}
							/>
							<div
								className="h-full bg-eva/70"
								style={{ width: `${100 - usedPercent}%` }}
							/>
						</div>

						<div className="flex items-center gap-2.5">
							<span className="size-[9px] rounded-full bg-blue-deep" />
							<p className="text-[12px] text-ink-2">Aproveitados</p>
							<span className="size-[9px] rounded-full bg-eva/70" />
							<p className="text-[12px] text-ink-2">Descartados</p>
						</div>
					</div>

					<div className="h-px w-full bg-blue-tint" />

					<div className="flex gap-8">
						<div className="flex flex-col gap-0.5">
							<p className="text-[11px] text-ink-3">Frascos coletados</p>
							<p className="text-[16px] font-bold text-ink">{bottles_count}</p>
						</div>
						<div className="flex flex-col gap-0.5">
							<p className="text-[11px] text-ink-3">Descartados</p>
							<p className="text-[16px] font-bold text-eva-deep">
								{discarded_bottles_count}
							</p>
						</div>
						<div className="flex flex-col gap-0.5">
							<p className="text-[11px] text-ink-3">Média por doadora</p>
							<p className="text-[16px] font-bold text-ink">
								{formatDecimal(average_bottles_per_donor)}
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
