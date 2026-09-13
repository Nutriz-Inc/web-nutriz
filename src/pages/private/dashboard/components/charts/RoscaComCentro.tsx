import { Cell, Label, Pie, PieChart } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export type FatiaDaRosca = {
	chave: string;
	valor: number;
	cor: string;
};

type RoscaComCentroProps = {
	config: ChartConfig;
	fatias: FatiaDaRosca[];
	destaque: string;
	legenda: string;
	className?: string;
};

export function RoscaComCentro({
	config,
	fatias,
	destaque,
	legenda,
	className,
}: RoscaComCentroProps) {
	return (
		<ChartContainer
			config={config}
			className={className ?? "aspect-square h-[152px] w-[152px] shrink-0"}
		>
			<PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent nameKey="chave" hideLabel />}
				/>
				<Pie
					data={fatias}
					dataKey="valor"
					nameKey="chave"
					innerRadius="64%"
					outerRadius="96%"
					paddingAngle={3}
					cornerRadius={6}
					strokeWidth={0}
				>
					{fatias.map((fatia) => (
						<Cell key={fatia.chave} fill={fatia.cor} />
					))}
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
										y={(viewBox.cy ?? 0) - 4}
										className="fill-ink text-[24px] font-bold"
									>
										{destaque}
									</tspan>
									<tspan
										x={viewBox.cx}
										y={(viewBox.cy ?? 0) + 16}
										className="fill-ink-3 text-[11px]"
									>
										{legenda}
									</tspan>
								</text>
							);
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}
