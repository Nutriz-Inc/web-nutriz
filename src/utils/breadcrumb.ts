import type { EnumUserType } from "@/services/types/i-user";
import { getHome } from "@/utils/routes";

export type BreadcrumbItem = {
	label: string;
	/** Sem `to`, o item e o atual (nao clicavel). */
	to?: string;
};

// Telas de primeiro nivel: rota exata -> rotulo.
const TELAS: Record<string, string> = {
	"/home": "Início",
	"/minhas-doacoes": "Minhas doações",
	"/pontos-de-coleta": "Pontos de coleta",
	"/conteudo-educativo": "Conteúdo educativo",
	"/perfil": "Perfil",
	"/nova-doacao": "Nova doação",
	"/agendamentos": "Meus agendamentos",
	"/gestao-doacoes": "Gestão de doações",
	"/usuarios": "Usuários",
	"/dashboard": "Dashboard",
};

/**
 * Primeiro degrau da trilha. Nao existe uma home unica no app: `/home` so
 * existe para a nutriz, entao adm e enfermeira caiam num link quebrado. Cada
 * perfil comeca a trilha pela propria tela inicial (a mesma de `getHome`).
 */
function getRaiz(userType?: EnumUserType): BreadcrumbItem {
	const to = getHome(userType);

	return { label: TELAS[to] ?? "Início", to };
}

// Telas de detalhe: primeiro segmento -> trilha ate ela. O ultimo item ganha
// o rotulo generico porque o id da rota nao e legivel para a nutriz.
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

/**
 * Trilha da rota atual. Retorna lista vazia quando nao ha o que mostrar:
 * a propria tela inicial do perfil (a trilha seria so um item) e rotas
 * desconhecidas, como as telas publicas, que seguem com o botao "Voltar".
 */
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

	// A trilha de detalhe ja pode comecar na propria raiz do perfil (adm
	// entrando em /gestao-doacoes/:id): nesse caso o degrau nao se repete.
	const degraus =
		trilha[0]?.to === raiz.to ? [raiz, ...trilha.slice(1)] : [raiz, ...trilha];

	// /doacao/:id/etapa/:id ganha mais um degrau.
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
