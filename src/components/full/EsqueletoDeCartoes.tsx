import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { EsqueletoDeFiltros } from "./EsqueletoDeFiltros";
import { EsqueletoDePagina } from "./EsqueletoDePagina";

type EsqueletoDeCartoesProps = {
	rotulo: string;
	cartoes?: number;
	buscas?: number;
	comMapa?: boolean;
	className?: string;
};

export function EsqueletoDeCartoes({
	rotulo,
	cartoes = 6,
	buscas = 2,
	comMapa = false,
	className,
}: EsqueletoDeCartoesProps) {
	return (
		<EsqueletoDePagina rotulo={rotulo} className={className}>
			<EsqueletoDeFiltros buscas={buscas} />
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				{Array.from({ length: cartoes }, (_, indice) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: cartoes fixos sem identidade
						key={indice}
						className={cn(
							"flex overflow-hidden rounded-card-sm border border-line bg-surface shadow-soft",
							indice >= 2 && "hidden lg:flex",
							indice >= 4 && "lg:hidden xl:flex",
						)}
					>
						<div className="flex min-w-0 flex-1 flex-col gap-5 p-5">
							<div className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-3">
									{comMapa ? null : (
										<Skeleton className="size-11 shrink-0 rounded-full" />
									)}
									<div className="flex flex-col gap-2">
										<Skeleton className="h-4 w-36 rounded-full" />
										{comMapa ? null : (
											<Skeleton className="h-3 w-16 rounded-full" />
										)}
									</div>
								</div>
								<Skeleton className="h-7 w-24 rounded-full" />
							</div>
							<div className="grid grid-cols-3 gap-3">
								{[0, 1, 2].map((coluna) => (
									<div key={coluna} className="flex flex-col gap-2">
										<Skeleton className="h-3 w-14 rounded-full" />
										<Skeleton className="h-3.5 w-20 rounded-full" />
									</div>
								))}
							</div>
							{comMapa ? null : (
								<Skeleton className="h-10 w-full rounded-full" />
							)}
						</div>
						{comMapa ? (
							<Skeleton className="hidden w-[180px] shrink-0 rounded-none sm:block" />
						) : null}
					</div>
				))}
			</div>
		</EsqueletoDePagina>
	);
}
