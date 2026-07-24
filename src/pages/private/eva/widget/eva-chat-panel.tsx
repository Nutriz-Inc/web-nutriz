import { useCallback, useEffect, useRef, useState } from "react";
import { ChatInput } from "../components/chat-input";
import { MessageBubble } from "../components/message-bubble";
import { TypingIndicator } from "../components/typing-indicator";
import {
	BLOCKED_MESSAGES,
	CONNECTION_ERROR_MESSAGE,
	EVA_GREETING_TEXT,
	REGISTER_CTA_TEXT,
} from "../constants";
import "../eva.css";
import { useEvaChat } from "../hooks/use-eva-chat";
import type { ChatMessage } from "../types";

const GREETING: ChatMessage = {
	id: "greeting",
	role: "eva",
	paragraphs: [EVA_GREETING_TEXT],
};

// Margem (px) do fim da area de mensagens dentro da qual o usuario ainda e
// considerado "acompanhando" o streaming - so entao o auto-scroll atua.
const AUTO_SCROLL_THRESHOLD = 48;

type EvaChatPanelProps = {
	initialMessage?: string;
};

export function EvaChatPanel({ initialMessage }: EvaChatPanelProps) {
	// Persistencia MVP: nutriz logada NAO persiste em localStorage (dado sensivel
	// de saude; o backend ja grava conversation/message para auditoria). Ao
	// recarregar, o chat reinicia limpo na UI. Anonimo vive so em memoria.
	// TODO: exibir historico consumindo o GET /conversations do IA service
	// quando a UI de historico for definida com o produto.
	const {
		messages,
		isTyping,
		isSending,
		status,
		blockedReason,
		errorMessage,
		sendMessage,
		retry,
		isAnonymous,
	} = useEvaChat(initialMessage);

	const [input, setInput] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);
	// Auto-scroll so quando o usuario esta perto do fim; rolar para cima para
	// reler uma resposta nao pode ser desfeito pelo streaming.
	const stickToBottomRef = useRef(true);

	const handleScroll = useCallback(() => {
		const container = scrollRef.current;

		if (!container) {
			return;
		}

		const distanceFromBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight;

		stickToBottomRef.current = distanceFromBottom <= AUTO_SCROLL_THRESHOLD;
	}, []);

	useEffect(() => {
		const container = scrollRef.current;

		if (!container || (messages.length === 0 && !isTyping)) {
			return;
		}

		if (stickToBottomRef.current) {
			container.scrollTop = container.scrollHeight;
		}
	}, [messages, isTyping]);

	function handleSend() {
		if (sendMessage(input)) {
			// Enviar mensagem devolve a visao para o fim, mesmo que a nutriz
			// estivesse relendo algo acima.
			stickToBottomRef.current = true;
			setInput("");
		}
	}

	const blocked = blockedReason !== null;
	const inputDisabled = blocked || status === "failed";

	// O prompt do modo publico sugere cadastro apos algumas mensagens; quando a
	// EVA fala em cadastro, o front destaca o CTA sem bloquear a conversa.
	const showRegisterCta =
		isAnonymous &&
		!blocked &&
		messages.some(
			(message) =>
				message.role === "eva" &&
				message.paragraphs.join(" ").toLowerCase().includes("cadastr"),
		);

	const statusNotice = blocked ? (
		<p className="eva-widget-notice">{BLOCKED_MESSAGES[blockedReason]}</p>
	) : status === "reconnecting" || status === "connecting" ? (
		<p className="eva-widget-notice">
			{status === "reconnecting" ? "Reconectando..." : "Conectando..."}
		</p>
	) : status === "failed" || errorMessage ? (
		<div className="eva-widget-notice-group">
			<p className="eva-widget-notice">
				{errorMessage ?? CONNECTION_ERROR_MESSAGE}
			</p>
			{status === "failed" && !blocked && (
				<button type="button" className="eva-outline-btn" onClick={retry}>
					Tentar novamente
				</button>
			)}
		</div>
	) : null;

	return (
		<div className="eva-scope eva-widget-chat">
			<div
				ref={scrollRef}
				onScroll={handleScroll}
				className="eva-widget-scroll"
				role="log"
				aria-live="polite"
			>
				<MessageBubble message={GREETING} />
				{messages.map((message) => (
					<MessageBubble key={message.id} message={message} />
				))}
				{isTyping && <TypingIndicator />}
				{statusNotice}
			</div>
			{showRegisterCta && (
				<a className="eva-widget-register-cta" href="/registro">
					{REGISTER_CTA_TEXT}
				</a>
			)}
			<ChatInput
				value={input}
				onChange={setInput}
				onSend={handleSend}
				disabled={inputDisabled}
				sending={isSending}
			/>
		</div>
	);
}
