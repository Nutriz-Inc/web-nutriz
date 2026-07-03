import { useCallback, useEffect, useRef, useState } from "react";
import { env } from "../../../../config/env";
import { useAuth } from "../../../../hooks/use-auth";
import type { ChatMessage } from "../types";

const MAX_RECONNECT_ATTEMPTS = 3;

export type EvaChatStatus = "connecting" | "open" | "reconnecting" | "failed";

export type EvaBlockedReason =
	| "session"
	| "consent"
	| "rate_limit"
	| "jailbreak"
	| null;

// Codigos de fechamento terminais do modo publico: nao reconectar, apenas
// exibir o motivo (a mensagem amigavel ja foi transmitida antes do close).
const PUBLIC_TERMINAL_CODES: Record<number, EvaBlockedReason> = {
	4029: "rate_limit",
	4008: "jailbreak",
};

function getEvaToken(authToken?: string) {
	const devToken = env.VITE_EVA_DEV_TOKEN;

	if (devToken) {
		console.warn(
			"EVA: usando VITE_EVA_DEV_TOKEN no lugar do token da sessão (somente desenvolvimento).",
		);
		return devToken;
	}

	return authToken ?? "";
}

async function fetchAnonymousToken(): Promise<string | null> {
	try {
		const response = await fetch(`${env.VITE_EVA_API_URL}/session/anonymous`, {
			method: "POST",
		});

		if (!response.ok) {
			return null;
		}

		const data = (await response.json()) as { token?: string };
		return data.token ?? null;
	} catch {
		return null;
	}
}

