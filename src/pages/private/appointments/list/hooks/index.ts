import { useQuery } from "@tanstack/react-query";
import { MOCK_APPOINTMENTS } from "../../mock";
import type { Appointment } from "../../types";

// NOTE: fonte mock por enquanto. Quando o endpoint estiver pronto, trocar por
// services.job.list({ id_user_nurse: auth.id_user }) e mapear IJobResponse →
// Appointment (user_common_name → donorName, date_set → dateSet, address →
// locationName, id_step → stepName, status da etapa → status).
export function useAppointmentsList() {
	return useQuery({
		queryKey: ["appointments-list"],
		queryFn: async (): Promise<Appointment[]> => MOCK_APPOINTMENTS,
		staleTime: 10000,
	});
}
