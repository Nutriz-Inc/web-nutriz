/* eslint-disable react-refresh/only-export-components */

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Tons dos badges do app. Os hex sao exatamente os que ja estavam espalhados
 * pelas telas (status de doacao e de agendamento, etapas, tipo de usuario);
 * aqui viraram fonte unica. Quem precisa so da bolinha — grafico do dashboard,
 * opcao de status da enfermeira — le BADGE_TONES[tone].dot.
 */
export type BadgeTone =
	| "neutral"
	| "info"
	| "brand"
	| "success"
	| "warning"
	| "error"
	| "teal"
	| "pink"
	| "purple"
	| "magenta";

export const BADGE_TONES: Record<
	BadgeTone,
	{ bg: string; text: string; dot: string }
> = {
	neutral: { bg: "bg-surface-3", text: "text-ink-2", dot: "bg-ink-3" },
	info: { bg: "bg-blue-tint", text: "text-blue-bright", dot: "bg-blue-bright" },
	brand: { bg: "bg-blue-tint", text: "text-blue-deep", dot: "bg-blue-deep" },
	success: { bg: "bg-success-tint", text: "text-success", dot: "bg-success" },
	warning: { bg: "bg-warning-tint", text: "text-warning", dot: "bg-warning" },
	error: { bg: "bg-danger-tint", text: "text-danger", dot: "bg-danger" },
	teal: { bg: "bg-teal-tint", text: "text-teal", dot: "bg-teal" },
	pink: { bg: "bg-eva-tint", text: "text-eva-deep", dot: "bg-eva" },
	purple: { bg: "bg-purple-tint", text: "text-purple", dot: "bg-purple" },
	magenta: { bg: "bg-magenta-tint", text: "text-magenta", dot: "bg-magenta" },
};

const badgeVariants = cva(
	"inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full font-semibold",
	{
		variants: {
			size: {
				sm: "px-2.5 py-0.5 text-[11px]",
				md: "px-3 py-1 text-[12px]",
				lg: "px-3 py-1.5 text-[13px]",
			},
			// Rotulo curto em caixa alta (etapas dentro de cards de doacao).
			caps: {
				true: "uppercase tracking-[0.3px]",
				false: "",
			},
			// Chips de categoria (conteudo educativo, artigos) levam borda.
			bordered: {
				true: "border",
				false: "",
			},
		},
		defaultVariants: { size: "md", caps: false, bordered: false },
	},
);

export interface BadgeProps
	extends React.ComponentPropsWithoutRef<"span">,
		VariantProps<typeof badgeVariants> {
	/**
	 * Omita o tom quando as cores vierem de fora (chips de categoria trazem a
	 * cor do proprio artigo via `style`).
	 */
	tone?: BadgeTone;
	dot?: boolean;
}

export function Badge({
	tone,
	dot = false,
	size,
	caps,
	bordered,
	className,
	children,
	...props
}: BadgeProps) {
	const tones = tone ? BADGE_TONES[tone] : null;

	return (
		<span
			className={cn(
				badgeVariants({ size, caps, bordered }),
				tones?.bg,
				tones?.text,
				className,
			)}
			{...props}
		>
			{dot && (
				<span
					aria-hidden="true"
					className={cn(
						"size-2 shrink-0 rounded-full",
						tones?.dot ?? "bg-current",
					)}
				/>
			)}
			{children}
		</span>
	);
}
