import { useQuery } from "@tanstack/react-query";
import services from "@/services";

/**
 * Doacao em andamento da propria doadora, se houver.
 *
 * A listagem ja vem limitada ao usuario do token, entao basta pedir as ativas.
 * A tela pergunta isso ANTES de oferecer o botao de confirmar: assim o aviso
 * de "voce ja tem uma doacao" aparece de cara, em vez de so depois de a pessoa
 * clicar e a API recusar.
 */
export function useActiveDonation() {
	const activeDonationQuery = useQuery({
		queryKey: ["donations", "active"],
		queryFn: () =>
			services.donation.list({ page: 1, page_size: 1, is_active: true }),
	});

	return {
		activeDonation: activeDonationQuery.data?.data?.[0] ?? null,
		isLoading: activeDonationQuery.isLoading,
		refetchActiveDonation: activeDonationQuery.refetch,
	};
}
