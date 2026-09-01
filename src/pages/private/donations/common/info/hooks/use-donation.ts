import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStepAlerts } from "@/hooks/use-step-alerts";
import services from "@/services";
import {
	EnumDonationStepStatus,
	type IGetDonationResponse,
	type IUpdateDonationRequest,
} from "@/services/types/i-donation";
import { intervaloAoVivo } from "@/utils/live-query";
import { STEP_DEFINITIONS } from "../constants";

export function useDonation(id_donation: string) {
	const donationQuery = useQuery({
		queryKey: ["donation", id_donation],
		queryFn: () => services.donation.get(id_donation),
		enabled: Boolean(id_donation),
		refetchIntervalInBackground: true,
		refetchInterval: (consulta) => {
			const etapas = consulta.state.data?.steps ?? [];

			const temReprovada = etapas.some(
				(etapa) => etapa.status === EnumDonationStepStatus.Failed,
			);

			const todasConcluidas = STEP_DEFINITIONS.every((definicao) => {
				const etapa = etapas.find((item) => item.name === definicao.name);
				return etapa?.status === EnumDonationStepStatus.Done;
			});

			return intervaloAoVivo(temReprovada || todasConcluidas);
		},
	});

	const { etapasDestacadas } = useStepAlerts(donationQuery.data?.steps);

	return {
		donationQuery,
		etapasDestacadas,
	};
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
