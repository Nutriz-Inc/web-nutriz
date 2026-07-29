import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import type { IGetAdmDashboardRequest } from "@/services/types/i-dashboard";

export function useQueryAdmDashboard(params: IGetAdmDashboardRequest) {
	const dashboardQuery = useQuery({
		queryKey: ["adm-dashboard", params],
		queryFn: () => services.dashboard.getAdmDashboard(params),
	});

	return {
		dashboardQuery,
	};
}
