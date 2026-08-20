import type { ReactNode } from "react";

import { Reveal } from "@/components/full/Reveal";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
	/** SVG importado de @/assets/illustrations. Decorativo: nao e lido. */
	illustration: string;
	title: string;
	description?: string;
	/** Botao ou link de saida, quando a tela tem uma acao obvia. */
	action?: ReactNode;
	/** `sm` para dentro de cards estreitos (aba, coluna lateral). */
	size?: "sm" | "md";
	className?: string;
};

const ALTURA = {
	sm: "h-24 sm:h-28",
	md: "h-32 sm:h-40",
} as const;

/**
 * Estado vazio do app: ilustracao, titulo, texto e acao opcional, sempre na
 * mesma proporcao e espacamento. A ilustracao e apoio - nunca maior que o
 * texto - e entra com o mesmo reveal do resto do sistema, que ja respeita
 * `prefers-reduced-motion`. Ver docs/design-system.md.
 */
export function EmptyState({
	illustration,
	title,
	description,
	action,
	size = "md",
	className,
}: EmptyStateProps) {
	return (
		<Reveal
			className={cn(
				"flex flex-col items-center gap-3 px-6 py-8 text-center",
				className,
			)}
		>
			<img
				src={illustration}
				alt=""
				aria-hidden="true"
				loading="lazy"
				width={320}
				height={200}
				className={cn("w-auto max-w-full select-none", ALTURA[size])}
			/>

			<div className="flex flex-col gap-1">
				<p className="text-[15px] font-semibold text-ink">{title}</p>
				{description && (
					<p className="max-w-[38ch] text-[13px] text-ink-2">{description}</p>
				)}
			</div>

			{action && <div className="mt-1">{action}</div>}
		</Reveal>
	);
}
