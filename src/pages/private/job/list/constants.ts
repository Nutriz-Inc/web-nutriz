import { EnumJobStatus } from "@/services/types/i-job";

export type ColunaQuadro = {
	status: EnumJobStatus;
	titulo: string;
	/** Faixa de cor no topo da coluna, que da a identidade dela de relance. */
	corDaFaixa: string;
	corDoContador: string;
	vazio: string;
};

/**
 * As tres colunas do quadro, na ordem em que um agendamento caminha: nasce
 * pendente e termina concluido ou com erro.
 *
 * Sao exatamente os tres `EnumJobStatus` que a API ja usa — o quadro nao
 * inventa estado nenhum.
 */
export const COLUNAS_DO_QUADRO: ColunaQuadro[] = [
	{
		status: EnumJobStatus.Pending,
		titulo: "Em andamento",
		corDaFaixa: "bg-blue-bright",
		corDoContador: "bg-blue-tint text-blue-bright",
		vazio: "Nenhum agendamento aguardando você.",
	},
	{
		status: EnumJobStatus.Done,
		titulo: "Concluídos",
		corDaFaixa: "bg-success",
		corDoContador: "bg-success-tint text-success",
		vazio: "Nada concluído neste período.",
	},
	{
		status: EnumJobStatus.Failed,
		titulo: "Com erro",
		corDaFaixa: "bg-danger",
		corDoContador: "bg-danger-tint text-danger",
		vazio: "Nenhuma ocorrência por aqui.",
	},
];
