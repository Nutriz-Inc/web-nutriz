import { Droplet } from "lucide-react";
import type { MilkCollectedByMonth } from "@/services/types/i-dashboard";
import { DashboardCardHeader } from "./DashboardCardHeader";

type MilkCollectedCardProps = {
	total: number;
	byMonth: MilkCollectedByMonth[];
};

export function MilkCollectedCard({ total, byMonth }: MilkCollectedCardProps) {
	const maxValue = Math.max(...byMonth.map((item) => item.total), 1);
	const currentMonth = byMonth.at(-1)?.month;

	return (
		<div className="flex w-full flex-col gap-[22px] rounded-[18px] border border-[#e5e7eb] bg-white px-5 pb-6 pt-6 lg:px-7">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
				<DashboardCardHeader
					icon={<Droplet className="size-4 text-[#00458b]" />}
					iconBg="bg-[#eaf4fc]"
					title="Litros Captados por Mês"
					subtitle="Volume total de leite coletado, todas as doadoras"
				/>

				<div className="flex shrink-0 flex-col items-start gap-1 lg:items-end">
					<p className="text-[28px] font-bold text-[#00458b] lg:text-[32px]">
						{(total / 1000).toLocaleString("pt-BR", {
							maximumFractionDigits: 1,
						})}{" "}
						L
					</p>
					<p className="text-[12px] text-[#9ca3af]">Total no período</p>
				</div>
			</div>

			{byMonth.length === 0 ? (
				<p className="py-8 text-center text-[13px] text-[#9ca3af]">
					Nenhum dado disponível para o período selecionado.
				</p>
			) : (
				<>
					<div className="flex items-center gap-2.5">
						<span className="size-[9px] rounded-full bg-[#00458b]" />
						<p className="text-[12px] text-[#6b7280]">Mês vigente</p>
						<span className="size-[9px] rounded-full bg-[#bfe0f5]" />
						<p className="text-[12px] text-[#6b7280]">Meses anteriores</p>
					</div>

					<div className="flex h-[220px] min-w-max items-end gap-3 overflow-x-auto lg:h-[280px] lg:gap-5">
						{byMonth.map((item) => {
							const isCurrent = item.month === currentMonth;
							const heightPercent = Math.max((item.total / maxValue) * 100, 4);

							return (
								<div
									key={item.month}
									className="flex h-full w-10 shrink-0 flex-col items-center justify-end gap-2 lg:w-14"
								>
									<p className="text-[12px] font-medium text-[#1f2a37]">
										{item.total}
									</p>
									<div
										className={`w-full rounded-t-[4px] ${isCurrent ? "bg-[#00458b]" : "bg-[#bfe0f5]"}`}
										style={{ height: `${heightPercent}%` }}
									/>
									<p className="text-[11px] uppercase text-[#6b7280]">
										{item.month}
									</p>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
