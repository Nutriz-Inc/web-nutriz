import { Skeleton } from "@/components/ui/skeleton";
import { EsqueletoDeCartao } from "./EsqueletoDeCartao";
import { EsqueletoDePagina } from "./EsqueletoDePagina";

type EsqueletoDePerfilProps = {
	rotulo: string;
	className?: string;
};

export function EsqueletoDePerfil({
	rotulo,
	className,
}: EsqueletoDePerfilProps) {
	return (
		<EsqueletoDePagina rotulo={rotulo} className={className}>
			<div className="flex items-center gap-4 rounded-card-sm border border-line bg-surface p-5 shadow-soft lg:p-6">
				<Skeleton className="size-16 shrink-0 rounded-full" />
				<div className="flex min-w-0 flex-1 flex-col gap-2.5">
					<div className="flex items-center gap-3">
						<Skeleton className="h-5 w-52 max-w-full rounded-full" />
						<Skeleton className="hidden h-6 w-24 shrink-0 rounded-full sm:block" />
					</div>
					<Skeleton className="h-3.5 w-40 max-w-full rounded-full" />
				</div>
			</div>
			<div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
				<EsqueletoDeCartao campos={4} />
				<EsqueletoDeCartao campos={2} className="hidden lg:flex" />
			</div>
		</EsqueletoDePagina>
	);
}
