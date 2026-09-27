import { Skeleton } from "@/components/ui/skeleton";

const LARGURAS = ["w-4/5", "w-3/5", "w-11/12", "w-2/3", "w-3/4"];

export function EsqueletoDosPontos() {
	return (
		<div
			role="status"
			aria-busy="true"
			aria-live="polite"
			className="esqueleto-surge flex flex-col gap-3 px-4 lg:px-5"
		>
			<span className="sr-only">Carregando os pontos de coleta</span>
			{LARGURAS.map((largura, indice) => (
				<div
					key={largura}
					aria-hidden="true"
					className="flex items-start gap-3 rounded-card-sm border border-line bg-surface p-4"
				>
					<Skeleton className="size-9 shrink-0 rounded-full" />
					<div className="flex min-w-0 flex-1 flex-col gap-2">
						<div className="flex items-start justify-between gap-3">
							<Skeleton className={`h-3.5 rounded-full ${largura}`} />
							<Skeleton className="h-3 w-10 shrink-0 rounded-full" />
						</div>
						{indice % 2 === 0 ? (
							<Skeleton className="h-3.5 w-1/2 rounded-full" />
						) : null}
						<Skeleton className="h-3 w-2/5 rounded-full" />
						<Skeleton className="mt-0.5 h-5 w-24 rounded-full" />
					</div>
				</div>
			))}
		</div>
	);
}
