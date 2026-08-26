import { Info } from "lucide-react";

export function AttentionNotice() {
	return (
		<div className="rounded-card-sm flex gap-3 bg-blue-tint p-4">
			<span
				aria-hidden="true"
				className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-tint-2 text-blue-deep"
			>
				<Info className="size-4" />
			</span>

			<p className="min-w-0 text-[13px] leading-[19px] text-ink-2">
				Ao confirmar, a doação é registrada no seu histórico e o WhatsApp da
				equipe Lactare abre em uma nova aba para começar a triagem.
			</p>
		</div>
	);
}
