import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import services from "@/services";
import type { EnumDonationStepStatus } from "@/services/types/i-donation";
import type {
	ICreateRouteStopRequest,
	IGetRouteResponse,
	IUpdateRouteRequest,
} from "@/services/types/i-route";
import { intervaloAoVivo } from "@/utils/live-query";
import { ehRotaEncerrada } from "../utils";

export function useRouteDetail(id_route: string) {
	return useQuery({
		queryKey: ["route", id_route],
		queryFn: () => services.route.get(id_route),
		enabled: Boolean(id_route),
		refetchIntervalInBackground: true,
		refetchInterval: (consulta) => {
			const status = consulta.state.data?.status;
			return intervaloAoVivo(!status || ehRotaEncerrada(status));
		},
	});
}

export function useRouteDriver(id_driver?: string) {
	return useQuery({
		queryKey: ["route-driver", id_driver],
		enabled: Boolean(id_driver),
		staleTime: 60000,
		queryFn: () =>
			services.user.get(id_driver as string, {
				show_address: false,
				show_baby: false,
				show_donations_completed: false,
				show_current_donation: false,
			}),
	});
}

function useInvalidarRota(id_route: string) {
	const queryClient = useQueryClient();

	return async () => {
		await queryClient.invalidateQueries({ queryKey: ["route", id_route] });
		await queryClient.invalidateQueries({ queryKey: ["routes-list"] });
	};
}

export function useUpdateRoute(id_route: string) {
	const queryClient = useQueryClient();
	const invalidar = useInvalidarRota(id_route);

	return useMutation({
		mutationFn: (body: IUpdateRouteRequest) =>
			services.route.update(id_route, body),
		onSuccess: async (rotaAtualizada) => {
			queryClient.setQueryData<IGetRouteResponse>(
				["route", id_route],
				(atual) => (atual ? { ...atual, ...rotaAtualizada } : atual),
			);

			await invalidar();
		},
	});
}

export function useCreateRouteStop(id_route: string) {
	const invalidar = useInvalidarRota(id_route);

	return useMutation({
		mutationFn: (body: ICreateRouteStopRequest) =>
			services.route.createStop(id_route, body),
		onSuccess: invalidar,
	});
}

export function useRemoveRouteStop(id_route: string) {
	const invalidar = useInvalidarRota(id_route);

	return useMutation({
		mutationFn: (id_stop: string) => services.route.removeStop(id_stop),
		onSuccess: invalidar,
	});
}

export function useMarkStopArrival(id_route: string) {
	const invalidar = useInvalidarRota(id_route);

	return useMutation({
		mutationFn: (id_stop: string) =>
			services.route.updateStop(id_stop, { date_start: true }),
		onSuccess: invalidar,
	});
}

export function useRouteStats(enabled: boolean) {
	return useQuery({
		queryKey: ["route-stats"],
		enabled,
		staleTime: 300000,
		queryFn: () => services.dashboard.getAdmDashboard({}),
	});
}

type RegistrarImprevistoParams = {
	id_stop: string;
	relato: string;
};

export function useMarkStopError(id_route: string) {
	const invalidar = useInvalidarRota(id_route);

	return useMutation({
		mutationFn: async ({ id_stop, relato }: RegistrarImprevistoParams) => {
			const resposta = await services.route.updateStop(id_stop, {
				has_error: true,
			});

			await services.route.update(id_route, { user_feedback: relato });

			return resposta;
		},
		onSuccess: invalidar,
	});
}

type UseDonationStepOptionsParams = {
	enabled: boolean;
	city?: string;
	neighborhood?: string;
	status?: EnumDonationStepStatus;
};

export function useDonationStepOptions({
	enabled,
	city,
	neighborhood,
	status,
}: UseDonationStepOptionsParams) {
	return useQuery({
		queryKey: ["route-stop-options", city, neighborhood, status],
		enabled,
		staleTime: 30000,
		queryFn: () =>
			services.donation.listSteps({
				page: 1,
				page_size: 50,
				city,
				neighborhood,
				status,
				has_address: true,
			}),
	});
}
