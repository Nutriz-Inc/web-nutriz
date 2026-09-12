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
	sugestoes: readonly string[];
	icones: readonly string[];
};

export const EVA_PERSONAS = {
	anonymous: {
		rotuloDoModo: null,
		descricao: "Tire dúvidas sobre doação de leite, ordenha e amamentação.",
		sugestoes: EVA_SUGGESTIONS,
		icones: ["gota", "brilho", "floco", "agenda"],
	},
	nutriz: {
		rotuloDoModo: null,
		descricao:
			"Tire dúvidas sobre sua doação, ordenha, amamentação ou a plataforma.",
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
