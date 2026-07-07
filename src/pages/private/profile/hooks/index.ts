import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import services from "@/services";
import type {
	ICreateAddressRequest,
	ICreateUserBabyRequest,
	IUpdateAddressRequest,
	IUpdateUserBabyRequest,
	IUpdateUserRequest,
} from "@/services/types/i-user";

export const PROFILE_QUERY_KEY = "profile";

export function useQueryProfile(id?: string) {
	return useQuery({
		queryKey: [PROFILE_QUERY_KEY, id],
		queryFn: () =>
			services.user.get(id!, {
				show_address: true,
				show_baby: true,
				show_donations_completed: false,
				show_current_donation: false,
			}),
		enabled: !!id,
	});
}

export function useUpdateProfile(id?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: IUpdateUserRequest) => services.user.update(id!, data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY, id] }),
	});
}

export function useSaveAddress(id?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id_address,
			data,
		}: {
			id_address?: string;
			data: ICreateAddressRequest | IUpdateAddressRequest;
		}) =>
			id_address
				? services.user.updateAddress(id_address, data)
				: services.user.createAddress(data as ICreateAddressRequest),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY, id] }),
	});
}

export function useUpdateBaby(id?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id_user_baby,
			data,
		}: {
			id_user_baby: string;
			data: IUpdateUserBabyRequest;
		}) => services.user.updateBaby(id_user_baby, data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY, id] }),
	});
}

export function useCreateBaby(id?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ICreateUserBabyRequest) =>
			services.user.createBaby(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY, id] }),
	});
}

export function useRemoveBaby(id?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id_user_baby: string) =>
			services.user.removeBaby(id_user_baby),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY, id] }),
	});
}
