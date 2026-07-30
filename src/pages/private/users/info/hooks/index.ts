import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import services from "@/services";

export function useAdminUserDetail(id_user: string) {
	return useQuery({
		queryKey: ["admin-user-detail", id_user],
		queryFn: () =>
			services.user.get(id_user, {
				show_address: true,
				show_baby: false,
				show_donations_completed: true,
				show_current_donation: false,
			}),
		enabled: Boolean(id_user),
	});
}

export function useRemovedByUser(id_user?: string) {
	return useQuery({
		queryKey: ["admin-user-removed-by", id_user],
		queryFn: () =>
			services.user.get(id_user as string, {
				show_address: false,
				show_baby: false,
				show_donations_completed: false,
				show_current_donation: false,
			}),
		enabled: Boolean(id_user),
	});
}

export function useRemoveUser(id_user: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => services.user.remove(id_user),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
}

export function useUserDonations(
	id_user: string,
	enabled: boolean,
	is_active?: boolean,
) {
	return useQuery({
		queryKey: ["admin-user-donations", id_user, is_active ?? "all"],
		queryFn: () =>
			services.donation.list({
				page: 1,
				page_size: 50,
				id_user_common: id_user,
				is_active,
			}),
		enabled: Boolean(id_user) && enabled,
	});
}

export function useNurseAppointments(id_user: string, enabled: boolean) {
	return useQuery({
		queryKey: ["admin-user-nurse-jobs", id_user],
		queryFn: () =>
			services.job.list({
				page: 1,
				page_size: 50,
				id_user_nurse: id_user,
			}),
		enabled: Boolean(id_user) && enabled,
	});
}
