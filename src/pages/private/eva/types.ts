export type EvaMessageAction = {
	slug: string;
	label: string;
};

export type ColunaDoRelatorio = {
	chave: string;
	rotulo: string;
};

export type RelatorioDaEva = {
	titulo: string;
	periodo: string | null;
	gerado_em: string;
	colunas: ColunaDoRelatorio[];
	linhas: Record<string, unknown>[];
	resumo: { rotulo: string; valor: unknown }[];
};

export type ChatMessage = {
	id: string;
	role: "eva" | "nutriz";
	paragraphs: string[];
	time?: string;
	action?: EvaMessageAction;
	relatorio?: RelatorioDaEva;
};

export type EvaSocketFrame = {
	type?:
		| "conversation"
		| "chunk"
		| "done"
		| "error"
		| "action"
		| "mode"
		| "status"
		| "report";
	report?: RelatorioDaEva;
	conversation_id?: string;
	content?: string;
	code?: string;
	message?: string;
	action?: string;
	label?: string;
};

export type EvaChatStatus = "connecting" | "open" | "reconnecting" | "failed";

export type EvaBlockedReason =
	| "session"
	| "consent"
	| "forbidden"
	| "rate_limit"
	| "jailbreak"
	| null;
