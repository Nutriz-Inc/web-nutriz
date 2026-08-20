import { Sparkles } from "lucide-react";

export function MoreContentBar() {
	return (
		<div className="flex items-center gap-2">
			<Sparkles className="size-4 text-blue-deep" aria-hidden />
			<h2 className="text-[15px] font-bold text-ink">Mais conteúdos</h2>
			<span className="hidden text-[13px] text-ink-2 sm:inline">
				Atualizados toda semana
			</span>
		</div>
	);
}
