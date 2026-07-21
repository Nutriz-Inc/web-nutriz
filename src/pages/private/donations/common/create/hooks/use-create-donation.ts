import { useMutation } from "@tanstack/react-query";
import services from "@/services";

export function useCreateDonation() {
	const createDonationMutation = useMutation({
		mutationFn: () => services.donation.create(),
	});

	return {
		createDonationMutation,
	};
}
