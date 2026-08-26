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
