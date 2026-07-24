import type { EvaBlockedReason } from "./types";

// Close codes reais do nutriz-ia-service (ver chat_ws.py):
// 4001 token ausente/invalido · 4003 consent LGPD ausente ·
// 4403 papel sem acesso (adm/nurse) · 4008 limite de jailbreak ·
// 4029 rate limit do modo publico.
export const EVA_CLOSE_CODES = {
	SESSION: 4001,
	CONSENT: 4003,
	FORBIDDEN: 4403,
	JAILBREAK: 4008,
	RATE_LIMIT: 4029,
} as const;

// Encerramentos terminais: nao reconectar, apenas exibir o motivo.
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
	consent: "É necessário aceitar os termos de uso para conversar com a EVA.",
	forbidden: "O chat da EVA é exclusivo para nutrizes doadoras.",
	rate_limit:
		"Você atingiu o limite deste chat público. Cadastre-se na Nutriz para um atendimento sem limites.",
	jailbreak: "Sessão encerrada. Recarregue a página para começar de novo.",
};

export const EVA_GREETING_TEXT =
	"Oi! Eu sou a EVA. Estou aqui a qualquer hora para falar sobre doação de leite, ordenha e amamentação. Como posso te ajudar?";

export const CONNECTION_ERROR_MESSAGE =
	"Não foi possível conectar à EVA. Verifique sua conexão.";

export const GENERIC_ERROR_MESSAGE = "Algo deu errado. Tente novamente.";

export const REGISTER_CTA_TEXT =
	"Cadastre-se na Nutriz para um atendimento personalizado";

export const MAX_RECONNECT_ATTEMPTS = 3;
