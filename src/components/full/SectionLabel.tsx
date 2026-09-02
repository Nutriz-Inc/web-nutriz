import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
	children: ReactNode;
	trailing?: ReactNode;
	className?: string;
};

export function SectionLabel({
	children,
	trailing,
	className,
}: SectionLabelProps) {
	return (
		<div className={cn("flex items-center justify-between gap-3", className)}>
			<span className="font-display text-xs font-bold uppercase tracking-[0.06em] text-ink-2">
				{children}
			</span>
			{trailing}
		</div>
	);
}
