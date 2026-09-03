import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import services from "@/services";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";

export function useUpdateAppointmentDescription(id_job: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (description: string) =>
			services.job.update(id_job, { description: description.trim() }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["appointment-detail", id_job],
			});
			queryClient.invalidateQueries({ queryKey: ["admin-appointments-list"] });
			queryClient.invalidateQueries({ queryKey: ["appointments-list"] });
		},
	});
}

export function useAppointmentDonation(
	id_job: string,
	id_user_common?: string,
) {
	return useQuery({
		queryKey: ["appointment-donation", id_job, id_user_common],
		enabled: Boolean(id_job && id_user_common),
		staleTime: 10000,
		queryFn: async () => {
			const { data } = await services.job.list({
				page: 1,
				page_size: DEFAULT_PAGE_SIZE,
				id_user_common,
			});

			return data.find((job) => job.id_job === id_job)?.id_donation ?? null;
		},
	});
}
