import { EsqueletoDePagina } from "@/components/full/EsqueletoDePagina";
import { Skeleton } from "@/components/ui/skeleton";

const BARRAS = ["h-2", "h-2", "h-full", "h-3/4", "h-full", "h-1/2"];

export function EsqueletoDasDoacoes() {
	return (
		<EsqueletoDePagina
			rotulo="Carregando as suas doações"
			className="gap-6 lg:gap-8"
		>
			<div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-6">
				<div className="esqueleto-no-azul flex flex-col justify-between gap-7 rounded-card gradient-blue p-6 shadow-lift sm:p-8 lg:p-10">
					<div className="flex items-center justify-between">
						<Skeleton className="h-7 w-32 rounded-full" />
						<Skeleton className="h-4 w-20 rounded-full" />
					</div>
					<div className="flex flex-col gap-3">
						<Skeleton className="h-3 w-24 rounded-full" />
						<Skeleton className="h-9 w-4/5 rounded-2xl" />
						<Skeleton className="h-4 w-3/5 rounded-full" />
					</div>
					<div className="grid grid-cols-4 gap-2">
						{[0, 1, 2, 3].map((etapa) => (
							<Skeleton key={etapa} className="h-1.5 rounded-full" />
						))}
					</div>
					<div className="flex items-center justify-between gap-3">
						<Skeleton className="h-4 w-48 rounded-full" />
						<Skeleton className="h-10 w-40 rounded-full" />
					</div>
				</div>

				<div className="flex flex-col gap-6 rounded-card border border-line bg-surface p-6 shadow-soft sm:p-8">
					<div className="flex flex-col gap-2">
						<Skeleton className="h-3 w-24 rounded-full" />
						<Skeleton className="h-9 w-32 rounded-2xl" />
						<Skeleton className="h-3.5 w-44 rounded-full" />
					</div>
					<Skeleton className="h-24 rounded-2xl" />
					<div className="grid h-20 grid-cols-6 items-end gap-2">
						{BARRAS.map((altura, indice) => (
							<Skeleton
								// biome-ignore lint/suspicious/noArrayIndexKey: barras fixas sem identidade
								key={indice}
								className={`w-full rounded-md ${altura}`}
							/>
						))}
					</div>
					<div className="grid grid-cols-2 gap-4 border-t border-line pt-5">
						<Skeleton className="h-9 w-20 rounded-lg" />
						<Skeleton className="h-9 w-20 rounded-lg" />
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<Skeleton className="h-5 w-28 rounded-full" />
				<div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface shadow-soft">
					{[0, 1, 2].map((linha) => (
						<div
							key={linha}
							className="flex items-center gap-4 px-5 py-4 sm:px-6"
						>
							<Skeleton className="size-12 shrink-0 rounded-xl" />
							<div className="flex flex-1 flex-col gap-2">
								<Skeleton className="h-4 w-28 rounded-full" />
								<Skeleton className="h-3 w-56 max-w-full rounded-full" />
							</div>
							<Skeleton className="h-3.5 w-20 rounded-full" />
						</div>
					))}
				</div>
			</div>
		</EsqueletoDePagina>
	);
}
