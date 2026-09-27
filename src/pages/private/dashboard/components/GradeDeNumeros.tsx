import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradeDeNumerosProps = {
	children: ReactNode;
	className?: string;
};

export function GradeDeNumeros({ children, className }: GradeDeNumerosProps) {
	return (
		<div
			className={cn(
				"grid gap-px overflow-hidden rounded-card-sm border border-line bg-line",
				className,
			)}
		>
			{children}
		</div>
	);
}
