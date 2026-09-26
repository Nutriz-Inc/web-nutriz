type IndicadorIndisponivelProps = {
	carregando: boolean;
	onTentarDeNovo: () => void;
};

export function IndicadorIndisponivel({
	carregando,
	onTentarDeNovo,
}: IndicadorIndisponivelProps) {
	if (carregando) {
		return <div className="esqueleto h-28 w-full rounded-card-sm" />;
	}

	return (
		<div className="flex flex-col items-center gap-2 py-6 text-center">
			<p className="text-[13px] text-ink-2">
				Não foi possível carregar este indicador agora.
			</p>
			<button
				type="button"
				onClick={onTentarDeNovo}
				className="text-[13px] font-semibold text-blue underline-offset-4 hover:underline"
			>
				Tentar de novo
			</button>
		</div>
	);
}
