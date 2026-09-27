import type { EnumDonationStepName } from "@/services/types/i-donation";

export type DoacaoDaLista = {
	id: string;
	numero: number;
	ativa: boolean;
	comErro: boolean;
	criadaEm: string;
	etapaAtual?: EnumDonationStepName;
	recorrente: boolean;
};
