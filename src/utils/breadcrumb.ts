import type { EnumUserType } from "@/services/types/i-user";
import { getHome } from "@/utils/routes";

export type BreadcrumbItem = {
	label: string;
	to?: string;
};

const TELAS: Record<string, string> = {
	"/home": "Início",
	"/minhas-doacoes": "Minhas doações",
	"/pontos-de-coleta": "Pontos de coleta",
	"/conteudo-educativo": "Conteúdo educativo",
	"/perfil": "Perfil",
	"/nova-doacao": "Nova doação",
	"/agendamentos": "Meus agendamentos",
	"/rotas": "Rotas",
	"/gestao-doacoes": "Gestão de doações",
	"/usuarios": "Usuários",
	"/dashboard": "Dashboard",
};

function getRaiz(userType?: EnumUserType): BreadcrumbItem {
	const to = getHome(userType);

	return { label: TELAS[to] ?? "Início", to };
}

const DETALHES: Record<string, BreadcrumbItem[]> = {
	doacao: [
		{ label: "Minhas doações", to: "/minhas-doacoes" },
		{ label: "Doação" },
	],
	agendamentos: [
		{ label: "Meus agendamentos", to: "/agendamentos" },
		{ label: "Agendamento" },
	],
	"gestao-doacoes": [
		{ label: "Gestão de doações", to: "/gestao-doacoes" },
		{ label: "Doação" },
	],
	usuarios: [{ label: "Usuários", to: "/usuarios" }, { label: "Usuário" }],
	artigos: [
		{ label: "Conteúdo educativo", to: "/conteudo-educativo" },
		{ label: "Artigo" },
	],
};

export function getBreadcrumb(
	pathname: string,
	userType?: EnumUserType,
): BreadcrumbItem[] {
	const limpo = pathname.replace(/\/+$/, "") || "/";
	const raiz = getRaiz(userType);

	if (limpo === raiz.to) {
		return [];
	}

	const rotuloDireto = TELAS[limpo];
	if (rotuloDireto) {
		return [raiz, { label: rotuloDireto }];
	}

	const segmentos = limpo.split("/").filter(Boolean);
	const trilha = DETALHES[segmentos[0] ?? ""];
	if (!trilha) {
		return [];
	}

	const degraus =
		trilha[0]?.to === raiz.to ? [raiz, ...trilha.slice(1)] : [raiz, ...trilha];

	if (segmentos.includes("etapa")) {
		return [
			...degraus.map((item, i) =>
				i === degraus.length - 1
					? { ...item, to: `/doacao/${segmentos[1]}` }
					: item,
			),
			{ label: "Etapa" },
		];
	}

	return degraus;
}
