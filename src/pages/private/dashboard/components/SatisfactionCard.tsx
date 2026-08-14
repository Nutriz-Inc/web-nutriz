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
		<div className="flex w-full flex-col gap-[22px] rounded-[18px] border border-[#e5e7eb] bg-white p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<Star className="size-4 text-[#f2579f]" />}
				iconBg="bg-[#fdebf3]"
				title="Nível de Satisfação"
				subtitle="Distribuição de avaliações por estrela"
			/>

			{totalCount === 0 ? (
				<p className="py-8 text-center text-[13px] text-[#9ca3af]">
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
									<p className="w-[70px] shrink-0 text-[13px] text-[#4b5563]">
										{item.score} estrela{item.score > 1 ? "s" : ""}
									</p>
									<div className="h-5 flex-1 overflow-hidden rounded-[4px] bg-[#f4f4f5]">
										<div
											className={`h-full rounded-[4px] ${SCORE_OPACITY[item.score] ?? "bg-[#f25ca2]"}`}
											style={{ width: `${widthPercent}%` }}
										/>
									</div>
									<p className="w-[70px] shrink-0 text-right text-[12px] text-[#9ca3af]">
										{item.count} ({percentOfTotal}%)
									</p>
								</div>
							);
						})}
					</div>

					<div className="h-px w-full bg-[#e5e7eb]" />

					<div className="flex gap-8">
						<div className="flex flex-col gap-0.5">
							<p className="text-[11px] text-[#9ca3af]">
								Avaliações no período
							</p>
							<p className="text-[16px] font-bold text-[#1f2a37]">
								{totalCount}
							</p>
						</div>
						<div className="flex flex-col gap-0.5">
							<p className="text-[11px] text-[#9ca3af]">Nota Média</p>
							<p className="text-[16px] font-bold text-[#f25ca2]">
								{averageScore.toFixed(1)}{" "}
								<span className="text-[11px] font-normal">/ 5</span>
							</p>
						</div>
						<div className="flex flex-col gap-0.5">
							<p className="text-[11px] text-[#9ca3af]">4 ou 5 Estrelas</p>
							<p className="text-[16px] font-bold text-[#1f2a37]">
								{positiveRate}%
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
