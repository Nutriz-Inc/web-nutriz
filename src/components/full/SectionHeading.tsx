import { cn } from "@/lib/utils";

type SectionHeadingProps = {
	/** Rotulo curto em caixa alta acima do titulo. */
	label: string;
	title: string;
	/** Cor do rotulo. `blue` para secoes de dados, `eva` para rede de apoio. */
	tone?: "blue" | "eva";
	/** Nivel semantico do titulo — respeite a hierarquia da pagina. */
	as?: "h2" | "h3";
	/** Acao alinhada a direita (ex.: "Ver mais"). */
	actionSlot?: React.ReactNode;
	className?: string;
	id?: string;
};

const LABEL_TONE = {
	blue: "text-blue-bright",
	eva: "text-eva",
} as const;

/**
 * Cabecalho de secao do design system Nutriz: rotulo em caixa alta + titulo
 * display. Ver docs/design-system.md.
 */
export function SectionHeading({
	label,
	title,
	tone = "blue",
	as: Heading = "h2",
	actionSlot,
	className,
	id,
}: SectionHeadingProps) {
	return (
		<div
			className={cn(
				"flex flex-wrap items-end justify-between gap-x-4 gap-y-2",
				className,
			)}
		>
			<div className="min-w-0">
				<p
					className={cn(
						"font-display text-[0.7rem] font-bold uppercase tracking-[0.22em]",
						LABEL_TONE[tone],
					)}
				>
					{label}
				</p>
				<Heading
					id={id}
					className="mt-2 font-display text-2xl font-extrabold tracking-tight text-blue-deep sm:text-3xl"
				>
					{title}
				</Heading>
			</div>
			{actionSlot}
		</div>
	);
}
