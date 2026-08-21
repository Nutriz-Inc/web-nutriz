import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import { INTERVALO_AO_VIVO_MS } from "@/utils/live-query";

export function useDonationsList() {
	return useQuery({
		queryKey: ["donations"],
		// Menor que o intervalo de recarga: com 10s o dado voltava do cache
		// ainda velho e a lista so mudava no ciclo seguinte.
		staleTime: 0,
		queryFn: () => services.donation.list({ page: 1, page_size: 50 }),
		refetchInterval: INTERVALO_AO_VIVO_MS,
	});
}
