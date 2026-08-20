import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FlowStepCardProps = {
	order: number;
	title: string;
	description: string;
	icon: ReactNode;
	iconClassName: string;
};

/**
 * Cartao de um passo do fluxo imediato ("o que acontece agora"). Mesmo
 * vocabulario dos cards do app: superficie branca, `rounded-card`, borda
 * `line` e o numero da etapa em destaque.
 */
export function FlowStepCard({
	order,
	title,
	description,
	icon,
	iconClassName,
}: FlowStepCardProps) {
	return (
		<article className="rounded-card flex h-full gap-4 border border-line bg-surface p-5 shadow-soft">
			<div className="flex flex-col items-center gap-2">
				<span
					className={cn(
						"flex size-11 shrink-0 items-center justify-center rounded-full",
						iconClassName,
					)}
					aria-hidden="true"
				>
					{icon}
				</span>
				<span className="font-display text-[12px] font-bold text-ink-3 tabular-nums">
					{String(order).padStart(2, "0")}
				</span>
			</div>

			<div className="min-w-0">
				<h3 className="font-display text-[16px] font-bold text-ink">{title}</h3>
				<p className="mt-1.5 text-[14px] leading-[20px] text-ink-2">
					{description}
				</p>
			</div>
		</article>
	);
}
