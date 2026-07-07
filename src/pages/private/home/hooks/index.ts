import { useQuery } from "@tanstack/react-query";
import services from "@/services";

export const useQueryUserInfo = (id?: string) => {
	return useQuery({
		queryKey: ["user-info", id],
		staleTime: 10000,
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
