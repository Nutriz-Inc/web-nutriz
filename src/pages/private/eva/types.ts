// Acao contextual que o backend anexa a uma resposta (frame "action").
// O slug vem do servidor mas so e usado se estiver no catalogo fechado do
// front (ver eva-action-button); label e o texto do botao.
export type EvaMessageAction = {
	slug: string;
	label: string;
};

export type ChatMessage = {
	id: string;
	role: "eva" | "nutriz";
	paragraphs: string[];
	time?: string;
	action?: EvaMessageAction;
};

// Protocolo do WebSocket do nutriz-ia-service (frames de /ws/chat e
// /ws/chat-public), declarado uma unica vez e reutilizado no hook.
export type EvaSocketFrame = {
	type?: "conversation" | "chunk" | "done" | "error" | "action";
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
