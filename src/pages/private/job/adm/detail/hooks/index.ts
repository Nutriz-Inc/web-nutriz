import { useMutation, useQueryClient } from "@tanstack/react-query";
import services from "@/services";

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
