import whatsappIcone from "@/assets/images/whatsapp-icon.svg";
import {
	buildLactareWhatsAppLink,
	EnumWhatsAppLinkContext,
} from "@/utils/whatsapp-link";

export function StepHelpCard() {
	return (
		<section className="flex flex-col gap-4 rounded-card bg-blue-tint p-6">
			<div className="flex flex-col gap-1.5">
				<p className="font-display text-destaque font-bold text-blue-deep">
					Precisa de ajuda?
				</p>
				<p className="text-apoio leading-relaxed text-ink-2">
					Fale com a equipe da Nutriz no WhatsApp para tirar dúvidas sobre a sua
					doação.
				</p>
			</div>

			<a
				href={buildLactareWhatsAppLink(EnumWhatsAppLinkContext.DonationHelp)}
				target="_blank"
				rel="noopener noreferrer"
				className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 text-apoio font-bold text-white shadow-soft transition-transform duration-150 ease-out active:scale-[0.98]"
			>
				<img src={whatsappIcone} alt="" aria-hidden="true" className="size-5" />
				Falar no WhatsApp
			</a>
		</section>
	);
}
