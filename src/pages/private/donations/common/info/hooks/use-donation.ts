import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import services from "@/services";
import type {
	IGetDonationResponse,
	IUpdateDonationRequest,
} from "@/services/types/i-donation";

export function useDonation(id_donation: string) {
	const donationQuery = useQuery({
		queryKey: ["donation", id_donation],
		queryFn: () => services.donation.get(id_donation),
		enabled: Boolean(id_donation),
	});

	return {
		donationQuery,
	};
}

export function useUpdateDonation(id_donation: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: IUpdateDonationRequest) =>
			services.donation.update(id_donation, data),
		onSuccess: async (updatedDonation) => {
			await queryClient.cancelQueries({ queryKey: ["donation", id_donation] });
			queryClient.setQueryData<IGetDonationResponse>(
				["donation", id_donation],
				(current) => current && { ...current, ...updatedDonation },
			);
		},
	});
}
