import { Skeleton } from "@/components/ui/skeleton";
import { EsqueletoDeCartao } from "./EsqueletoDeCartao";
import { EsqueletoDePagina } from "./EsqueletoDePagina";

type EsqueletoDeDetalheProps = {
	rotulo: string;
	className?: string;
};

export function EsqueletoDeDetalhe({
	rotulo,
	className,
}: EsqueletoDeDetalheProps) {
	return (
		<EsqueletoDePagina rotulo={rotulo} className={className}>
			<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
				<div className="flex flex-col gap-5 lg:w-[340px] lg:shrink-0">
					<EsqueletoDeCartao campos={2} />
					<div className="flex flex-col gap-4 rounded-card-sm border border-line bg-surface p-5 shadow-soft lg:p-6">
						<Skeleton className="h-4 w-32 rounded-full" />
						{[0, 1, 2, 3].map((passo) => (
							<div key={passo} className="flex items-center gap-3">
								<Skeleton className="size-8 shrink-0 rounded-full" />
								<div className="flex flex-1 flex-col gap-1.5">
									<Skeleton className="h-3.5 w-3/5 rounded-full" />
									<Skeleton className="h-3 w-2/5 rounded-full" />
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex min-w-0 flex-1 flex-col gap-5">
					<div className="flex flex-col gap-2">
						<Skeleton className="h-5 w-48 rounded-full" />
						<Skeleton className="h-3.5 w-80 max-w-full rounded-full" />
					</div>
					<EsqueletoDeCartao campos={4} comIcone />
					<EsqueletoDeCartao campos={2} comIcone className="hidden lg:flex" />
				</div>
			</div>
		</EsqueletoDePagina>
	);
}
