export type ChatMessage = {
	id: string;
	role: "eva" | "nutriz";
	paragraphs: string[];
	time?: string;
};

// Protocolo do WebSocket do nutriz-ia-service (frames de /ws/chat e
// /ws/chat-public), declarado uma unica vez e reutilizado no hook.
export type EvaSocketFrame = {
	type?: "conversation" | "chunk" | "done" | "error";
	conversation_id?: string;
	content?: string;
	code?: string;
	message?: string;
};

export type EvaChatStatus = "connecting" | "open" | "reconnecting" | "failed";

export type EvaBlockedReason =
	| "session"
	| "consent"
	| "forbidden"
	| "rate_limit"
	| "jailbreak"
	| null;
