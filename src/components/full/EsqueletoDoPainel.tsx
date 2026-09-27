import { Skeleton } from "@/components/ui/skeleton";
import { EsqueletoDeCartaoDoPainel } from "./EsqueletoDeCartaoDoPainel";
import { EsqueletoDeGradeDeNumeros } from "./EsqueletoDeGradeDeNumeros";
import { EsqueletoDePagina } from "./EsqueletoDePagina";

export function EsqueletoDoPainel({ rotulo }: { rotulo: string }) {
	return (
		<EsqueletoDePagina rotulo={rotulo} className="lg:max-w-[1400px]">
			<div className="flex flex-col gap-5 rounded-card-sm border border-line bg-surface p-6 shadow-soft">
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-36 rounded-full" />
					<Skeleton className="h-3 w-48 rounded-full" />
				</div>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8">
					<EsqueletoDeGradeDeNumeros celulas={4} />
					<div className="hidden lg:block">
						<EsqueletoDeGradeDeNumeros celulas={6} className="sm:grid-cols-3" />
					</div>
				</div>
			</div>
			<div className="flex flex-wrap gap-2">
				{["w-24", "w-32", "w-32", "w-24", "w-32"].map((largura, indice) => (
					<Skeleton
						// biome-ignore lint/suspicious/noArrayIndexKey: chips fixos sem identidade
						key={indice}
						className={`h-10 rounded-full ${largura}`}
					/>
				))}
			</div>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<EsqueletoDeCartaoDoPainel />
				<div className="hidden lg:block">
					<EsqueletoDeCartaoDoPainel />
				</div>
			</div>
		</EsqueletoDePagina>
	);
}
