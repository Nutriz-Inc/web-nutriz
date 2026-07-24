import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
		},
	});
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
