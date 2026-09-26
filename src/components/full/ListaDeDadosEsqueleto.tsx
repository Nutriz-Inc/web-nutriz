import { Skeleton } from "@/components/ui/skeleton";

type ListaDeDadosEsqueletoProps = {
	linhas?: number;
	rotulo?: string;
};

export function ListaDeDadosEsqueleto({
	linhas = 6,
	rotulo = "Carregando a lista",
}: ListaDeDadosEsqueletoProps) {
	return (
		<div
			aria-busy="true"
			aria-live="polite"
			className="flex flex-col gap-4 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-5"
		>
			<span className="sr-only">{rotulo}</span>

			<Skeleton aria-hidden="true" className="h-11 w-full rounded-card-sm" />

			<div
				aria-hidden="true"
				className="flex flex-col gap-3 rounded-card-sm border border-line bg-surface p-4 lg:px-5"
			>
				<Skeleton className="h-3 w-28 rounded-full" />
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-9 w-20 rounded-full" />
					<Skeleton className="h-9 w-28 rounded-full" />
					<Skeleton className="h-9 w-24 rounded-full" />
					<Skeleton className="h-9 w-24 rounded-full" />
				</div>
			</div>

			<div
				aria-hidden="true"
				className="overflow-hidden rounded-card-sm border border-line bg-surface"
			>
				<div className="hidden gap-4 border-b border-line bg-surface-2 px-5 py-3 lg:flex">
					<Skeleton className="h-3 w-24 rounded-full" />
					<Skeleton className="ml-auto h-3 w-16 rounded-full" />
				</div>

				<ul className="divide-y divide-line">
					{Array.from({ length: linhas }, (_, indice) => (
						<li
							// biome-ignore lint/suspicious/noArrayIndexKey: linhas fixas sem identidade
							key={indice}
							className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-4 lg:grid-cols-[2fr_1fr_1.2fr_1fr_0.8fr] lg:items-center lg:px-5 lg:py-4"
						>
							<Skeleton className="h-4 w-3/4 rounded-full" />
							<Skeleton className="h-6 w-24 justify-self-end rounded-full lg:justify-self-start" />
							<Skeleton className="h-3.5 w-2/3 rounded-full" />
							<Skeleton className="h-3.5 w-1/2 rounded-full" />
							<Skeleton className="hidden h-3.5 w-12 justify-self-end rounded-full lg:block" />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
