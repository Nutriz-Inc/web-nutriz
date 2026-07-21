import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import services from "@/services";
import type {
	ICreateDonationStepRequest,
	IUpdateDonationStepRequest,
} from "@/services/types/i-donation";
import type {
	ICreateJobRequest,
	IUpdateJobRequest,
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["donation", id_donation] });
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["donation", id_donation] });
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

export function useStepJobs(id_donation_step?: string) {
	return useQuery({
		queryKey: ["step-jobs", id_donation_step],
		queryFn: async () => {
			const { data } = await services.job.list({
				page: 1,
				page_size: 50,
				id_step: id_donation_step,
			});
			return data;
		},
		enabled: Boolean(id_donation_step),
	});
}

export function useCreateStepJob(id_donation_step?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ICreateJobRequest) => services.job.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["step-jobs", id_donation_step],
			});
		},
	});
}

export function useUpdateStepJob(id_donation_step?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id_job,
			data,
		}: {
			id_job: string;
			data: IUpdateJobRequest;
		}) => services.job.update(id_job, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["step-jobs", id_donation_step],
			});
		},
	});
}

export function useRemoveStepJob(id_donation_step?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id_job: string) => services.job.remove(id_job),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["step-jobs", id_donation_step],
			});
		},
	});
}
