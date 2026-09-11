import { useMutation } from "@tanstack/react-query";
import services from "@/services";

export function useCreateDonation() {
	const createDonationMutation = useMutation({
		meta: { sucesso: "Doação iniciada.", silenciarErro: true },
		mutationFn: () => services.donation.create(),
	});

	return {
		createDonationMutation,
	};
}
