import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import { INTERVALO_AO_VIVO_MS } from "@/utils/live-query";

export const useQueryUserInfo = (id?: string) => {
	return useQuery({
		queryKey: ["user-info", id],
		// A home mostra a doacao em andamento, que o admin move do outro lado.
		staleTime: 0,
		refetchInterval: INTERVALO_AO_VIVO_MS,
		queryFn: () =>
			services.user.get(id!, {
				show_current_donation: true,
				show_donations_completed: true,
				show_address: false,
				show_baby: false,
			}),

		enabled: !!id,
	});
};
