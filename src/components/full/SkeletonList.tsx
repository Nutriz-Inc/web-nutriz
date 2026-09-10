import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SkeletonListProps = {
	rows?: number;
	avatar?: boolean;
	className?: string;
	label?: string;
};

export function SkeletonList({
	rows = 3,
	avatar = true,
	className,
	label = "Carregando a lista",
}: SkeletonListProps) {
	return (
		<div
			aria-busy="true"
			aria-live="polite"
			className={cn("flex w-full flex-col gap-3", className)}
		>
			<span className="sr-only">{label}</span>

			{Array.from({ length: rows }, (_, indice) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: linhas fixas sem identidade
					key={indice}
					aria-hidden="true"
					className="flex items-center gap-3 rounded-card-sm border border-line bg-surface p-4"
				>
					{avatar && <Skeleton className="size-10 shrink-0 rounded-full" />}

					<div className="flex min-w-0 flex-1 flex-col gap-2">
						<Skeleton className="h-3.5 w-1/2 rounded-full" />
						<Skeleton className="h-3 w-3/4 rounded-full" />
					</div>

					<Skeleton className="h-6 w-20 shrink-0 rounded-full" />
				</div>
			))}
		</div>
	);
}
