import { useMutation } from "@tanstack/react-query";
import services from "@/services";

export function useCreateDonation() {
	const createDonationMutation = useMutation({
		mutationFn: () => services.donation.create(),
		meta: { silenciarErro: true },
	});

	return {
		createDonationMutation,
	};
}
