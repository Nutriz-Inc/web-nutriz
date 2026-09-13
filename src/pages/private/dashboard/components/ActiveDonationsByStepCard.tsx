import { ListChecks } from "lucide-react";
import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import type { ActiveDonationsByStep } from "@/services/types/i-dashboard";
import { STEP_NUMBER } from "@/utils/constants";
import { STEP_DISPLAY } from "@/utils/status";
import { CORES_DO_GRAFICO } from "./charts/paleta";
import { DashboardCardHeader } from "./DashboardCardHeader";

type ActiveDonationsByStepCardProps = {
	activeDonationsByStep: ActiveDonationsByStep[];
};

const configuracao = {
	count: { label: "Doações" },
} satisfies ChartConfig;

export function ActiveDonationsByStepCard({
	activeDonationsByStep,
}: ActiveDonationsByStepCardProps) {
	const sorted = [...activeDonationsByStep].sort(
		(a, b) => STEP_NUMBER[a.step] - STEP_NUMBER[b.step],
	);
	const total = sorted.reduce((sum, item) => sum + item.count, 0);
	const gargalo = sorted.reduce(
		(acumulado, item) => (item.count > acumulado.count ? item : acumulado),
		sorted[0],
	);

	const dados = sorted.map((item) => ({
		etapa: STEP_DISPLAY[item.step]?.label ?? item.step,
		count: item.count,
		ehGargalo: item.step === gargalo?.step,
	}));

	return (
		<div className="flex h-full w-full flex-col gap-4 rounded-card-sm border border-line bg-surface p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<ListChecks className="size-[15px]" strokeWidth={1.6} />}
				title="Doações Ativas por Etapa"
				subtitle="Onde as doações em andamento estão paradas"
			/>

			{total === 0 ? (
				<p className="py-8 text-center text-[13px] text-ink-3">
					Nenhuma doação ativa no período selecionado.
				</p>
			) : (
				<>
					<ChartContainer
						config={configuracao}
						className="aspect-auto h-[168px] w-full"
					>
						<BarChart
							accessibilityLayer
							data={dados}
							layout="vertical"
							margin={{ left: 0, right: 32, top: 0, bottom: 0 }}
							barCategoryGap={6}
						>
							<XAxis type="number" dataKey="count" hide />
							<YAxis
								dataKey="etapa"
								type="category"
								tickLine={false}
								axisLine={false}
								width={116}
								tick={{ fontSize: 12 }}
							/>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<Bar dataKey="count" radius={6} barSize={20}>
								{dados.map((item) => (
									<Cell
										key={item.etapa}
										fill={
											item.ehGargalo
												? CORES_DO_GRAFICO.roxo
												: CORES_DO_GRAFICO.trilho
										}
									/>
								))}
								<LabelList
									dataKey="count"
									position="right"
									offset={10}
									className="fill-ink text-[12px] font-bold"
								/>
							</Bar>
						</BarChart>
					</ChartContainer>

					<div className="mt-auto flex flex-col gap-3">
						<div className="h-px w-full bg-blue-tint" />
						<div className="flex items-end justify-between gap-4">
							<div className="flex flex-col gap-0.5">
								<p className="text-[11px] text-ink-3">
									Total de doações ativas
								</p>
								<p className="text-[16px] font-bold tabular-nums text-ink">
									{total}
								</p>
							</div>
							{gargalo ? (
								<p className="max-w-[60%] text-right text-[12px] leading-snug text-ink-2">
									A maior fila está em{" "}
									<span className="font-semibold text-ink">
										{STEP_DISPLAY[gargalo.step]?.label ?? gargalo.step}
									</span>
									.
								</p>
							) : null}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
