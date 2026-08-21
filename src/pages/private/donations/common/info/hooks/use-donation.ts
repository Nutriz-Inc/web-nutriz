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
		/*
		 * Quem move as etapas e o admin, do outro lado. A tela se recarrega
		 * sozinha para refletir isso; `refetchInterval` aceita funcao e recebe a
		 * propria consulta, entao o intervalo desliga assim que a doacao chega
		 * ao fim — dai nao ha mais o que mudar.
		 */
		refetchIntervalInBackground: true,
		refetchInterval: (consulta) => {
			const etapas = consulta.state.data?.steps ?? [];

			const temReprovada = etapas.some(
				(etapa) => etapa.status === EnumDonationStepStatus.Failed,
			);

			/*
			 * Concluida e quando as QUATRO etapas do processo existem e estao
			 * feitas — a mesma regra que a pagina usa para `isFullyCompleted`.
			 *
			 * Olhar so as etapas ja criadas estava errado e quebrava o caso mais
			 * comum: doacao recem-aberta tem uma etapa so; o admin aprovava
			 * aquela unica etapa, "todas as existentes" virava verdade, o ciclo
			 * desligava de vez e a doadora nunca via a etapa seguinte abrir.
			 */
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
