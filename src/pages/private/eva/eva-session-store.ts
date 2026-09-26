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

type AnonymousSession = {
	messages: ChatMessage[];
	token: string | null;
};

let anonymousSession: AnonymousSession = { messages: [], token: null };

export function getAnonymousSession(): AnonymousSession {
	return anonymousSession;
}

export function saveAnonymousSession(
	messages: ChatMessage[],
	token: string | null,
): void {
	anonymousSession = { messages, token };
}

export function clearPrivateSession(): void {
	privateSession = { messages: [], conversationId: null };
}
