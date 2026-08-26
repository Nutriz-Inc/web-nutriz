import type { ChatMessage } from "./types";

type PrivateSession = {
	messages: ChatMessage[];
	conversationId: string | null;
};

let privateSession: PrivateSession = { messages: [], conversationId: null };

export function getPrivateSession(): PrivateSession {
	return privateSession;
}

export function savePrivateSession(
	messages: ChatMessage[],
	conversationId: string | null,
): void {
	privateSession = { messages, conversationId };
}

export function clearPrivateSession(): void {
	privateSession = { messages: [], conversationId: null };
}
