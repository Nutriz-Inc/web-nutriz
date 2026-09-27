import { Skeleton } from "@/components/ui/skeleton";

export function EsqueletoDeCartaoDoPainel() {
	return (
		<div className="flex flex-col gap-6 rounded-card-sm border border-line bg-surface p-6 shadow-soft">
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-36 rounded-full" />
				<Skeleton className="h-3 w-60 max-w-full rounded-full" />
			</div>
			<div className="flex items-center gap-6">
				<Skeleton className="size-28 shrink-0 rounded-full" />
				<div className="grid flex-1 grid-cols-2 gap-4">
					{[0, 1, 2, 3].map((item) => (
						<div key={item} className="flex flex-col gap-2">
							<Skeleton className="h-3 w-16 rounded-full" />
							<Skeleton className="h-5 w-12 rounded-lg" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
