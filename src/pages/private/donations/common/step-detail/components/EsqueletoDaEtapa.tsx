import { EsqueletoDePagina } from "@/components/full/EsqueletoDePagina";
import { Skeleton } from "@/components/ui/skeleton";

export function EsqueletoDaEtapa() {
	return (
		<EsqueletoDePagina
			rotulo="Carregando a etapa"
			className="lg:max-w-[1200px]"
		>
			<div className="flex flex-col gap-6 rounded-card border border-line bg-surface p-6 shadow-soft sm:p-8">
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-4">
						<Skeleton className="size-14 rounded-2xl" />
						<div className="flex flex-col gap-2">
							<Skeleton className="h-3 w-24 rounded-full" />
							<Skeleton className="h-6 w-24 rounded-full" />
						</div>
					</div>
					<Skeleton className="h-10 w-36 rounded-full" />
				</div>
				<div className="flex flex-col gap-3">
					<Skeleton className="h-9 w-3/5 max-w-md rounded-2xl" />
					<Skeleton className="h-4 w-2/5 max-w-sm rounded-full" />
				</div>
				<div className="grid max-w-md grid-cols-4 gap-1.5">
					{[0, 1, 2, 3].map((etapa) => (
						<Skeleton key={etapa} className="h-1.5 rounded-full" />
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-6">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-5 rounded-card border border-line bg-surface p-6 shadow-soft sm:p-7">
						<Skeleton className="h-5 w-44 rounded-full" />
						{[0, 1].map((linha) => (
							<div key={linha} className="flex items-start gap-4">
								<Skeleton className="size-11 shrink-0 rounded-2xl" />
								<div className="flex flex-1 flex-col gap-2 pt-0.5">
									<Skeleton className="h-3 w-24 rounded-full" />
									<Skeleton className="h-4 w-3/5 rounded-full" />
								</div>
							</div>
						))}
					</div>
					<div className="flex flex-col gap-3 border-l-2 border-blue-tint-2 py-1 pl-5">
						<Skeleton className="h-3 w-28 rounded-full" />
						<Skeleton className="h-4 w-full rounded-full" />
						<Skeleton className="h-4 w-4/5 rounded-full" />
					</div>
				</div>
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6 shadow-soft">
						<Skeleton className="h-3 w-32 rounded-full" />
						<div className="flex items-center gap-4">
							<Skeleton className="size-12 rounded-full" />
							<div className="flex flex-col gap-2">
								<Skeleton className="h-4 w-36 rounded-full" />
								<Skeleton className="h-3 w-28 rounded-full" />
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-4 rounded-card bg-blue-tint p-6">
						<Skeleton className="h-5 w-36 rounded-full" />
						<Skeleton className="h-3.5 w-full rounded-full" />
						<Skeleton className="h-12 w-full rounded-full" />
					</div>
				</div>
			</div>
		</EsqueletoDePagina>
	);
}
