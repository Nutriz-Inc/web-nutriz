import { AvatarEva } from "@/pages/private/eva/components/avatar-eva";
import "@/pages/private/eva/eva.css";

export function EvaPreview() {
	return (
		<div
			aria-hidden="true"
			className="eva-scope rounded-card w-full max-w-[380px] flex-none border border-line bg-surface p-5 shadow-lift lg:w-[380px]"
		>
			<div className="flex items-center gap-3">
				<AvatarEva size={44} squircle />
				<div className="min-w-0">
					<p className="eva-welcome-name text-[17px]">Assistente EVA</p>
					<p className="mt-0.5 text-[12px] text-ink-3">
						Responde na hora, a qualquer hora
					</p>
				</div>
			</div>

			<div className="mt-5 flex flex-col items-end gap-1">
				<p className="max-w-[84%] rounded-[18px_18px_6px_18px] bg-eva-tint px-3.5 py-2.5 text-[14px] leading-snug text-ink">
					Meu bebê tem 4 meses, ainda posso doar?
				</p>
				<span className="eva-msg-time pr-1.5">21:04</span>
			</div>

			<div className="mt-3 flex items-end gap-2">
				<AvatarEva size={28} />
				<div className="flex min-w-0 flex-col gap-1">
					<p className="rounded-[18px_18px_18px_6px] bg-surface-3 px-3.5 py-2.5 text-[14px] leading-snug text-ink">
						Pode sim! Enquanto você amamenta e tem leite de sobra, sua doação é
						muito bem-vinda.
					</p>
					<span className="eva-msg-time pl-1.5">21:04</span>
				</div>
			</div>

			<div className="mt-3 flex items-end gap-2">
				<AvatarEva size={28} pulse />
				<span className="inline-flex items-center gap-1.5 rounded-[18px_18px_18px_6px] bg-surface-3 px-4 py-3.5">
					<span className="eva-typing-dot" />
					<span className="eva-typing-dot" />
					<span className="eva-typing-dot" />
				</span>
			</div>
		</div>
	);
}
