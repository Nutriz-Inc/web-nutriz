import { useQuery } from "@tanstack/react-query";
import services from "@/services";

export function useDonationsList() {
	return useQuery({
		queryKey: ["donations"],
		staleTime: 10000,
		queryFn: () => services.donation.list({ page: 1, page_size: 50 }),
	});
}
