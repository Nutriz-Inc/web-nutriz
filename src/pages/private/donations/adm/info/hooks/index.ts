import {
	useMutation,
	useQueries,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import services from "@/services";
import type {
	ICreateDonationStepRequest,
	IGetDonationResponse,
	IUpdateDonationRequest,
	IUpdateDonationStepRequest,
} from "@/services/types/i-donation";
import type {
	ICreateJobRequest,
	IUpdateJobRequest,
	Job,
} from "@/services/types/i-job";
import {
	EnumRouteStatus,
	type IGetRouteResponse,
} from "@/services/types/i-route";
import { EnumUserType } from "@/services/types/i-user";

export function useAdminDonationDetail(id_donation: string) {
	const donationQuery = useQuery({
		queryKey: ["donation", id_donation],
		queryFn: () => services.donation.get(id_donation),
		enabled: Boolean(id_donation),
	});

	const id_user = donationQuery.data?.created_by;

	const donorQuery = useQuery({
		queryKey: ["admin-donor", id_user],
		queryFn: () =>
			services.user.get(id_user as string, {
				show_address: true,
				show_baby: false,
				show_donations_completed: false,
				show_current_donation: false,
			}),
		enabled: Boolean(id_user),
	});

	return { donationQuery, donorQuery };
}

export function useCreateDonationStep(id_donation: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ICreateDonationStepRequest) =>
			services.donation.createStep(data),
		onSuccess: async (newStep) => {
			await queryClient.cancelQueries({ queryKey: ["donation", id_donation] });
			queryClient.setQueryData<IGetDonationResponse>(
				["donation", id_donation],
				(current) =>
					current && { ...current, steps: [...current.steps, newStep] },
			);
		},
	});
}

export function useUpdateDonationStep(id_donation: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id_donation_step,
			data,
		}: {
			id_donation_step: string;
			data: IUpdateDonationStepRequest;
		}) => services.donation.updateStep(id_donation_step, data),
		onSuccess: async (updatedStep) => {
			await queryClient.cancelQueries({ queryKey: ["donation", id_donation] });
			queryClient.setQueryData<IGetDonationResponse>(
				["donation", id_donation],
				(current) =>
					current && {
						...current,
						steps: current.steps.map((step) =>
							step.id_donation_step === updatedStep.id_donation_step
								? updatedStep
								: step,
						),
					},
			);
		},
	});
}

export function useUpdateDonation(id_donation: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: IUpdateDonationRequest) =>
			services.donation.update(id_donation, data),
		onSuccess: async (updatedDonation) => {
			await queryClient.cancelQueries({ queryKey: ["donation", id_donation] });
			queryClient.setQueryData<IGetDonationResponse>(
				["donation", id_donation],
				(current) => current && { ...current, ...updatedDonation },
			);
			await queryClient.invalidateQueries({
				queryKey: ["donation", id_donation],
			});
		},
	});
}

export function usePendingRoutes() {
	return useQuery({
		queryKey: ["pending-routes"],
		queryFn: () =>
			services.route.list({
				page: 1,
				page_size: 50,
				status: EnumRouteStatus.Pending,
			}),
		staleTime: 30000,
	});
}

export function useAddStepToRoute() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id_route,
			id_donation_step,
		}: {
			id_route: string;
			id_donation_step: string;
		}) => services.route.createStop(id_route, { id_donation_step }),
		onSuccess: (_data, { id_route }) => {
			queryClient.invalidateQueries({ queryKey: ["routes-list"] });
			queryClient.invalidateQueries({ queryKey: ["route", id_route] });
			queryClient.invalidateQueries({ queryKey: ["routes-all"] });
			queryClient.invalidateQueries({
				queryKey: ["steps-available-for-route"],
			});
		},
	});
}

export function useStepsAvailableForRoute(id_donation: string) {
	return useQuery({
		queryKey: ["steps-available-for-route", id_donation],
		queryFn: () =>
			services.donation.listSteps({
				page: 1,
				page_size: 50,
				id_donation,
				available_for_route: true,
			}),
		enabled: Boolean(id_donation),
		staleTime: 15000,
	});
}

export function useRoutesForDonationStep(idDonationStep: string) {
	const listQuery = useQuery({
		queryKey: ["routes-all"],
		queryFn: () => services.route.list({ page: 1, page_size: 50 }),
		staleTime: 30000,
	});

	const routes = listQuery.data?.data ?? [];

	const detailQueries = useQueries({
		queries: routes.map((route) => ({
			queryKey: ["route", route.id_route],
			queryFn: () => services.route.get(route.id_route),
			staleTime: 30000,
		})),
	});

	const associatedRoutes = detailQueries
		.map((query) => query.data)
		.filter(
			(detail): detail is IGetRouteResponse =>
				!!detail?.stops?.some(
					(stop) =>
						stop.id_donation_step === idDonationStep && !stop.removed_at,
				),
		);

	return {
		routes: associatedRoutes,
		isLoading:
			listQuery.isLoading || detailQueries.some((query) => query.isLoading),
	};
}

export function useNurses() {
	return useQuery({
		queryKey: ["admin-nurses"],
		queryFn: async () => {
			const { data } = await services.user.list({
				page: 1,
				page_size: 50,
				type: EnumUserType.Nurse,
			});
			return data;
		},
		staleTime: 60000,
	});
}

export function useDonationJobs(id_user_common?: string) {
	return useQuery({
		queryKey: ["donation-jobs", id_user_common],
		queryFn: async () => {
			const { data } = await services.job.list({
				page: 1,
				page_size: 50,
				id_user_common,
			});
			return data;
		},
		enabled: Boolean(id_user_common),
	});
}

export function useCreateStepJob(id_user_common?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ICreateJobRequest) => services.job.create(data),
		onSuccess: async (newJob) => {
			await queryClient.cancelQueries({
				queryKey: ["donation-jobs", id_user_common],
			});
			queryClient.setQueryData<Job[]>(
				["donation-jobs", id_user_common],
				(current) => (current ? [...current, newJob] : [newJob]),
			);
		},
	});
}

export function useUpdateStepJob(id_user_common?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id_job,
			data,
		}: {
			id_job: string;
			data: IUpdateJobRequest;
		}) => services.job.update(id_job, data),
		onSuccess: async (updatedJob) => {
			await queryClient.cancelQueries({
				queryKey: ["donation-jobs", id_user_common],
			});
			queryClient.setQueryData<Job[]>(
				["donation-jobs", id_user_common],
				(current) =>
					current?.map((job) =>
						job.id_job === updatedJob.id_job ? updatedJob : job,
					) ?? [updatedJob],
			);
		},
	});
}

export function useRemoveStepJob(id_user_common?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id_job: string) => services.job.remove(id_job),
		onSuccess: async (_data, id_job) => {
			await queryClient.cancelQueries({
				queryKey: ["donation-jobs", id_user_common],
			});
			queryClient.setQueryData<Job[]>(
				["donation-jobs", id_user_common],
				(current) => current?.filter((job) => job.id_job !== id_job) ?? [],
			);
		},
	});
}
