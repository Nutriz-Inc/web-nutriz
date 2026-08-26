import { useQuery } from "@tanstack/react-query";
import services from "@/services";

export function useActiveDonation() {
	const activeDonationQuery = useQuery({
		queryKey: ["donations", "active"],
		queryFn: () =>
			services.donation.list({ page: 1, page_size: 1, is_active: true }),
	});

	return {
		activeDonation: activeDonationQuery.data?.data?.[0] ?? null,
		isLoading: activeDonationQuery.isLoading,
		refetchActiveDonation: activeDonationQuery.refetch,
	};
}
