import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import services from "@/services";
import type { IListDonationStepsRequest } from "@/services/types/i-donation";
import type {
	ICreateRouteRequest,
	IListRoutesRequest,
} from "@/services/types/i-route";
import { EnumUserType } from "@/services/types/i-user";
import { geocodeRegion } from "@/utils/geocode";

export function useRoutesList(params: IListRoutesRequest) {
	return useQuery({
		queryKey: ["routes-list", params],
		queryFn: () => services.route.list(params),
		staleTime: 10000,
		placeholderData: keepPreviousData,
	});
}

export function useDrivers() {
	return useQuery({
		queryKey: ["drivers"],
		queryFn: async () => {
			const { data } = await services.user.list({
				page: 1,
				page_size: 50,
				type: EnumUserType.Driver,
			});
			return data;
		},
		staleTime: 60000,
	});
}

export function useDonationStepsList(params: IListDonationStepsRequest) {
	return useQuery({
		queryKey: ["donation-steps-list", params],
		queryFn: () => services.donation.listSteps(params),
		staleTime: 10000,
		placeholderData: keepPreviousData,
	});
}

export function useCreateRoute() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ICreateRouteRequest) => services.route.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["routes-list"] });
		},
	});
}

type IbgeLocality = {
	id: number;
	nome: string;
};

export function useSpCities() {
	return useQuery({
		queryKey: ["sp-cities"],
		queryFn: async () => {
			const response = await fetch(
				"https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios?orderBy=nome",
			);
			if (!response.ok) throw new Error("ibge_cities_failed");
			return (await response.json()) as IbgeLocality[];
		},
		staleTime: Number.POSITIVE_INFINITY,
		gcTime: Number.POSITIVE_INFINITY,
	});
}

export function useSpDistricts(cityId?: number) {
	return useQuery({
		queryKey: ["sp-districts", cityId],
		queryFn: async () => {
			const response = await fetch(
				`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cityId}/distritos?orderBy=nome`,
			);
			if (!response.ok) throw new Error("ibge_districts_failed");
			return (await response.json()) as IbgeLocality[];
		},
		enabled: Boolean(cityId),
		staleTime: Number.POSITIVE_INFINITY,
		gcTime: Number.POSITIVE_INFINITY,
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
