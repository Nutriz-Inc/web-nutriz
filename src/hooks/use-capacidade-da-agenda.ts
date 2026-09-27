import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { buscarIndicador } from "@/services/analytics";

export function useCapacidadeDaAgenda(
	data: string,
	hora: string,
	ignorar?: string,
) {
	const { auth } = useAuth();
	const token = auth?.token ?? "";

	const consulta = useQuery({
		queryKey: ["agenda", data, ignorar ?? null],
		queryFn: () => buscarIndicador("agenda", { data, ignorar }, token),
		enabled: Boolean(token && data),
		staleTime: 0,
		refetchOnWindowFocus: true,
		refetchInterval: 30 * 1000,
		retry: 1,
		meta: { silenciarErro: true },
	});

	const agenda = consulta.data;
	const horaEscolhida = hora ? Number(hora.slice(0, 2)) : null;
	const horario =
		agenda && horaEscolhida !== null
			? agenda.horarios.find((item) => item.hora === horaEscolhida)
			: undefined;
	const foraDoExpediente =
		Boolean(agenda) && horaEscolhida !== null && !horario;
	const horaLotada = Boolean(horario?.lotado);
	const diaLotado = Boolean(agenda?.dia_lotado);

	return {
		agenda,
		carregando: consulta.isLoading,
		indisponivel: consulta.isError,
		horaEscolhida,
		horaLotada,
		diaLotado,
		foraDoExpediente,
		bloqueia: horaLotada || diaLotado || foraDoExpediente,
	};
}

export type CapacidadeDaAgenda = ReturnType<typeof useCapacidadeDaAgenda>;
