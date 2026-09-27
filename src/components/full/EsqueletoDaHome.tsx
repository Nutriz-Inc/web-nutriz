import { AppHeader } from "@/components/layout/AppHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { EsqueletoDePagina } from "./EsqueletoDePagina";

export function EsqueletoDaHome() {
	return (
		<div className="flex min-h-dvh flex-col bg-canvas font-body">
			<AppHeader />
			<div className="mx-auto w-full max-w-[1400px] px-4 pt-4 pb-16 sm:px-6 sm:pt-6 lg:px-10">
				<EsqueletoDePagina rotulo="Carregando o seu início">
					<div className="esqueleto-no-azul flex flex-col gap-8 rounded-card gradient-blue p-6 shadow-lift sm:p-9 lg:flex-row lg:items-center lg:gap-12 lg:p-11">
						<div className="flex flex-1 flex-col gap-4">
							<Skeleton className="h-3 w-32 rounded-full" />
							<Skeleton className="h-9 w-3/5 rounded-2xl lg:h-11" />
							<Skeleton className="h-9 w-4/5 rounded-2xl lg:h-11" />
							<div className="mt-3 flex gap-3">
								<Skeleton className="h-11 w-36 rounded-full" />
								<Skeleton className="h-11 w-40 rounded-full" />
							</div>
							<div className="mt-6 flex gap-8 border-t border-white/15 pt-5">
								<div className="flex flex-col gap-2">
									<Skeleton className="h-3 w-24 rounded-full" />
									<Skeleton className="h-4 w-20 rounded-full" />
								</div>
								<div className="flex flex-col gap-2">
									<Skeleton className="h-3 w-20 rounded-full" />
									<Skeleton className="h-4 w-12 rounded-full" />
								</div>
							</div>
						</div>
						<div className="esqueleto-padrao flex w-full flex-col gap-4 rounded-card-sm bg-surface p-6 lg:w-80">
							<div className="flex items-center justify-between">
								<Skeleton className="h-3 w-20 rounded-full" />
								<Skeleton className="h-5 w-20 rounded-full" />
							</div>
							<Skeleton className="h-5 w-40 rounded-full" />
							<Skeleton className="h-2 w-full rounded-full" />
							<Skeleton className="h-10 w-28 rounded-full" />
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<Skeleton className="h-3 w-16 rounded-full" />
						<Skeleton className="h-6 w-56 rounded-full" />
						<div className="grid grid-cols-1 gap-5 rounded-card-sm border border-line bg-surface p-6 shadow-soft sm:p-8 lg:grid-cols-4 lg:p-10">
							{[0, 1, 2, 3].map((passo) => (
								<div
									key={passo}
									className="flex items-center gap-4 lg:flex-col lg:gap-3"
								>
									<Skeleton className="size-10 shrink-0 rounded-full" />
									<div className="flex flex-col gap-2 lg:items-center">
										<Skeleton className="h-4 w-32 rounded-full" />
										<Skeleton className="h-4 w-20 rounded-full" />
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
						<Skeleton className="h-44 rounded-card-sm lg:col-span-2" />
						<Skeleton className="h-44 rounded-card-sm" />
						<Skeleton className="hidden h-44 rounded-card-sm sm:block" />
					</div>
				</EsqueletoDePagina>
			</div>
		</div>
	);
}
