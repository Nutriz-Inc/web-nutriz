import type { EvaBlockedReason } from "./types";

export const EVA_CLOSE_CODES = {
	SESSION: 4001,
	CONSENT: 4003,
	FORBIDDEN: 4403,
	JAILBREAK: 4008,
	RATE_LIMIT: 4029,
} as const;

export const TERMINAL_CLOSE_REASONS: Record<
	number,
	Exclude<EvaBlockedReason, null>
> = {
	[EVA_CLOSE_CODES.SESSION]: "session",
	[EVA_CLOSE_CODES.CONSENT]: "consent",
	[EVA_CLOSE_CODES.FORBIDDEN]: "forbidden",
	[EVA_CLOSE_CODES.JAILBREAK]: "jailbreak",
	[EVA_CLOSE_CODES.RATE_LIMIT]: "rate_limit",
};

export const BLOCKED_MESSAGES: Record<
	Exclude<EvaBlockedReason, null>,
	string
> = {
	session: "Sessão expirada. Recarregue a página para conversar novamente.",
	consent:
		"Para conversar com a EVA, seu cadastro precisa ter o aceite dos termos de uso. Se você já aceitou e ainda vê isto, fale com o suporte que a gente resolve.",
	forbidden: "O chat da EVA é exclusivo para nutrizes doadoras.",
	rate_limit:
		"Você atingiu o limite deste chat público. Cadastre-se na Nutriz para um atendimento sem limites.",
	jailbreak: "Sessão encerrada. Recarregue a página para começar de novo.",
};

export const EVA_GREETING_TEXT =
	"Oi! Eu sou a EVA. Estou aqui a qualquer hora para falar sobre doação de leite, ordenha e amamentação. Como posso te ajudar?";

export const EVA_SUGGESTIONS = [
	"Posso doar leite?",
	"Como fazer a ordenha?",
	"Como armazenar o leite?",
	"Como agendar a coleta?",
] as const;

export type EvaPersona = {
	rotuloDoModo: string | null;
	descricao: string;
	saudacao: string;
	sugestoes: readonly string[];
	icones: readonly string[];
};

export const EVA_PERSONAS = {
	anonymous: {
		rotuloDoModo: null,
		descricao: "Tire dúvidas sobre doação de leite, ordenha e amamentação.",
		saudacao: EVA_GREETING_TEXT,
		sugestoes: EVA_SUGGESTIONS,
		icones: ["gota", "brilho", "floco", "agenda"],
	},
	nutriz: {
		rotuloDoModo: null,
		descricao:
			"Tire dúvidas sobre sua doação, ordenha, amamentação ou a plataforma.",
		saudacao: EVA_GREETING_TEXT,
		sugestoes: [
			"Posso doar leite?",
			"Como fazer a ordenha?",
			"Status da minha doação",
			"Pontos de coleta perto de mim",
		],
		icones: ["gota", "brilho", "etapas", "mapa"],
	},
	adm: {
		rotuloDoModo: "Modo operacional",
		descricao:
			"Métricas, indicadores e dúvidas sobre o funcionamento do sistema.",
		saudacao:
			"Olá! Sou a EVA no modo operacional. Posso te ajudar com os indicadores do painel, com o andamento das doações e com dúvidas sobre o sistema. O que você quer ver?",
		sugestoes: [
			"Doações este mês?",
			"Taxa de descarte de frascos?",
			"Rotas ativas hoje?",
			"Gargalos nas etapas?",
		],
		icones: ["grafico", "frasco", "rota", "etapas"],
	},
	nurse: {
		rotuloDoModo: "Modo enfermagem",
		descricao: "Seus agendamentos, procedimentos e dúvidas sobre a plataforma.",
		saudacao:
			"Olá! Sou a EVA no modo enfermagem. Posso te ajudar com os seus agendamentos, com o que cada etapa exige e com os protocolos de coleta e ordenha. Por onde começamos?",
		sugestoes: [
			"Meus agendamentos pendentes?",
			"Como concluir um agendamento?",
			"Protocolo de ordenha",
			"Dúvida sobre uma etapa",
		],
		icones: ["agenda", "check", "guia", "etapas"],
	},
	driver: {
		rotuloDoModo: "Modo motorista",
		descricao: "Sua rota, suas paradas e dúvidas sobre a coleta.",
		saudacao:
			"Olá! Sou a EVA no modo motorista. Posso te ajudar com a sua rota, as paradas, o limite de 6 horas e o que fazer quando algo sai do previsto. O que você precisa?",
		sugestoes: [
			"Minha rota de hoje?",
			"Próxima parada?",
			"Como iniciar a rota?",
			"O frasco está danificado",
		],
		icones: ["rota", "mapa", "relogio", "alerta"],
	},
} as const satisfies Record<string, EvaPersona>;

