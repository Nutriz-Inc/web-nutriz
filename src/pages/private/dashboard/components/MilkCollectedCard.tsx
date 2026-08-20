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
		<div className="flex w-full flex-col gap-[22px] rounded-card-sm border border-line bg-white px-5 pb-6 pt-6 lg:px-7">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
				<DashboardCardHeader
					icon={<Droplet className="size-4 text-blue-deep" />}
					iconBg="bg-canvas"
					title="Litros Captados por Mês"
					subtitle="Volume total de leite coletado, todas as doadoras"
				/>

				<div className="flex shrink-0 flex-col items-start gap-1 lg:items-end">
					<p className="text-[28px] font-bold text-blue-deep lg:text-[32px]">
						{(total / 1000).toLocaleString("pt-BR", {
							maximumFractionDigits: 1,
						})}{" "}
						L
					</p>
					<p className="text-[12px] text-ink-3">Total no período</p>
				</div>
			</div>

			{byMonth.length === 0 ? (
				<p className="py-8 text-center text-[13px] text-ink-3">
					Nenhum dado disponível para o período selecionado.
				</p>
			) : (
				<>
					<div className="flex items-center gap-2.5">
						<span className="size-[9px] rounded-full bg-blue-deep" />
						<p className="text-[12px] text-ink-2">Mês vigente</p>
						<span className="size-[9px] rounded-full bg-blue-tint-2" />
						<p className="text-[12px] text-ink-2">Meses anteriores</p>
					</div>

					{/* min-w-max NAO pode ficar aqui: com ele o proprio container de scroll
					    cresce ate o tamanho do conteudo, o overflow-x-auto nunca entra e o
					    card empurra a pagina no mobile. As barras ja tem shrink-0. */}
					<div className="flex h-[220px] items-end gap-3 overflow-x-auto lg:h-[280px] lg:gap-5">
						{byMonth.map((item) => {
							const isCurrent = item.month === currentMonth;
							const heightPercent = Math.max((item.total / maxValue) * 100, 4);

							return (
								<div
									key={item.month}
									className="flex h-full w-10 shrink-0 flex-col items-center justify-end gap-2 lg:w-14"
								>
									<p className="text-[12px] font-medium text-ink">
										{item.total}
									</p>
									<div
										className={`w-full rounded-t-[4px] ${isCurrent ? "bg-blue-deep" : "bg-blue-tint-2"}`}
										style={{ height: `${heightPercent}%` }}
									/>
									<p className="text-[11px] uppercase text-ink-2">
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
