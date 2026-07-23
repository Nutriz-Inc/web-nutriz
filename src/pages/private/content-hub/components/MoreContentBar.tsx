import { Sparkles } from "lucide-react";

export function MoreContentBar() {
	return (
		<div className="flex items-center gap-2">
			<Sparkles className="size-4 text-[#0d3b6e]" aria-hidden />
			<h2 className="text-[15px] font-bold text-[#09090b]">Mais conteúdos</h2>
			<span className="hidden text-[13px] text-[#71717a] sm:inline">
				Atualizados toda semana
			</span>
		</div>
	);
}