export const CONNECTION_ERROR_MESSAGE =
	"Não foi possível conectar à EVA. Verifique sua conexão.";

export const GENERIC_ERROR_MESSAGE = "Algo deu errado. Tente novamente.";

export const MAX_RECONNECT_ATTEMPTS = 3;

export type AjudaDaEva = {
	oQuePerguntar: readonly string[];
	oQueNaoFaz: readonly string[];
	dicas: readonly string[];
};

export const EVA_AJUDA: Record<keyof typeof EVA_PERSONAS, AjudaDaEva> = {
	anonymous: {
		oQuePerguntar: [
			"Se você pode doar leite e o que a triagem exige",
			"Como ordenhar, armazenar e transportar com segurança",
			"Como funciona a doação, do exame à análise",
			"Onde ficam os pontos de coleta",
		],
		oQueNaoFaz: [
			"Não vê seus dados: este chat é público e sem cadastro",
			"Não prescreve remédio, dose nem tratamento",
			"Não substitui avaliação médica ou de enfermagem",
		],
		dicas: [
			"Não compartilhe CPF, e-mail ou telefone por aqui",
			"Cadastre-se para um atendimento que conhece a sua doação",
		],
	},
	nutriz: {
		oQuePerguntar: [
			"Em que etapa está a sua doação e o que vem depois",
			"Como ordenhar, armazenar e transportar o leite",
			"Quanto você já doou e desde quando",
			"Qual ponto de coleta fica perto de você",
		],
		oQueNaoFaz: [
			"Não acessa exames, sorologias nem resultados",
			"Não prescreve remédio, dose nem tratamento",
			"Não agenda, cancela nem altera nada por você",
		],
		dicas: [
			"Em emergência, procure atendimento presencial ou ligue 192",
			"Caso clínico é com a equipe Lactare — ela te encaminha",
			"Uma dúvida por vez rende respostas mais claras",
		],
	},
	adm: {
		oQuePerguntar: [
			"Quantos litros foram captados no período",
			"Taxa de descarte e aproveitamento dos frascos",
			"Onde a operação está travando, por etapa",
			"Se a duração média das rotas está dentro das 6 horas",
		],
		oQueNaoFaz: [
			"Não mostra dado individual de nutriz — use o painel",
			"Não acessa exame nem informação clínica de ninguém",
			"Não cria rota, não muda etapa, não cancela doação",
		],
		dicas: [
			"Os números são lidos quando a conversa começa; o painel tem o do minuto",
			"Peça o contexto junto: comparar com o mês anterior rende mais",
			"Se ela diz que não tem o dado, é porque não tem — ela não estima",
		],
	},
	nurse: {
		oQuePerguntar: [
			"Quais agendamentos estão pendentes para você",
			"O que cada etapa exige e o que registrar ao concluir",
			"Protocolos de higiene, ordenha e transporte",
			"Por que existe o limite de 6 horas",
		],
		oQueNaoFaz: [
			"Não mostra agendamento de outro profissional",
			"Não acessa exame, laudo nem o texto clínico da etapa",
			"Não prescreve conduta nem conclui agendamento por você",
		],
		dicas: [
			"Conduta em caso específico é com a coordenação da Lactare",
			"Pergunte pela etapa, não pela pessoa",
			"Dá para consultar durante a visita, é rápido",
		],
	},
	driver: {
		oQuePerguntar: [
			"Qual é a sua rota e quantas paradas faltam",
			"Quanto tempo falta do limite de 6 horas",
			"Qual é a próxima parada e o endereço",
			"O que fazer com frasco danificado ou doadora ausente",
		],
		oQueNaoFaz: [
			"Não mostra rota de outro motorista",
			"Da nutriz, só conhece o endereço da parada",
			"Não inicia, não finaliza e não reagenda nada por você",
		],
		dicas: [
			"Se estiver dirigindo, encoste antes de ler",
			"Uma pergunta por vez: as respostas são curtas de propósito",
			"O cronômetro das 6 horas só começa quando você inicia a rota",
		],
	},
};
