import { env } from "@/config/env";

export enum EnumWhatsAppLinkContext {
	NewDonation = "new-donation",
	RecurrentDonation = "recurrent-donation",
	NewDonor = "new-donor",
	DonationHelp = "donation-help",
}

export function buildLactareWhatsAppLink(context: EnumWhatsAppLinkContext) {
	let message: string;

	switch (context) {
		case EnumWhatsAppLinkContext.NewDonation:
			message = encodeURIComponent(
				"Olá! Gostaria de iniciar uma nova doação de leite materno.",
			);
			break;
		case EnumWhatsAppLinkContext.RecurrentDonation:
			message = encodeURIComponent(
				"Olá! Sou doadora recorrente da Nutriz, estou com leite disponível e gostaria de solicitar a coleta da minha doação.",
			);
			break;
		case EnumWhatsAppLinkContext.NewDonor:
			message = encodeURIComponent(
				"Olá! Quero ser doadora de leite pela Nutriz.",
			);
			break;
		case EnumWhatsAppLinkContext.DonationHelp:
			message = encodeURIComponent(
				"Olá, estou com dúvida sobre minha doação e gostaria de ajuda.",
			);
			break;
		default:
			message = encodeURIComponent("Olá!");
			break;
	}

	const number = env.VITE_LACTARE_WHATSAPP_NUMBER?.trim();

	return number
		? `https://wa.me/${number}?text=${message}`
		: `https://wa.me/?text=${message}`;
}
