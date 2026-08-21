import type { ReactNode, Ref } from "react";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

type MetricCardProps = {
	iconBg: string;
	icon: ReactNode;
	/** Rotulo do numero, ja formatado: "4.200+", "12 mil L", "98%". */
	value: string;
	valueColor: string;
	label: string;
	sublabel: string;
	className?: string;
};

/**
 * Card de estatistica do sistema. Morava em `pages/private/home/components`,
 * mas so a landing o usava — passou para os compartilhados, que e onde vive
 * componente usado por mais de uma tela.
 *
 * O numero conta de zero ao entrar na tela; com `prefers-reduced-motion` ele
 * ja aparece no valor final. Ver hooks/use-count-up.ts.
 */
export function MetricCard({
	iconBg,
	icon,
	value,
	valueColor,
	label,
	sublabel,
	className,
}: MetricCardProps) {
	const { alvoRef, texto } = useCountUp(value);

	return (
		<div
			className={cn(
				"rounded-card-sm flex w-full flex-col items-start gap-2 border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-lift lg:flex-1 lg:gap-3.5 lg:p-7",
				className,
			)}
		>
			<span
				className={cn(
					"rounded-card-sm flex size-14 shrink-0 items-center justify-center",
					iconBg,
				)}
				aria-hidden="true"
			>
				{icon}
			</span>

			<p
				ref={alvoRef as Ref<HTMLParagraphElement>}
				className={cn(
					"font-display text-[40px] font-extrabold leading-none tabular-nums lg:text-[46px]",
					valueColor,
				)}
			>
				{texto}
			</p>

			<div className="flex flex-col gap-1">
				<p className="text-[18px] font-semibold text-ink">{label}</p>
				<p className="text-[13px] text-ink-2">{sublabel}</p>
			</div>
		</div>
	);
}
