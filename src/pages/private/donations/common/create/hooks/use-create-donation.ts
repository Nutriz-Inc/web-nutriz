import { useMutation } from "@tanstack/react-query";
import services from "@/services";

export function useCreateDonation() {
	const createDonationMutation = useMutation({
		mutationFn: () => services.donation.create(),
		// A tela cuida da mensagem: ja ter uma doacao aberta e o motivo mais
		// comum de recusa aqui, e para isso ela mostra um aviso rosa, nao um
		// toast vermelho. Ver `MutationCache.onError` em App.tsx.
		meta: { silenciarErro: true },
	});

	return {
		createDonationMutation,
	};
}
