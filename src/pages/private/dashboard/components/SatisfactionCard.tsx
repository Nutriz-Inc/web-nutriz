import { Star } from "lucide-react";
import type { FeedbackScoreCount } from "@/services/types/i-dashboard";
import { SCORE_OPACITY } from "../constants";
import { DashboardCardHeader } from "./DashboardCardHeader";

type SatisfactionCardProps = {
	feedbackByScore: FeedbackScoreCount[];
};

export function SatisfactionCard({ feedbackByScore }: SatisfactionCardProps) {
	const sorted = [...feedbackByScore].sort((a, b) => b.score - a.score);
	const totalCount = sorted.reduce((sum, item) => sum + item.count, 0);
	const maxCount = Math.max(...sorted.map((item) => item.count), 1);
	const averageScore = totalCount
		? sorted.reduce((sum, item) => sum + item.score * item.count, 0) /
			totalCount
		: 0;
	const positiveCount = sorted
		.filter((item) => item.score >= 4)
		.reduce((sum, item) => sum + item.count, 0);
	const positiveRate = totalCount
		? Math.round((positiveCount / totalCount) * 100)
		: 0;

	return (
		<div className="flex w-full flex-col gap-[22px] rounded-card-sm border border-line bg-surface p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<Star className="size-4 text-eva-deep" />}
				iconBg="bg-danger-tint"
				title="Nível de Satisfação"
				subtitle="Distribuição de avaliações por estrela"
			/>

			{totalCount === 0 ? (
				<p className="py-8 text-center text-[13px] text-ink-3">
					Nenhuma avaliação no período selecionado.
				</p>
			) : (
				<>
					<div className="flex flex-col gap-2.5">
						{sorted.map((item) => {
							const widthPercent = Math.max((item.count / maxCount) * 100, 2);
							const percentOfTotal = Math.round(
								(item.count / totalCount) * 100,
							);

							return (
								<div key={item.score} className="flex items-center gap-2.5">
									<p className="w-[70px] shrink-0 text-[13px] text-ink-2">
										{item.score} estrela{item.score > 1 ? "s" : ""}
									</p>
									<div className="h-5 flex-1 overflow-hidden rounded-sm bg-surface-2">
										<div
											className={`h-full rounded-sm ${SCORE_OPACITY[item.score] ?? "bg-eva"}`}
											style={{ width: `${widthPercent}%` }}
										/>
									</div>
									<p className="w-[70px] shrink-0 text-right text-[12px] text-ink-3">
										{item.count} ({percentOfTotal}%)
									</p>
								</div>
							);
						})}
					</div>

					<div className="h-px w-full bg-blue-tint" />

					<div className="flex gap-8">
						<div className="flex flex-col gap-0.5">
							<p className="text-[11px] text-ink-3">Avaliações no período</p>
							<p className="text-[16px] font-bold text-ink">{totalCount}</p>
						</div>
						<div className="flex flex-col gap-0.5">
							<p className="text-[11px] text-ink-3">Nota Média</p>
							<p className="text-[16px] font-bold text-eva-deep">
								{averageScore.toFixed(1)}{" "}
								<span className="text-[11px] font-normal">/ 5</span>
							</p>
						</div>
						<div className="flex flex-col gap-0.5">
							<p className="text-[11px] text-ink-3">4 ou 5 Estrelas</p>
							<p className="text-[16px] font-bold text-ink">{positiveRate}%</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
