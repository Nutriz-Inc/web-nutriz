import { useQuery } from "@tanstack/react-query";
import services from "@/services";

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
