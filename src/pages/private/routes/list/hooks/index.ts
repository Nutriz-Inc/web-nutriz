import { keepPreviousData, useQuery } from "@tanstack/react-query";
import services from "@/services";
import type { IListRoutesRequest } from "@/services/types/i-route";
import { geocodeRegion } from "@/utils/geocode";

export function useRoutesList(params: IListRoutesRequest) {
	return useQuery({
		queryKey: ["routes-list", params],
		queryFn: () => services.route.list(params),
		staleTime: 10000,
		placeholderData: keepPreviousData,
	});
}

export function useRegionCoordinates(city?: string, neighborhood?: string) {
	return useQuery({
		queryKey: ["route-region", city ?? "", neighborhood ?? ""],
		enabled: Boolean(city || neighborhood),
		staleTime: 24 * 60 * 60 * 1000,
		gcTime: 24 * 60 * 60 * 1000,
		retry: false,
		queryFn: ({ signal }) => geocodeRegion(city, neighborhood, signal),
	});
}
