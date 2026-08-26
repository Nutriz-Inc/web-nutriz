import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import { OPCOES_AO_VIVO } from "@/utils/live-query";

export const useQueryUserInfo = (id?: string) => {
	return useQuery({
		queryKey: ["user-info", id],
		staleTime: 0,
		...OPCOES_AO_VIVO,
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
