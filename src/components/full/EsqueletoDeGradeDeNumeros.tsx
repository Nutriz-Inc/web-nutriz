import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function EsqueletoDeGradeDeNumeros({
	celulas,
	className,
}: {
	celulas: number;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"grid grid-cols-2 gap-px overflow-hidden rounded-card-sm border border-line bg-line",
				className,
			)}
		>
			{Array.from({ length: celulas }, (_, indice) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: celulas fixas sem identidade
					key={indice}
					className="flex flex-col gap-2.5 bg-surface px-4 py-3.5"
				>
					<Skeleton className="h-6 w-10 rounded-lg" />
					<Skeleton className="h-3 w-24 rounded-full" />
				</div>
			))}
		</div>
	);
}
