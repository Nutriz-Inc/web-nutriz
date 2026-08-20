import { ListChecks } from "lucide-react";
import { STEP_DISPLAY } from "@/pages/private/donations/adm/list/components/StatusBadge";
import type { ActiveDonationsByStep } from "@/services/types/i-dashboard";
import { STEP_NUMBER } from "@/utils/constants";
import { BAR_SHADES } from "../constants";
import { DashboardCardHeader } from "./DashboardCardHeader";

type ActiveDonationsByStepCardProps = {
	activeDonationsByStep: ActiveDonationsByStep[];
};

export function ActiveDonationsByStepCard({
	activeDonationsByStep,
}: ActiveDonationsByStepCardProps) {
	const sorted = [...activeDonationsByStep].sort(
		(a, b) => STEP_NUMBER[a.step] - STEP_NUMBER[b.step],
	);
	const total = sorted.reduce((sum, item) => sum + item.count, 0);

	return (
		<div className="flex w-full flex-col gap-[22px] rounded-card-sm border border-line bg-white p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<ListChecks className="size-4 text-blue-deep" />}
				iconBg="bg-canvas"
				title="Doações Ativas por Etapa"
				subtitle="Distribuição das doações em andamento no período"
			/>

			{total === 0 ? (
				<p className="py-8 text-center text-[13px] text-ink-3">
					Nenhuma doação ativa no período selecionado.
				</p>
			) : (
				<>
					<div className="flex flex-col gap-3.5">
						{sorted.map((item, index) => {
							const display = STEP_DISPLAY[item.step];
							const percentage = Math.max(
								0,
								Math.min(100, Math.round(item.percentage)),
							);

							return (
								<div key={item.step} className="flex items-center gap-3">
									<p className="w-10 shrink-0 text-right text-[13px] font-bold text-ink-2">
										{percentage}%
									</p>
									<div className="h-6 flex-1 overflow-hidden rounded-md bg-surface-3">
										<div
											className={`h-full rounded-md ${BAR_SHADES[index % BAR_SHADES.length]}`}
											style={{ width: `${percentage}%` }}
										/>
									</div>
									<p className="flex w-[160px] shrink-0 items-baseline gap-1 text-[12px]">
										<span className="truncate text-ink">{display.label}</span>
										<span className="shrink-0 text-ink-3">({item.count})</span>
									</p>
								</div>
							);
						})}
					</div>

					<div className="h-px w-full bg-blue-tint" />

					<div className="flex flex-col gap-0.5">
						<p className="text-[11px] text-ink-3">Total de doações ativas</p>
						<p className="text-[16px] font-bold text-ink">{total}</p>
					</div>
				</>
			)}
		</div>
	);
}
