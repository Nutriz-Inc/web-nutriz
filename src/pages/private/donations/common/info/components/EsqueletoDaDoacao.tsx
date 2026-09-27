import { EsqueletoDePagina } from "@/components/full/EsqueletoDePagina";
import { Skeleton } from "@/components/ui/skeleton";

export function EsqueletoDaDoacao() {
	return (
		<EsqueletoDePagina rotulo="Carregando a doação" className="pt-4">
			<div className="flex flex-col gap-4 rounded-card-sm border border-line bg-surface p-4 lg:gap-6 lg:rounded-card lg:p-8">
				<div className="flex items-center justify-between">
					<Skeleton className="h-3.5 w-36 rounded-full" />
					<Skeleton className="h-5 w-16 rounded-full" />
				</div>
				<div className="h-px bg-blue-tint" />
				<div className="flex flex-col">
					{[0, 1, 2, 3].map((passo) => (
						<div key={passo} className="flex gap-3.5 lg:gap-4">
							<div className="flex flex-col items-center">
								<Skeleton className="size-8 shrink-0 rounded-full" />
								{passo < 3 ? (
									<span className="my-1.5 w-0 flex-1 border-l-2 border-dashed border-blue-tint-2" />
								) : null}
							</div>
							<div className="mb-4 flex flex-1 flex-col gap-2.5 rounded-xl bg-surface-2 p-3.5 lg:rounded-2xl lg:p-5">
								<div className="flex items-center gap-2">
									<Skeleton className="size-4 rounded" />
									<Skeleton className="h-4 w-40 rounded-full" />
									<Skeleton className="h-4 w-20 rounded-full" />
								</div>
								<Skeleton className="h-3 w-3/5 rounded-full" />
							</div>
						</div>
					))}
				</div>
			</div>
		</EsqueletoDePagina>
	);
}
