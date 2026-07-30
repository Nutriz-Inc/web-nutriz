import { ListChecks } from "lucide-react";
import { STEP_DISPLAY } from "@/pages/private/donations/adm/list/components/StatusBadge";
import type { ActiveDonationsByStep } from "@/services/types/i-dashboard";
import { STEP_NUMBER } from "@/utils/constants";
import { DashboardCardHeader } from "./DashboardCardHeader";
import { BAR_SHADES } from "../constants";

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
		<div className="flex w-full flex-col gap-[22px] rounded-[18px] border border-[#e5e7eb] bg-white p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<ListChecks className="size-4 text-[#00458b]" />}
				iconBg="bg-[#eaf4fc]"
				title="Doações Ativas por Etapa"
				subtitle="Distribuição das doações em andamento no período"
			/>

			{total === 0 ? (
				<p className="py-8 text-center text-[13px] text-[#9ca3af]">
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
									<p className="w-10 shrink-0 text-right text-[13px] font-bold text-[#6b7280]">
										{percentage}%
									</p>
									<div className="h-6 flex-1 overflow-hidden rounded-[6px] bg-[#eef2f7]">
										<div
											className={`h-full rounded-[6px] ${BAR_SHADES[index % BAR_SHADES.length]}`}
											style={{ width: `${percentage}%` }}
										/>
									</div>
									<p className="flex w-[160px] shrink-0 items-baseline gap-1 text-[12px]">
										<span className="truncate text-[#1f2a37]">
											{display.label}
										</span>
										<span className="shrink-0 text-[#9ca3af]">
											({item.count})
										</span>
									</p>
								</div>
							);
						})}
					</div>

					<div className="h-px w-full bg-[#e5e7eb]" />

					<div className="flex flex-col gap-0.5">
						<p className="text-[11px] text-[#9ca3af]">
							Total de doações ativas
						</p>
						<p className="text-[16px] font-bold text-[#1f2a37]">{total}</p>
					</div>
				</>
			)}
		</div>
	);
}
