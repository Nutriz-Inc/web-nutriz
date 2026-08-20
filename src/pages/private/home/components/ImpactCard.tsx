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

const TONE_MAP: Record<ImpactTone, { chip: string; value: string }> = {
	blue: { chip: "bg-blue-tint text-blue-deep", value: "text-blue-deep" },
	bright: { chip: "bg-blue-tint-2/60 text-blue", value: "text-blue" },
	eva: { chip: "bg-eva-tint text-eva", value: "text-eva" },
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
				"rounded-card-sm flex h-full flex-col justify-between bg-card p-6 shadow-soft transition-shadow hover:shadow-lift sm:p-7",
				featured && "lg:p-8",
			)}
		>
			<div className="flex items-start justify-between gap-3">
				<h3 className="min-w-0 font-display text-[0.8125rem] font-bold uppercase leading-snug tracking-[0.06em] text-ink-2 sm:text-sm">
					{label}
				</h3>
				<span
					aria-hidden="true"
					className={cn(
						"inline-flex size-10 shrink-0 items-center justify-center rounded-full",
						toneClasses.chip,
					)}
				>
					<Icon className="size-[1.125rem]" />
				</span>
			</div>

			<div className="mt-8">
				<p
					className={cn(
						"font-display font-extrabold leading-none tracking-tight tabular-nums",
						featured ? "text-5xl lg:text-6xl" : "text-4xl lg:text-5xl",
						toneClasses.value,
					)}
				>
					{value}
				</p>
				<p className="mt-3 text-xs leading-relaxed text-ink-2">{hint}</p>
			</div>
		</article>
	);
}
