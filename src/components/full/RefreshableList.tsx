import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RefreshableListProps = {
	updating: boolean;
	children: ReactNode;
	className?: string;
};

export function RefreshableList({
	updating,
	children,
	className,
}: RefreshableListProps) {
	return (
		<div className={cn("relative", className)} aria-busy={updating}>
			<div
				className={cn(
					"transition-opacity duration-200",
					updating && "pointer-events-none opacity-55",
				)}
			>
				{children}
			</div>

			{updating && (
				<div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center">
					<span className="flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-[12px] font-semibold text-ink-2 shadow-soft">
						<LoaderCircle className="size-3.5 animate-spin text-blue-bright" />
						Atualizando…
					</span>
				</div>
			)}
		</div>
	);
}
