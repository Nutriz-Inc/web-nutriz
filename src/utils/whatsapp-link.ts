import { env } from "@/config/env";

export enum EnumWhatsAppLinkContext {
	NewDonation = "new-donation",
	NewDonor = "new-donor",
}

export function buildLactareWhatsAppLink(context: EnumWhatsAppLinkContext) {
	let message: string;

	switch (context) {
		case EnumWhatsAppLinkContext.NewDonation:
			message = encodeURIComponent(
				"Olá! Gostaria de iniciar uma nova doação de leite materno.",
			);
			break;
		case EnumWhatsAppLinkContext.NewDonor:
			message = encodeURIComponent(
				"Olá! Quero ser doadora de leite pela Nutriz.",
			);
			break;
		default:
			message = encodeURIComponent("Olá!");
			break;
	}

	return `https://wa.me/${env?.LACTARE_WHATSAPP_NUMBER}?text=${message}`;
}
