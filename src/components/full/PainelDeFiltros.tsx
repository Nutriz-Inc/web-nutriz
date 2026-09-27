import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PainelDeFiltrosProps = {
	children: ReactNode;
	className?: string;
};

export function PainelDeFiltros({ children, className }: PainelDeFiltrosProps) {
	return (
		<div
			className={cn(
				"flex flex-wrap items-center gap-x-5 gap-y-3 rounded-card-sm border border-line bg-surface px-3.5 py-3 lg:px-4",
				className,
			)}
		>
			{children}
		</div>
	);
}
