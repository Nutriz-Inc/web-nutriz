import { useMutation } from "@tanstack/react-query";
import services from "@/services";

// TODO: substituir pelo número real da equipe Lactare: (11) 96629-0681
const LACTARE_WHATSAPP_NUMBER = "5511999999999"; // mocked

export function buildLactareWhatsAppLink() {
	const message = encodeURIComponent(
		"Olá! Gostaria de iniciar uma nova doação de leite materno.",
	);

	return `https://wa.me/${LACTARE_WHATSAPP_NUMBER}?text=${message}`;
}

export function useCreateDonation() {
	const createDonationMutation = useMutation({
		mutationFn: () => services.donation.create(),
	});

	return {
		createDonationMutation,
	};
}
