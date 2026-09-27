import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type EsqueletoDeCartaoProps = {
	campos?: number;
	comIcone?: boolean;
	className?: string;
};

const LARGURAS = ["w-3/5", "w-2/5", "w-4/5", "w-1/2", "w-2/3"];

export function EsqueletoDeCartao({
	campos = 3,
	comIcone = false,
	className,
}: EsqueletoDeCartaoProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-5 rounded-card-sm border border-line bg-surface p-5 shadow-soft lg:p-6",
				className,
			)}
		>
			<div className="flex items-center gap-3">
				{comIcone ? (
					<Skeleton className="size-11 shrink-0 rounded-2xl" />
				) : null}
				<div className="flex flex-1 flex-col gap-2">
					<Skeleton className="h-4 w-40 rounded-full" />
					<Skeleton className="h-3 w-56 max-w-full rounded-full" />
				</div>
			</div>
			{Array.from({ length: campos }, (_, indice) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: campos fixos sem identidade
					key={indice}
					className="flex flex-col gap-2"
				>
					<Skeleton className="h-3 w-24 rounded-full" />
					<Skeleton
						className={cn(
							"h-11 rounded-card-sm",
							indice === 0 ? "w-full" : LARGURAS[indice % LARGURAS.length],
						)}
					/>
				</div>
			))}
		</div>
	);
}
