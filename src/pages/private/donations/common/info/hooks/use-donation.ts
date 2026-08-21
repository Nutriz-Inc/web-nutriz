import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStepAlerts } from "@/hooks/use-step-alerts";
import services from "@/services";
import {
	EnumDonationStepStatus,
	type IGetDonationResponse,
	type IUpdateDonationRequest,
} from "@/services/types/i-donation";
import { intervaloAoVivo } from "@/utils/live-query";

export function useDonation(id_donation: string) {
	const donationQuery = useQuery({
		queryKey: ["donation", id_donation],
		queryFn: () => services.donation.get(id_donation),
		enabled: Boolean(id_donation),
		/*
		 * Quem move as etapas e o admin, do outro lado. A tela se recarrega
		 * sozinha para refletir isso; `refetchInterval` aceita funcao e recebe a
		 * propria consulta, entao o intervalo desliga assim que a doacao chega
		 * ao fim — dai nao ha mais o que mudar.
		 */
		refetchInterval: (consulta) => {
			const etapas = consulta.state.data?.steps ?? [];

			const temReprovada = etapas.some(
				(etapa) => etapa.status === EnumDonationStepStatus.Failed,
			);
			const todasConcluidas =
				etapas.length > 0 &&
				etapas.every((etapa) => etapa.status === EnumDonationStepStatus.Done);

			return intervaloAoVivo(temReprovada || todasConcluidas);
		},
	});

	const { etapasDestacadas } = useStepAlerts(donationQuery.data?.steps);

	return {
		donationQuery,
		etapasDestacadas,
		/** Verdadeiro enquanto a tela esta se atualizando sozinha. */
		aoVivo: !donationQuery.isLoading,
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
		},
	});
}
