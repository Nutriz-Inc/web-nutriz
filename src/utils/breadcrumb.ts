export type BreadcrumbItem = {
	label: string;
	/** Sem `to`, o item e o atual (nao clicavel). */
	to?: string;
};

const RAIZ: BreadcrumbItem = { label: "Início", to: "/home" };

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
 * a propria home (a trilha seria so "Início") e rotas desconhecidas, como as
 * telas publicas, que seguem com o botao "Voltar".
 */
export function getBreadcrumb(pathname: string): BreadcrumbItem[] {
	const limpo = pathname.replace(/\/+$/, "") || "/";

	if (limpo === "/home") {
		return [];
	}

	const rotuloDireto = TELAS[limpo];
	if (rotuloDireto) {
		return [RAIZ, { label: rotuloDireto }];
	}

	const segmentos = limpo.split("/").filter(Boolean);
	const trilha = DETALHES[segmentos[0] ?? ""];
	if (!trilha) {
		return [];
	}

	// /doacao/:id/etapa/:id ganha mais um degrau.
	if (segmentos.includes("etapa")) {
		return [
			RAIZ,
			...trilha.map((item, i) =>
				i === trilha.length - 1
					? { ...item, to: `/doacao/${segmentos[1]}` }
					: item,
			),
			{ label: "Etapa" },
		];
	}

	return [RAIZ, ...trilha];
}
