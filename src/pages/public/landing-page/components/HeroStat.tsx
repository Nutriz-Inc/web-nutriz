import type { LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

type HeroStatProps = {
	Icon: LucideIcon;
	/** Classe de cor do icone, ja pensada para fundo escuro. */
	accent: string;
	/** Rotulo do numero, ja formatado: "4.200+", "12 mil L", "98%". */
	value: string;
	label: string;
	sublabel: string;
	className?: string;
};

/**
 * Uma estatistica da faixa do hero.
 *
 * Antes eram tres cartoes brancos flutuando por cima do hero, cada um com
 * icone em caixa colorida e o numero na cor do tema. Aqui elas vivem DENTRO
 * do hero, sobre vidro, e quem carrega a cor e o icone — o numero fica branco.
 * Com tres numeros grandes e coloridos lado a lado, nenhum se destacava.
 *
 * O numero conta de zero ao entrar na tela; com `prefers-reduced-motion` ja
 * aparece no valor final (hooks/use-count-up.ts).
 */
export function HeroStat({
	Icon,
	accent,
	value,
	label,
	sublabel,
	className,
}: HeroStatProps) {
	const { alvoRef, texto } = useCountUp(value);

	return (
		<div className={cn("flex items-center gap-4 px-5 py-5 sm:px-6", className)}>
			<span
				aria-hidden="true"
				className={cn(
					"flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10",
					accent,
				)}
			>
				<Icon className="size-5" />
			</span>

			<div className="min-w-0">
				<p
					ref={alvoRef as React.Ref<HTMLParagraphElement>}
					className="font-display text-[26px] font-extrabold leading-none tabular-nums text-white sm:text-[30px]"
				>
					{texto}
				</p>
				<p className="mt-1.5 truncate text-[14px] font-semibold text-white">
					{label}
				</p>
				<p className="truncate text-[12px] text-blue-tint-2">{sublabel}</p>
			</div>
		</div>
	);
}
