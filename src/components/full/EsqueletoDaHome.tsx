import { AppHeader } from "@/components/layout/AppHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { EsqueletoDePagina } from "./EsqueletoDePagina";

export function EsqueletoDaHome() {
	return (
		<div className="flex min-h-dvh flex-col bg-canvas font-body">
			<AppHeader />
			<div className="mx-auto w-full max-w-[1400px] px-4 pt-4 pb-16 sm:px-6 sm:pt-6 lg:px-10">
				<EsqueletoDePagina rotulo="Carregando o seu início">
					<div className="flex flex-col gap-4 py-4 lg:py-8">
						<Skeleton className="h-3.5 w-28 rounded-full" />
						<Skeleton className="h-9 w-3/4 max-w-xl rounded-2xl lg:h-12" />
						<Skeleton className="h-4 w-2/3 max-w-lg rounded-full" />
						<Skeleton className="mt-2 h-12 w-44 rounded-full" />
					</div>
					<div className="flex flex-col gap-4">
						<Skeleton className="h-3 w-16 rounded-full" />
						<Skeleton className="h-6 w-60 rounded-full" />
						<div className="flex flex-col gap-5 rounded-card-sm border border-line bg-surface p-6 shadow-soft lg:p-8">
							<div className="flex items-center gap-4">
								<Skeleton className="size-12 shrink-0 rounded-full" />
								<div className="flex flex-1 flex-col gap-2">
									<Skeleton className="h-4 w-48 rounded-full" />
									<Skeleton className="h-3 w-32 rounded-full" />
								</div>
							</div>
							<Skeleton className="h-2 w-full rounded-full" />
						</div>
					</div>
					<div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
						<Skeleton className="h-36 rounded-card-sm lg:col-span-2" />
						<Skeleton className="h-36 rounded-card-sm" />
						<Skeleton className="hidden h-36 rounded-card-sm sm:block" />
					</div>
				</EsqueletoDePagina>
			</div>
		</div>
	);
}
