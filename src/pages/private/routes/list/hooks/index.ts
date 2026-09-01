import { keepPreviousData, useQuery } from "@tanstack/react-query";
import services from "@/services";
import type { IListRoutesRequest } from "@/services/types/i-route";

export function useRoutesList(params: IListRoutesRequest) {
	return useQuery({
		queryKey: ["routes-list", params],
		queryFn: () => services.route.list(params),
		staleTime: 10000,
		placeholderData: keepPreviousData,
	});
}
