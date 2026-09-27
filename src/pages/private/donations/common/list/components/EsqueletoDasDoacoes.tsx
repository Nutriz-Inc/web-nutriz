export function EsqueletoDasDoacoes() {
	return (
		<div
			role="status"
			aria-label="Carregando as suas doações"
			className="flex flex-col gap-6 lg:gap-8"
		>
			<div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-6">
				<div className="esqueleto h-72 rounded-card lg:h-80" />
				<div className="esqueleto h-48 rounded-card lg:h-80" />
			</div>
			<div className="flex flex-col gap-3">
				<div className="esqueleto h-6 w-32 rounded-full" />
				<div className="esqueleto h-64 rounded-card" />
			</div>
		</div>
	);
}
