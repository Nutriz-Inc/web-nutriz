import { cn } from "@/lib/utils";

type LiveBadgeProps = {
	className?: string;
};

/**
 * Selo de "ao vivo".
 *
 * Existe para a nutriz saber que nao precisa recarregar nada: a tela se
 * atualiza sozinha quando o admin mexe na doacao do outro lado. Sem ele, a
 * atualizacao acontece mas ninguem repara que ela e automatica.
 */
export function LiveBadge({ className }: LiveBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success-tint px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-success",
				className,
			)}
		>
			<span className="relative flex size-1.5" aria-hidden="true">
				<span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-70 motion-safe:animate-ping" />
				<span className="relative inline-flex size-1.5 rounded-full bg-success" />
			</span>
			Ao vivo
		</span>
	);
}
