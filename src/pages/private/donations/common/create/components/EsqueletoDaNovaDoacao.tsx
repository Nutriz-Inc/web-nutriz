import { EsqueletoDePagina } from "@/components/full/EsqueletoDePagina";
import { Skeleton } from "@/components/ui/skeleton";

export function EsqueletoDaNovaDoacao() {
	return (
		<EsqueletoDePagina
			rotulo="Preparando a nova doação"
			className="lg:max-w-[1000px]"
		>
			<div className="overflow-hidden rounded-card border border-line bg-surface shadow-soft lg:grid lg:grid-cols-[minmax(0,42%)_1fr]">
				<div className="gradient-milk flex flex-col items-center gap-4 border-b border-line px-6 py-8 lg:border-r lg:border-b-0 lg:px-8 lg:py-12">
					<Skeleton className="h-32 w-20 rounded-3xl sm:h-40 lg:h-56 lg:w-28" />
					<Skeleton className="mt-2 h-7 w-56 max-w-full rounded-full" />
					<Skeleton className="h-4 w-64 max-w-full rounded-full" />
				</div>
				<div className="flex flex-col gap-5 px-5 py-6 sm:px-7 lg:px-9 lg:py-10">
					<Skeleton className="h-3 w-28 rounded-full" />
					{[0, 1, 2, 3].map((passo) => (
						<div key={passo} className="flex items-start gap-3">
							<Skeleton className="size-9 shrink-0 rounded-full" />
							<div className="flex flex-1 flex-col gap-2">
								<Skeleton className="h-4 w-40 rounded-full" />
								<Skeleton className="h-3 w-3/5 rounded-full" />
							</div>
						</div>
					))}
					<Skeleton className="mt-2 h-12 w-full rounded-full" />
				</div>
			</div>
		</EsqueletoDePagina>
	);
}
