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

export function useLeiteDoado(idDaDoadora?: string) {
	return useQuery({
		queryKey: ["user-info", idDaDoadora, "leite-doado"],
		staleTime: 0,
		enabled: Boolean(idDaDoadora),
		queryFn: () =>
			services.user.get(idDaDoadora as string, {
				show_current_donation: false,
				show_donations_completed: true,
				show_address: false,
				show_baby: false,
			}),
		select: (usuario) => usuario.milk_donated ?? 0,
		...OPCOES_AO_VIVO,
	});
}
