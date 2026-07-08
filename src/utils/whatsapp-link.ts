const LACTARE_WHATSAPP_NUMBER = "5511999999999";

export function buildLactareWhatsAppLink() {
	const message = encodeURIComponent(
		"Olá! Gostaria de iniciar uma nova doação de leite materno.",
	);

	return `https://wa.me/${LACTARE_WHATSAPP_NUMBER}?text=${message}`;
}
