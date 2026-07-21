import { Sparkles } from "lucide-react";

type MoreContentBarProps = {
	onShowAll: () => void;
};

export function MoreContentBar({ onShowAll }: MoreContentBarProps) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Sparkles className="size-4 text-[#0d3b6e]" aria-hidden />
				<h2 className="text-[15px] font-bold text-[#09090b]">Mais conteúdos</h2>
				<span className="hidden text-[13px] text-[#71717a] sm:inline">
					Atualizados toda semana
				</span>
			</div>

			<button
				type="button"
				onClick={onShowAll}
				className="text-[13.5px] font-semibold text-[#0d3b6e] transition-colors duration-150 hover:text-[#0a2e56]"
			>
				Ver todos →
			</button>
		</div>
	);
}
