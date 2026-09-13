export type ItemDaLegenda = {
	rotulo: string;
	valor: number | string;
	cor: string;
};

type LegendaDeSeriesProps = {
	itens: ItemDaLegenda[];
	className?: string;
};

export function LegendaDeSeries({ itens, className }: LegendaDeSeriesProps) {
	return (
		<ul className={className ?? "flex w-full flex-col gap-2.5"}>
			{itens.map((item) => (
				<li
					key={item.rotulo}
					className="flex items-center justify-between gap-3"
				>
					<span className="flex min-w-0 items-center gap-2.5">
						<span
							className="size-[10px] shrink-0 rounded-[3px]"
							style={{ backgroundColor: item.cor }}
						/>
						<span className="truncate text-[13px] text-ink-2">
							{item.rotulo}
						</span>
					</span>
					<span className="shrink-0 text-[15px] font-bold tabular-nums text-ink">
						{item.valor}
					</span>
				</li>
			))}
		</ul>
	);
}
