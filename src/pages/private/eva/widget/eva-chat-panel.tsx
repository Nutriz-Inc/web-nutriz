import { useEffect, useRef, useState } from "react";
import { ChatInput } from "../components/chat-input";
import { MessageBubble } from "../components/message-bubble";
import { TypingIndicator } from "../components/typing-indicator";
import "../eva.css";
import { useEvaChat } from "../hooks/use-eva-chat";
import type { ChatMessage } from "../types";

const GREETING: ChatMessage = {
	id: "greeting",
	role: "eva",
	paragraphs: [
		"Oi! Eu sou a EVA. Estou aqui a qualquer hora para falar sobre doação de leite, ordenha e amamentação. Como posso te ajudar?",
	],
};

const BLOCKED_MESSAGES: Record<string, string> = {
	session: "Sessão expirada. Recarregue a página para conversar novamente.",
	consent: "É necessário aceitar os termos de uso para conversar com a EVA.",
	rate_limit:
		"Você atingiu o limite deste chat público. Cadastre-se na Nutriz para um atendimento sem limites.",
	jailbreak: "Sessão encerrada. Recarregue a página para começar de novo.",
};

type EvaChatPanelProps = {
	initialMessage?: string;
};

export function EvaChatPanel({ initialMessage }: EvaChatPanelProps) {
	// Persistencia MVP: nutriz logada NAO persiste em localStorage (dado sensivel
	// de saude; o backend ja grava conversation/message para auditoria). Ao
	// recarregar, o chat reinicia limpo na UI. Anonimo vive so em memoria.
	// TODO: carregar historico via GET /conversations quando o endpoint existir.
	const {
		messages,
		isTyping,
		isSending,
		status,
		blockedReason,
		errorMessage,
		sendMessage,
		retry,
	} = useEvaChat(initialMessage);

	const [input, setInput] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);

	// Rola para o fim a cada nova mensagem / mudanca no indicador de digitacao.
	useEffect(() => {
		const container = scrollRef.current;

		if (!container || (messages.length === 0 && !isTyping)) {
			return;
		}

		container.scrollTop = container.scrollHeight;
	}, [messages, isTyping]);

	function handleSend() {
		if (sendMessage(input)) {
			setInput("");
		}
	}

	const blocked = blockedReason !== null;
	const inputDisabled = blocked || status === "failed";

	const statusNotice = blocked ? (
		<p className="eva-widget-notice">{BLOCKED_MESSAGES[blockedReason]}</p>
	) : status === "reconnecting" || status === "connecting" ? (
		<p className="eva-widget-notice">
			{status === "reconnecting" ? "Reconectando..." : "Conectando..."}
		</p>
	) : status === "failed" || errorMessage ? (
		<div className="eva-widget-notice-group">
			<p className="eva-widget-notice">
				{errorMessage ?? "Não foi possível conectar à EVA."}
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
				className="eva-widget-scroll"
				role="log"
				aria-live="polite"
			>
				<MessageBubble message={GREETING} desktop={false} />
				{messages.map((message) => (
					<MessageBubble key={message.id} message={message} desktop={false} />
				))}
				{isTyping && <TypingIndicator desktop={false} />}
				{statusNotice}
			</div>
			<ChatInput
				desktop={false}
				value={input}
				onChange={setInput}
				onSend={handleSend}
				disabled={inputDisabled}
				sending={isSending}
			/>
		</div>
	);
}
