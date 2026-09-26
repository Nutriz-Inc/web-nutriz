type NumeroDoDiaProps = {
	valor: number;
	rotulo: string;
	atencao?: boolean;
};

export function NumeroDoDia({
	valor,
	rotulo,
	atencao = false,
}: NumeroDoDiaProps) {
	return (
		<div className="flex flex-col gap-1 rounded-card-sm bg-surface-2 px-4 py-3">
			<p
				className={
					atencao && valor > 0
						? "text-[26px] font-bold leading-none tabular-nums text-orange"
						: "text-[26px] font-bold leading-none tabular-nums text-ink"
				}
			>
				{valor}
			</p>
			<p className="text-[12px] leading-snug text-ink-2">{rotulo}</p>
		</div>
	);
}
