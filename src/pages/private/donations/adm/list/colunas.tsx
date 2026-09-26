import type { ColunaDaLista } from "@/components/full/ListaDeDados";
import { StatusBadge } from "@/components/full/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { formatCpf, formatDateBR } from "@/utils/formatter";
import { donationToken } from "@/utils/status";
import { TrilhaDaDoacao } from "./components/TrilhaDaDoacao";
import type { AdminDonationRow } from "./hooks";

export const COLUNAS_DA_DOACAO: ColunaDaLista<AdminDonationRow>[] = [
	{
		chave: "doadora",
		titulo: "Doadora",
		largura: "minmax(0,1.6fr)",
		papel: "principal",
		celula: (doacao) => (
			<div className="flex min-w-0 flex-col items-start gap-1">
				<span className="max-w-full truncate text-corpo font-semibold text-ink">
					{doacao.userName}
				</span>
				{doacao.isRecurrent && (
					<Badge tone="teal" size="sm">
						Recorrente
					</Badge>
				)}
			</div>
		),
	},
	{
		chave: "situacao",
		titulo: "Situação",
		largura: "minmax(0,1.1fr)",
		papel: "situacao",
		celula: (doacao) => (
			<StatusBadge
				token={donationToken(doacao.isActive, doacao.hasError)}
				gender="f"
			/>
		),
	},
	{
		chave: "etapa",
		titulo: "Etapa",
		largura: "minmax(0,1.8fr)",
		larga: true,
		celula: (doacao) => (
			<TrilhaDaDoacao
				etapaAtual={doacao.currentStepName}
				ativa={doacao.isActive}
				comErro={doacao.hasError}
				recorrente={doacao.isRecurrent}
			/>
		),
	},
	{
		chave: "cpf",
		titulo: "CPF",
		largura: "minmax(0,1.1fr)",
		celula: (doacao) => (doacao.userCpf ? formatCpf(doacao.userCpf) : "—"),
	},
	{
		chave: "criada",
		titulo: "Criada em",
		largura: "minmax(0,0.9fr)",
		alinhar: "fim",
		celula: (doacao) => formatDateBR(doacao.createdAt),
	},
];