function formatTime(date: Date) {
	return date.toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

function splitParagraphs(text: string) {
	const paragraphs = text
		.split("\n\n")
		.map((paragraph) => paragraph.trim())
		.filter((paragraph) => paragraph !== "");

	return paragraphs.length > 0 ? paragraphs : [text];
}

export function useEvaChat(initialMessage?: string) {
	const { auth, isAuthenticated } = useAuth();

	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [status, setStatus] = useState<EvaChatStatus>("connecting");
	const [blockedReason, setBlockedReason] = useState<EvaBlockedReason>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const wsRef = useRef<WebSocket | null>(null);
	const disposedRef = useRef(false);
	const attemptsRef = useRef(0);
	const reconnectTimerRef = useRef<number | null>(null);
	const conversationIdRef = useRef<string | null>(null);
	const streamTextRef = useRef("");
	const streamIdRef = useRef<string | null>(null);
	const sendingRef = useRef(false);
	const pendingInitialRef = useRef(initialMessage ?? null);
	const nextIdRef = useRef(0);
	const tokenRef = useRef(auth?.token);
	// Modo anonimo: sem usuario autenticado. Usa /ws/chat-public com um
	// session token efemero obtido de POST /session/anonymous.
	const isAnonymousRef = useRef(!isAuthenticated);
	const anonTokenRef = useRef<string | null>(null);

	tokenRef.current = auth?.token;
	isAnonymousRef.current = !isAuthenticated;

	const nextId = useCallback(() => {
		nextIdRef.current += 1;
		return `msg-${nextIdRef.current}`;
	}, []);

	const finishSending = useCallback(() => {
		sendingRef.current = false;
		setIsSending(false);
		setIsTyping(false);
	}, []);

	const finalizeStream = useCallback((withTime: boolean) => {
		const streamId = streamIdRef.current;

		if (streamId && streamTextRef.current !== "") {
			const time = withTime ? formatTime(new Date()) : undefined;

			setMessages((previous) =>
				previous.map((message) =>
					message.id === streamId ? { ...message, time } : message,
				),
			);
		}

		streamTextRef.current = "";
		streamIdRef.current = null;
	}, []);

	const sendRaw = useCallback(
		(text: string) => {
			const ws = wsRef.current;

			if (!ws || ws.readyState !== WebSocket.OPEN || sendingRef.current) {
				return false;
			}

			setMessages((previous) => [
				...previous,
				{
					id: nextId(),
					role: "nutriz",
					paragraphs: [text],
					time: formatTime(new Date()),
				},
			]);

			sendingRef.current = true;
			setIsSending(true);
			setIsTyping(true);
			setErrorMessage(null);
			streamTextRef.current = "";
			streamIdRef.current = nextId();

			ws.send(JSON.stringify({ message: text }));

			return true;
		},
		[nextId],
	);

	const connect = useCallback(async () => {
		let wsUrl: string;

		if (isAnonymousRef.current) {
			if (!anonTokenRef.current) {
				anonTokenRef.current = await fetchAnonymousToken();
			}

			// Sessao pode ter sido descartada entre o inicio e o fim do fetch
			if (disposedRef.current) {
				return;
			}

			const anonToken = anonTokenRef.current;

			if (!anonToken) {
				setBlockedReason("session");
				setStatus("failed");
				return;
			}

			wsUrl = `${env.VITE_EVA_WS_URL}/ws/chat-public?token=${encodeURIComponent(anonToken)}`;
		} else {
			const token = getEvaToken(tokenRef.current);

			if (!token) {
				setBlockedReason("session");
				setStatus("failed");
				return;
			}

			wsUrl = `${env.VITE_EVA_WS_URL}/ws/chat?token=${encodeURIComponent(token)}`;
		}

		setStatus(attemptsRef.current > 0 ? "reconnecting" : "connecting");

		const ws = new WebSocket(wsUrl);

		wsRef.current = ws;

		ws.onopen = () => {
			attemptsRef.current = 0;
			setStatus("open");
			setErrorMessage(null);

			const pending = pendingInitialRef.current;

			if (pending) {
				pendingInitialRef.current = null;
				sendRaw(pending);
			}
		};

		ws.onmessage = (event) => {
			let frame: {
				type?: string;
				conversation_id?: string;
				content?: string;
				message?: string;
			};

			try {
				frame = JSON.parse(event.data);
			} catch {
				return;
			}

			switch (frame.type) {
				case "conversation": {
					conversationIdRef.current = frame.conversation_id ?? null;
					break;
				}
				case "chunk": {
					const streamId = streamIdRef.current;

					if (!streamId) {
						break;
					}

					streamTextRef.current += frame.content ?? "";

					const paragraphs = splitParagraphs(streamTextRef.current);

					setIsTyping(false);
					setMessages((previous) => {
						const exists = previous.some((message) => message.id === streamId);

						if (exists) {
							return previous.map((message) =>
								message.id === streamId ? { ...message, paragraphs } : message,
							);
						}

						return [...previous, { id: streamId, role: "eva", paragraphs }];
					});
					break;
				}
				case "done": {
					finalizeStream(true);
					finishSending();
					break;
				}
				case "error": {
					finalizeStream(true);
					finishSending();
					setErrorMessage(frame.message ?? "Algo deu errado. Tente novamente.");
					break;
				}
			}
		};

		ws.onclose = (event) => {
			if (disposedRef.current || wsRef.current !== ws) {
				return;
			}

			finalizeStream(true);
			finishSending();

			if (event.code === 4001) {
				setBlockedReason("session");
				setStatus("failed");
				return;
			}

			if (event.code === 4003) {
				setBlockedReason("consent");
				setStatus("failed");
				return;
			}

			// Encerramentos terminais do modo publico (rate limit / jailbreak):
			// a mensagem amigavel ja chegou como chunk; nao reconectar.
			const terminalReason = PUBLIC_TERMINAL_CODES[event.code];

			if (terminalReason) {
				setBlockedReason(terminalReason);
				setStatus("failed");
				return;
			}

			if (attemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
				setStatus("failed");
				setErrorMessage(
					"Não foi possível conectar à EVA. Verifique sua conexão.",
				);
				return;
			}

			attemptsRef.current += 1;
			setStatus("reconnecting");

			reconnectTimerRef.current = window.setTimeout(
				connect,
				1000 * 2 ** (attemptsRef.current - 1),
			);
		};
	}, [finalizeStream, finishSending, sendRaw]);

	useEffect(() => {
		disposedRef.current = false;
		attemptsRef.current = 0;
		connect();

		return () => {
			disposedRef.current = true;

			if (reconnectTimerRef.current !== null) {
				window.clearTimeout(reconnectTimerRef.current);
			}

			wsRef.current?.close(1000);
			wsRef.current = null;
		};
	}, [connect]);

	const sendMessage = useCallback(
		(text: string) => {
			const trimmed = text.trim();

			if (!trimmed) {
				return false;
			}

			return sendRaw(trimmed);
		},
		[sendRaw],
	);

	const retry = useCallback(() => {
		attemptsRef.current = 0;
		setErrorMessage(null);
		setBlockedReason(null);
		connect();
	}, [connect]);

	const newConversation = useCallback(() => {
		disposedRef.current = true;

		if (reconnectTimerRef.current !== null) {
			window.clearTimeout(reconnectTimerRef.current);
		}

		wsRef.current?.close(1000);
		wsRef.current = null;

		conversationIdRef.current = null;
		streamTextRef.current = "";
		streamIdRef.current = null;
		attemptsRef.current = 0;
		// Nova conversa anonima = nova sessao (novo session token e session_id)
		anonTokenRef.current = null;

		setMessages([]);
		setErrorMessage(null);
		setBlockedReason(null);
		finishSending();

		disposedRef.current = false;
		connect();
	}, [connect, finishSending]);

	return {
		messages,
		isTyping,
		isSending,
		status,
		blockedReason,
		errorMessage,
		sendMessage,
		retry,
		newConversation,
		isAnonymous: !isAuthenticated,
	};
}
