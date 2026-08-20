import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StepRowProps = {
	icon: ReactNode;
	iconBg: string;
	title: string;
	description: string;
	/** Sem o fio ligando ao proximo item. */
	isLast?: boolean;
};

/**
 * Uma linha do "como funciona": bolha com icone, fio ligando a proxima e o
 * texto ao lado. Compacto de proposito — esta tela e um ponto de confirmacao,
 * nao uma tela de conteudo.
 */
export function StepRow({
	icon,
	iconBg,
	title,
	description,
	isLast = false,
}: StepRowProps) {
	return (
		<li className="flex gap-4">
			<div className="flex flex-col items-center">
				<span
					className={cn(
						"flex size-10 shrink-0 items-center justify-center rounded-full",
						iconBg,
					)}
					aria-hidden="true"
				>
					{icon}
				</span>

				{!isLast && <span className="w-px flex-1 bg-blue-tint" />}
			</div>

			<div className={cn("min-w-0", isLast ? "pb-0" : "pb-5")}>
				<p className="text-[15px] font-bold text-ink">{title}</p>
				<p className="mt-0.5 text-[14px] leading-[20px] text-ink-2">
					{description}
				</p>
			</div>
		</li>
	);
}
