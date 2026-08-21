import { cn } from "@/lib/utils";

/**
 * Tons possiveis do rotulo. Antes cada secao passava um hex solto por
 * `style`; agora sao tokens, e o `tracking` segue o do design system
 * (`0.06em` — o `0.14em` anterior era o que dava aparencia de template).
 */
const TONS = {
	teal: "text-teal",
	blue: "text-blue-bright",
	mint: "text-mint",
	eva: "text-eva",
} as const;

export type SectionLabelTone = keyof typeof TONS;

type SectionLabelProps = {
	children: string;
	tone?: SectionLabelTone;
	className?: string;
};

/** Rotulo em caixa alta acima do titulo de secao. Ver docs/design-system.md. */
export function SectionLabel({
	children,
	tone = "teal",
	className,
}: SectionLabelProps) {
	return (
		<span
			className={cn(
				"font-display text-[12px] font-bold uppercase tracking-[0.06em]",
				TONS[tone],
				className,
			)}
		>
			{children}
		</span>
	);
}
