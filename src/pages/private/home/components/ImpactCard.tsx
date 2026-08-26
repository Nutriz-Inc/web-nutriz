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

/*
 * O degrade termina em `--surface`, e nao no branco literal: `to-white` nao
 * acompanha tema nenhum, e no escuro os tres cartoes viravam lajotas brancas
 * com um brilho diagonal atravessando. Com o token eles ficam escuros e o
 * tint da ponta e que da a cor.
 */
const TONE_MAP: Record<
	ImpactTone,
	{
		fundo: string;
		borda: string;
		rotulo: string;
		valor: string;
		marca: string;
		chip: string;
	}
> = {
	blue: {
		fundo: "bg-gradient-to-br from-blue-tint via-surface to-surface",
		borda: "border-blue-tint-2/70",
		rotulo: "text-blue-bright",
		valor: "text-blue-deep",
		marca: "text-blue-tint-2/60",
		chip: "bg-blue-tint text-blue-deep",
	},
	bright: {
		fundo: "bg-gradient-to-br from-blue-tint-2/25 via-surface to-surface",
		borda: "border-blue-tint-2/60",
		rotulo: "text-blue",
		valor: "text-blue",
		marca: "text-blue-tint-2/60",
		chip: "bg-blue-tint-2/60 text-blue",
	},
	eva: {
		fundo: "bg-gradient-to-br from-eva-tint via-surface to-surface",
		borda: "border-eva-tint",
		rotulo: "text-eva-deep",
		valor: "text-eva-deep",
		marca: "text-eva-tint",
		chip: "bg-eva-tint text-eva-deep",
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
	const t = TONE_MAP[tone];

	return (
		<article
			className={cn(
				"relative isolate flex h-full flex-col overflow-hidden rounded-card-sm border p-6 shadow-soft transition-shadow hover:shadow-lift sm:p-7",
				t.fundo,
				t.borda,
				featured && "lg:p-8",
			)}
		>
			{/*
			 * Icone grande e apagado no canto: da identidade ao cartao sem
			 * disputar espaco com o numero, que e o dado que importa.
			 */}
			<Icon
				aria-hidden="true"
				className={cn(
					"pointer-events-none absolute -right-3 -bottom-3 -z-10",
					featured ? "size-32 lg:size-40" : "size-28",
					t.marca,
				)}
				strokeWidth={1.25}
			/>

			<div className="flex items-center gap-2.5">
				<span
					aria-hidden="true"
					className={cn(
						"inline-flex size-8 shrink-0 items-center justify-center rounded-full",
						t.chip,
					)}
				>
					<Icon className="size-4" />
				</span>

				<h3
					className={cn(
						"font-display text-[0.6875rem] font-bold uppercase tracking-[0.08em]",
						t.rotulo,
					)}
				>
					{label}
				</h3>
			</div>

			<p
				className={cn(
					"mt-auto pt-8 font-display font-extrabold leading-none tracking-tight tabular-nums",
					featured ? "text-6xl lg:text-7xl" : "text-5xl",
					t.valor,
				)}
			>
				{value}
			</p>

			<p className="mt-2 text-xs leading-relaxed text-ink-2">{hint}</p>
		</article>
	);
}
