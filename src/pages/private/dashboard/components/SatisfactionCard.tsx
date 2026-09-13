import { Star } from "lucide-react";
import type { FeedbackScoreCount } from "@/services/types/i-dashboard";
import { formatDecimal } from "../utils";
import { CORES_DO_GRAFICO } from "./charts/paleta";
import { DashboardCardHeader } from "./DashboardCardHeader";

type SatisfactionCardProps = {
	feedbackByScore: FeedbackScoreCount[];
};

const NOTAS = [5, 4, 3, 2, 1];

function corDaNota(nota: number) {
	if (nota >= 4) return CORES_DO_GRAFICO.azul;
	if (nota === 3) return CORES_DO_GRAFICO.trilho;
	return CORES_DO_GRAFICO.vermelho;
}

export function SatisfactionCard({ feedbackByScore }: SatisfactionCardProps) {
	const porNota = new Map(
		feedbackByScore.map((item) => [item.score, item.count]),
	);
	const contar = (...notas: number[]) =>
		notas.reduce((soma, nota) => soma + (porNota.get(nota) ?? 0), 0);

	const negativas = contar(1, 2);
	const neutras = contar(3);
	const positivas = contar(4, 5);
	const totalCount = negativas + neutras + positivas;
	const maior = Math.max(...NOTAS.map((nota) => porNota.get(nota) ?? 0), 1);

	const averageScore = totalCount
		? feedbackByScore.reduce(
				(soma, item) => soma + item.score * item.count,
				0,
			) / totalCount
		: 0;
	const positiveRate = totalCount
		? Math.round((positivas / totalCount) * 100)
		: 0;

	return (
		<div className="flex h-full w-full flex-col gap-4 rounded-card-sm border border-line bg-surface p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<Star className="size-[15px]" strokeWidth={1.6} />}
				title="Nível de Satisfação"
				subtitle="Distribuição das avaliações por estrela"
			/>

			{totalCount === 0 ? (
				<p className="py-8 text-center text-[13px] text-ink-3">
					Nenhuma avaliação no período selecionado.
				</p>
			) : (
				<>
					<div className="flex items-center gap-5">
						<div className="flex shrink-0 flex-col items-center gap-1">
							<p className="text-[40px] font-bold leading-none tabular-nums text-ink">
								{formatDecimal(averageScore)}
							</p>
							<div className="flex gap-0.5">
								{[1, 2, 3, 4, 5].map((nota) => (
									<Star
										key={nota}
										className={
											nota <= Math.round(averageScore)
												? "size-3 fill-chart-5 text-chart-5"
												: "size-3 fill-chart-trilho text-chart-trilho"
										}
										strokeWidth={0}
									/>
								))}
							</div>
							<p className="text-[11px] text-ink-3">{totalCount} avaliações</p>
						</div>

						<ul className="flex min-w-0 flex-1 flex-col gap-2">
							{NOTAS.map((nota) => {
								const count = porNota.get(nota) ?? 0;
								const largura = Math.max((count / maior) * 100, 2);

								return (
									<li key={nota} className="flex items-center gap-2">
										<span className="w-3 shrink-0 text-right text-[11px] tabular-nums text-ink-3">
											{nota}
										</span>
										<span className="h-2 flex-1 overflow-hidden rounded-full bg-chart-trilho">
											<span
												className="block h-full rounded-full"
												style={{
													width: `${largura}%`,
													backgroundColor: corDaNota(nota),
												}}
											/>
										</span>
										<span className="w-6 shrink-0 text-right text-[11px] font-semibold tabular-nums text-ink-2">
											{count}
										</span>
									</li>
								);
							})}
						</ul>
					</div>

					<div className="mt-auto flex flex-col gap-3">
						<div className="h-px w-full bg-blue-tint" />
						<div className="flex gap-7">
							<div className="flex flex-col gap-0.5">
								<p className="text-[11px] text-ink-3">Positivas</p>
								<p className="text-[16px] font-bold tabular-nums text-chart-2">
									{positiveRate}%
								</p>
							</div>
							<div className="flex flex-col gap-0.5">
								<p className="text-[11px] text-ink-3">Neutras</p>
								<p className="text-[16px] font-bold tabular-nums text-ink-2">
									{neutras}
								</p>
							</div>
							<div className="flex flex-col gap-0.5">
								<p className="text-[11px] text-ink-3">Negativas</p>
								<p className="text-[16px] font-bold tabular-nums text-chart-3">
									{negativas}
								</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
