import { Skeleton } from "@/components/ui/skeleton";

type EsqueletoDeFiltrosProps = {
	buscas?: number;
	comBotoes?: boolean;
};

export function EsqueletoDeFiltros({
	buscas = 2,
	comBotoes = true,
}: EsqueletoDeFiltrosProps) {
	return (
		<>
			<div className="flex flex-wrap items-center gap-2 rounded-card-sm border border-line bg-surface p-4 lg:px-5">
				<Skeleton className="mr-2 h-3 w-24 rounded-full" />
				<Skeleton className="h-9 w-16 rounded-full" />
				<Skeleton className="h-9 w-24 rounded-full" />
				<Skeleton className="h-9 w-24 rounded-full" />
				<Skeleton className="hidden h-9 w-20 rounded-full sm:block" />
				<Skeleton className="hidden h-10 w-48 rounded-full lg:ml-4 lg:block" />
			</div>
			<div className="flex flex-col gap-2.5 lg:flex-row">
				{Array.from({ length: buscas }, (_, indice) => (
					<Skeleton
						// biome-ignore lint/suspicious/noArrayIndexKey: blocos fixos sem identidade
						key={indice}
						className="h-[43px] w-full rounded-card-sm lg:flex-1"
					/>
				))}
				{comBotoes ? (
					<div className="grid grid-cols-2 gap-2.5 lg:flex">
						<Skeleton className="h-[43px] rounded-full lg:w-36" />
						<Skeleton className="h-[43px] rounded-full lg:w-36" />
					</div>
				) : null}
			</div>
		</>
	);
}
