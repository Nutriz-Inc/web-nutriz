import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import { OPCOES_AO_VIVO } from "@/utils/live-query";

export function useDonationsList() {
	return useQuery({
		queryKey: ["donations"],
		staleTime: 0,
		queryFn: () => services.donation.list({ page: 1, page_size: 50 }),
		...OPCOES_AO_VIVO,
	});
}
