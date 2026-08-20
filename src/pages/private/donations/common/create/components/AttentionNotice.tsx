import { Info } from "lucide-react";

/**
 * Aviso de que o proximo passo sai do app e vai para o WhatsApp da Lactare.
 * Fica logo acima das acoes para ninguem ser surpreendido pela nova aba.
 */
export function AttentionNotice() {
	return (
		<div className="rounded-card flex gap-3 border border-line bg-blue-tint p-4 sm:gap-4 sm:p-5">
			<span
				aria-hidden="true"
				className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-tint-2 text-blue-deep sm:size-10"
			>
				<Info className="size-5" />
			</span>

			<div className="flex min-w-0 flex-col gap-1">
				<p className="font-display text-[15px] font-bold text-blue-deep sm:text-[16px]">
					Antes de confirmar
				</p>
				<p className="text-[14px] leading-[20px] text-ink-2 sm:text-[15px]">
					Ao confirmar, a doação é registrada no seu histórico e uma nova aba
					abre no WhatsApp da equipe Lactare para dar início à triagem. Se a aba
					não abrir, verifique o bloqueio de pop-ups do navegador.
				</p>
			</div>
		</div>
	);
}
