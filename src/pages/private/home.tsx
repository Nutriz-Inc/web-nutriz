export function HomePage() {
	return (
		<div className="grid gap-6">
			<section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
							Resumo de hoje
						</p>
						<h1 className="mt-3 text-3xl font-semibold text-slate-950">Olá, Maria</h1>
						<p className="mt-2 max-w-2xl text-sm text-slate-600">
							Confira seu plano de refeições, metas e recomendações para o dia.
						</p>
					</div>
				</div>
			</section>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
					<p className="text-sm text-slate-500">Calorias consumidas</p>
					<p className="mt-4 text-3xl font-semibold text-slate-950">1.320</p>
					<p className="mt-2 text-sm text-slate-600">Meta diária: 1.800 kcal</p>
				</div>
				<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
					<p className="text-sm text-slate-500">Carboidratos</p>
					<p className="mt-4 text-3xl font-semibold text-slate-950">220g</p>
					<p className="mt-2 text-sm text-slate-600">Meta diária: 250g</p>
				</div>
				<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
					<p className="text-sm text-slate-500">Proteínas</p>
					<p className="mt-4 text-3xl font-semibold text-slate-950">85g</p>
					<p className="mt-2 text-sm text-slate-600">Meta diária: 90g</p>
				</div>
			</div>
		</div>
	);
}
