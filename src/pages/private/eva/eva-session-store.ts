import type { ChatMessage } from "./types";

// Preserva a conversa da nutriz LOGADA em memoria enquanto a pagina esta
// aberta: fechar e reabrir o widget nao perde as mensagens. Reseta no reload
// (o modulo zera). NAO usa localStorage - conversa de saude e dado sensivel que
// nao deve persistir no dispositivo (mesma decisao de produto ja documentada).
// O modo anonimo nao usa este store (cada abertura e uma nova sessao).

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
