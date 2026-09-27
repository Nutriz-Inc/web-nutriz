import { Sparkles } from "lucide-react";

export function MoreContentBar() {
	return (
		<div className="flex items-center gap-2">
			<Sparkles className="size-4 text-blue-deep" aria-hidden />
			<h2 className="text-corpo font-bold text-ink">Mais conteúdos</h2>
			<span className="hidden text-apoio text-ink-2 sm:inline">
				Atualizados toda semana
			</span>
		</div>
	);
}
