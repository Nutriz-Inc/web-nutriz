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
				"flex flex-col gap-4 rounded-card-sm border border-line bg-surface p-4 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-10 lg:gap-y-4 lg:px-5",
				className,
			)}
		>
			{children}
		</div>
	);
}
