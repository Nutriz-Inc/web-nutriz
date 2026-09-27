import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EsqueletoDePaginaProps = {
	rotulo: string;
	children: ReactNode;
	className?: string;
};

export function EsqueletoDePagina({
	rotulo,
	children,
	className,
}: EsqueletoDePaginaProps) {
	return (
		<div
			role="status"
			aria-busy="true"
			aria-live="polite"
			className={cn(
				"esqueleto-surge flex w-full flex-col gap-5 lg:mx-auto lg:gap-6",
				className,
			)}
		>
			<span className="sr-only">{rotulo}</span>
			<div aria-hidden="true" className="contents">
				{children}
			</div>
		</div>
	);
}
