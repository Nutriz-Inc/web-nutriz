import { useQuery } from "@tanstack/react-query";
import { getMockAppointmentDetail } from "../../mock";
import type { AppointmentDetail } from "../../types";

// NOTE: fonte mock por enquanto. Quando o endpoint estiver pronto, trocar por
// services.job.get(id) (+ etapas/relatórios) e mapear para AppointmentDetail.
export function useAppointmentDetail(id: string) {
	return useQuery({
		queryKey: ["appointment-detail", id],
		queryFn: async (): Promise<AppointmentDetail | null> =>
			getMockAppointmentDetail(id),
		staleTime: 10000,
		enabled: Boolean(id),
	});
}
