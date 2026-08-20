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

	// A env se chama VITE_LACTARE_WHATSAPP_NUMBER (e a mesma que o widget da
	// EVA usa). Sem o prefixo VITE_ o valor vinha `undefined` e o link abria em
	// wa.me/undefined — o botao de nova doacao caia numa pagina de erro.
	const number = env.VITE_LACTARE_WHATSAPP_NUMBER?.trim();

	return number
		? `https://wa.me/${number}?text=${message}`
		: `https://wa.me/?text=${message}`;
}
