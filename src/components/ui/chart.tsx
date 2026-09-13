import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
	[k in string]: {
		label?: React.ReactNode;
		icon?: React.ComponentType;
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
	);
};

type ChartContextProps = {
	config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
	const context = React.useContext(ChartContext);

	if (!context) {
		throw new Error("useChart deve ser usado dentro de um <ChartContainer />");
	}

	return context;
}

function ChartContainer({
	id,
	className,
	children,
	config,
	...props
}: React.ComponentProps<"div"> & {
	config: ChartConfig;
	children: React.ComponentProps<
		typeof RechartsPrimitive.ResponsiveContainer
	>["children"];
}) {
	const uniqueId = React.useId();
	const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

	return (
		<ChartContext.Provider value={{ config }}>
			<div
				data-slot="chart"
				data-chart={chartId}
				className={cn(
					"flex aspect-video justify-center text-[12px] [&_.recharts-cartesian-axis-tick_text]:fill-ink-3 [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-line [&_.recharts-curve.recharts-tooltip-cursor]:stroke-line [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-line [&_.recharts-radial-bar-background-sector]:fill-surface-3 [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-surface-3 [&_.recharts-reference-line_[stroke='#ccc']]:stroke-line [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
					className,
				)}
				{...props}
			>
				<ChartStyle id={chartId} config={config} />
				<RechartsPrimitive.ResponsiveContainer>
					{children}
				</RechartsPrimitive.ResponsiveContainer>
			</div>
		</ChartContext.Provider>
	);
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
	const colorConfig = Object.entries(config).filter(
		([, item]) => item.theme || item.color,
	);

	if (!colorConfig.length) {
		return null;
	}

	return (
		<style
			// biome-ignore lint/security/noDangerouslySetInnerHtml: o shadcn injeta as variaveis de cor do grafico por CSS
			dangerouslySetInnerHTML={{
				__html: Object.entries(THEMES)
					.map(
						([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
	.map(([key, itemConfig]) => {
		const color =
			itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
			itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	})
	.join("\n")}
}
`,
					)
					.join("\n"),
			}}
		/>
	);
};

const ChartTooltip = RechartsPrimitive.Tooltip;

type ItemDoTooltip = {
	name?: string | number;
	dataKey?: string | number;
	value?: number | string;
	color?: string;
	payload?: Record<string, unknown>;
};

function ChartTooltipContent({
	active,
	payload,
	className,
	hideLabel = false,
	hideIndicator = false,
	nameKey,
	formatarValor,
}: {
	active?: boolean;
	payload?: ItemDoTooltip[];
	className?: string;
	hideLabel?: boolean;
	hideIndicator?: boolean;
	nameKey?: string;
	formatarValor?: (valor: number | string) => string;
}) {
	const { config } = useChart();

	if (!active || !payload?.length) {
		return null;
	}

	return (
		<div
			className={cn(
				"grid min-w-[9rem] items-start gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[12px] shadow-lift",
				className,
			)}
		>
			{payload.map((item, index) => {
				const chave = String(
					nameKey
						? (item.payload?.[nameKey] ?? item.name)
						: (item.dataKey ?? item.name ?? "value"),
				);
				const itemConfig = config[chave];
				const cor =
					(item.payload?.fill as string | undefined) ?? item.color ?? undefined;
				const rotulo = hideLabel ? null : (itemConfig?.label ?? chave);

				return (
					<div
						key={`${chave}-${index}`}
						className="flex w-full items-center gap-2"
					>
						{hideIndicator ? null : (
							<span
								className="size-2.5 shrink-0 rounded-[3px]"
								style={{ backgroundColor: cor }}
							/>
						)}
						<span className="flex-1 text-ink-2">{rotulo}</span>
						{item.value !== undefined ? (
							<span className="font-bold tabular-nums text-ink">
								{formatarValor
									? formatarValor(item.value)
									: item.value.toLocaleString("pt-BR")}
							</span>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

const ChartLegend = RechartsPrimitive.Legend;

export {
	ChartContainer,
	ChartLegend,
	ChartStyle,
	ChartTooltip,
	ChartTooltipContent,
};
