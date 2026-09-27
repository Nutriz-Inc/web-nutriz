import type { ColunaDaLista } from "@/components/full/ListaDeDados";
import { getInitials } from "@/components/layout/utils";
import { Badge } from "@/components/ui/badge";
import { EnumUserType, type User } from "@/services/types/i-user";
import {
	RECURRENT_DONOR_LABEL,
	USER_TYPE_LABEL,
	USER_TYPE_TONE,
} from "@/utils/constants";
import { isRecurrentDonor } from "@/utils/donor";
import { formatCpf } from "@/utils/formatter";

function rotuloDoPerfil(user: User) {
	return user.type === EnumUserType.Common && isRecurrentDonor(user)
		? RECURRENT_DONOR_LABEL
		: USER_TYPE_LABEL[user.type];
}

export const COLUNAS_DO_USUARIO: ColunaDaLista<User>[] = [
	{
		chave: "usuario",
		titulo: "Usuário",
		largura: "minmax(0,1.6fr)",
		papel: "principal",
		celula: (user) => (
			<div className="flex min-w-0 items-center gap-3">
				<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-tint text-apoio font-bold text-blue-deep">
					{getInitials(user.name)}
				</span>
				<span className="truncate text-corpo font-semibold text-ink">
					{user.name}
				</span>
			</div>
		),
	},
	{
		chave: "perfil",
		titulo: "Perfil",
		largura: "minmax(0,1fr)",
		papel: "situacao",
		celula: (user) => (
			<Badge tone={USER_TYPE_TONE[user.type]}>{rotuloDoPerfil(user)}</Badge>
		),
	},
	{
		chave: "email",
		titulo: "E-mail",
		largura: "minmax(0,1.6fr)",
		larga: true,
		celula: (user) => user.email,
	},
	{
		chave: "cpf",
		titulo: "CPF",
		largura: "minmax(0,1.1fr)",
		celula: (user) => formatCpf(user.cpf),
	},
];
