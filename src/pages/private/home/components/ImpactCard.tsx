import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImpactTone = "blue" | "bright" | "eva";

type ImpactCardProps = {
	icon: LucideIcon;
	/** Valor ja formatado. Use "—" quando o dado nao existir. */
	value: string;
	label: string;
	hint: string;
	tone?: ImpactTone;
	/** Card destacado — ocupa duas colunas e usa tipografia maior. */
	featured?: boolean;
};

const TONE_MAP: Record<
	ImpactTone,
	{ chip: string; value: string; blob: string; borda: string }
> = {
	blue: {
		chip: "bg-blue-tint text-blue-deep",
		value: "text-blue-deep",
		blob: "bg-blue-tint-2/45",
		borda: "border-blue-tint-2/70",
	},
	bright: {
		chip: "bg-blue-tint-2/60 text-blue",
		value: "text-blue",
		blob: "bg-blue-tint-2/35",
		borda: "border-blue-tint-2/50",
	},
	eva: {
		chip: "bg-eva-tint text-eva",
		value: "text-eva",
		blob: "bg-eva-tint",
		borda: "border-eva-tint",
	},
};

export function ImpactCard({
	icon: Icon,
	value,
	label,
	hint,
	tone = "blue",
	featured = false,
}: ImpactCardProps) {
	const toneClasses = TONE_MAP[tone];

	return (
		<article
			className={cn(
				"relative isolate flex h-full flex-col overflow-hidden rounded-card-sm border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift sm:p-7",
				toneClasses.borda,
				// Destacado ocupa duas colunas: em telas largas o conteudo deita,
				// senao sobra um vazio na metade direita do cartao.
				featured && "lg:flex-row lg:items-center lg:gap-10 lg:p-8",
			)}
		>
			{/* Mancha do tom no canto: da cor ao card sem competir com o numero. */}
			<span
				aria-hidden="true"
				className={cn(
					"ink-blob -top-10 -right-8 size-32 blur-2xl",
					toneClasses.blob,
				)}
			/>

			<span
				aria-hidden="true"
				className={cn(
					"inline-flex shrink-0 items-center justify-center rounded-full",
					featured ? "size-10 lg:size-16" : "size-10",
					toneClasses.chip,
				)}
			>
				<Icon
					className={featured ? "size-[1.125rem] lg:size-7" : "size-[1.125rem]"}
				/>
			</span>

			{/*
			 * Valor antes do rotulo: e sempre uma linha so, entao os numeros dos
			 * tres cards ficam na mesma altura mesmo quando um rotulo quebra.
			 */}
			<div className={cn("flex flex-col", featured && "lg:mt-0")}>
				<p
					className={cn(
						"mt-5 font-display font-extrabold leading-none tracking-tight tabular-nums",
						featured ? "text-5xl lg:mt-0 lg:text-7xl" : "text-4xl lg:text-5xl",
						toneClasses.value,
					)}
				>
					{value}
				</p>

				<h3
					className={cn(
						"mt-2 font-display font-bold leading-snug text-ink",
						featured ? "text-[0.9375rem] lg:text-lg" : "text-[0.9375rem]",
					)}
				>
					{label}
				</h3>

				<p className="mt-1 text-xs leading-relaxed text-ink-2">{hint}</p>
			</div>
		</article>
	);
}
