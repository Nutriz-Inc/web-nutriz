import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { buscarIndicador } from "@/services/analytics";
import type {
	ConsultasDeIndicadores,
	FiltroDeIndicadores,
} from "@/services/types/i-analytics";

const UM_MINUTO = 60 * 1000;

export function useIndicador<C extends keyof ConsultasDeIndicadores>(
	consulta: C,
	filtro: FiltroDeIndicadores = {},
	atualizarSozinho = false,
) {
	const { auth } = useAuth();
	const token = auth?.token ?? "";

	return useQuery({
		queryKey: ["indicador", consulta, filtro],
		queryFn: () => buscarIndicador(consulta, filtro, token),
		enabled: Boolean(token),
		placeholderData: keepPreviousData,
		refetchInterval: atualizarSozinho ? UM_MINUTO : false,
		retry: 1,
		meta: { silenciarErro: true },
	});
}
