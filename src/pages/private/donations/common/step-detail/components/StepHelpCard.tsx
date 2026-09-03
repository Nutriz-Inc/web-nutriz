import whatsappIcone from "@/assets/images/whatsapp-icon.svg";
import {
	buildLactareWhatsAppLink,
	EnumWhatsAppLinkContext,
} from "@/utils/whatsapp-link";

export function StepHelpCard() {
	return (
		<div className="flex flex-col gap-3 rounded-card-sm border border-line bg-surface px-[18px] py-5 shadow-soft">
			<div className="flex flex-col gap-1">
				<p className="text-[14px] font-bold text-ink">Precisa de ajuda?</p>
				<p className="text-[13px] text-ink-2">
					Fale com a equipe da Nutriz no WhatsApp para tirar dúvidas sobre a sua
					doação.
				</p>
			</div>

			<a
				href={buildLactareWhatsAppLink(EnumWhatsAppLinkContext.DonationHelp)}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-[14px] font-bold text-white shadow-soft transition-transform active:scale-[0.98]"
			>
				<img src={whatsappIcone} alt="" aria-hidden="true" className="size-5" />
				Falar no WhatsApp
			</a>
		</div>
	);
}
