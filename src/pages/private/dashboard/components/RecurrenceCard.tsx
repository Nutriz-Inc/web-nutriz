import { RefreshCcw } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { toPercent } from "../utils";
import { CORES_DO_GRAFICO } from "./charts/paleta";
import { DashboardCardHeader } from "./DashboardCardHeader";

type RecurrenceCardProps = {
	rate: number;
};

const configuracao = {
	recorrencia: { label: "Recorrência", color: CORES_DO_GRAFICO.azul },
} satisfies ChartConfig;

export function RecurrenceCard({ rate }: RecurrenceCardProps) {
	const percent = toPercent(rate);
	const dados = [{ nome: "recorrencia", valor: percent }];

	return (
		<div className="flex h-full w-full flex-col gap-4 rounded-card-sm border border-line bg-surface p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<RefreshCcw className="size-[15px]" strokeWidth={1.6} />}
				title="Taxa de Recorrência de Doadoras"
				subtitle="Doadoras que ajudaram mais de uma vez"
			/>

			<div className="flex flex-1 flex-col items-center justify-center">
				<ChartContainer
					config={configuracao}
					className="aspect-square h-[168px] w-full max-w-[200px]"
				>
					<RadialBarChart
						data={dados}
						startAngle={90}
						endAngle={90 - (percent / 100) * 360}
						innerRadius={62}
						outerRadius={84}
					>
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (!viewBox || !("cx" in viewBox)) {
										return null;
									}
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-ink text-[32px] font-bold"
											>
												{`${percent}%`}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy ?? 0) + 26}
												className="fill-ink-3 text-[12px]"
											>
												voltaram a doar
											</tspan>
										</text>
									);
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey="valor"
							background={{ fill: CORES_DO_GRAFICO.trilho }}
							cornerRadius={11}
							fill="var(--color-recorrencia)"
						/>
					</RadialBarChart>
				</ChartContainer>

				<p className="mt-1 text-center text-[13px] leading-snug text-ink-2">
					De cada 100 doadoras,{" "}
					<span className="font-semibold text-ink">{percent}</span> doaram mais
					de uma vez no período.
				</p>
			</div>
		</div>
	);
}
