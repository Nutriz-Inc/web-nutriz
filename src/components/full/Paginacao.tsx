import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginacaoProps = {
	pagina: number;
	totalDePaginas: number;
	aoMudar: (pagina: number) => void;
	className?: string;
};

export function Paginacao({
	pagina,
	totalDePaginas,
	aoMudar,
	className,
}: PaginacaoProps) {
	if (totalDePaginas <= 1) return null;

	return (
		<nav
			aria-label="Paginação"
			className={cn(
				"flex items-center justify-center gap-3 lg:justify-end",
				className,
			)}
		>
			<button
				type="button"
				onClick={() => aoMudar(Math.max(1, pagina - 1))}
				disabled={pagina === 1}
				aria-label="Página anterior"
				className="flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition-[background-color,transform] duration-150 hover:bg-surface-3 active:scale-[0.97] disabled:opacity-40"
			>
				<ChevronLeft className="size-4" />
			</button>
			<span className="text-apoio font-semibold text-ink tabular-nums">
				Página {pagina} de {totalDePaginas}
			</span>
			<button
				type="button"
				onClick={() => aoMudar(Math.min(totalDePaginas, pagina + 1))}
				disabled={pagina === totalDePaginas}
				aria-label="Próxima página"
				className="flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition-[background-color,transform] duration-150 hover:bg-surface-3 active:scale-[0.97] disabled:opacity-40"
			>
				<ChevronRight className="size-4" />
			</button>
		</nav>
	);
}
