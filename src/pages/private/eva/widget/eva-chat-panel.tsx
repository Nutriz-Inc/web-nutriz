import { useCallback, useEffect, useRef, useState } from "react";
import { ChatInput } from "../components/chat-input";
import { MessageBubble } from "../components/message-bubble";
import { TypingIndicator } from "../components/typing-indicator";
import {
	BLOCKED_MESSAGES,
	CONNECTION_ERROR_MESSAGE,
	EVA_GREETING_TEXT,
	EVA_QUICK_ACTIONS,
} from "../constants";
import "../eva.css";
import { env } from "@/config/env";
import { useEvaChat } from "../hooks/use-eva-chat";
import type { ChatMessage, EvaMessageAction } from "../types";
import { EvaActionButton } from "./eva-action-button";

const GREETING: ChatMessage = {
	id: "greeting",
	role: "eva",
	paragraphs: [EVA_GREETING_TEXT],
};

function buildConsentSupportHref(): string | null {
	const number = env.VITE_LACTARE_WHATSAPP_NUMBER?.trim();
	if (!number) {
		return null;
	}
	const text = encodeURIComponent(
		"Olá! Ao tentar usar a EVA aparece que preciso aceitar os termos de uso, mas não encontro onde. Podem me ajudar?",
	);
	return `https://wa.me/${number}?text=${text}`;
}

const AUTO_SCROLL_THRESHOLD = 48;

function messageAction(
	message: ChatMessage,
	isAnonymous: boolean,
): EvaMessageAction | null {
	if (message.role !== "eva") {
		return null;
	}
	if (message.action) {
		return message.action;
	}
	if (
		isAnonymous &&
		message.paragraphs.join(" ").toLowerCase().includes("cadastr")
	) {
		return { slug: "signup", label: "Criar conta" };
	}
	return null;
}

type EvaChatPanelProps = {
	initialMessage?: string;
	onClose: () => void;
};

export function EvaChatPanel({ initialMessage, onClose }: EvaChatPanelProps) {
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
			stickToBottomRef.current = true;
			setInput("");
		}
	}

	function handleQuickAction(message: string) {
		if (sendMessage(message)) {
			stickToBottomRef.current = true;
		}
	}

	const blocked = blockedReason !== null;
	const inputDisabled = blocked || status === "failed";
	const canQuickAct = status === "open" && !blocked && !isSending;
	const consentSupportHref =
		blockedReason === "consent" ? buildConsentSupportHref() : null;

	const statusNotice = blocked ? (
		blockedReason === "consent" ? (
			<div className="eva-widget-notice-group">
				<p className="eva-widget-notice">{BLOCKED_MESSAGES.consent}</p>
				{consentSupportHref && (
					<a
						href={consentSupportHref}
						target="_blank"
						rel="noopener noreferrer"
						className="eva-outline-btn"
					>
						Falar com o suporte
					</a>
				)}
			</div>
		) : (
			<p className="eva-widget-notice">{BLOCKED_MESSAGES[blockedReason]}</p>
		)
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
				<span className="eva-date-pill">Hoje</span>
				<MessageBubble message={GREETING} />
				{messages.map((message) => {
					const action = messageAction(message, isAnonymous);
					if (!action) {
						return <MessageBubble key={message.id} message={message} />;
					}
					return (
						<div key={message.id} className="eva-msg-with-action">
							<MessageBubble message={message} />
							<EvaActionButton
								action={action}
								isAnonymous={isAnonymous}
								onNavigate={onClose}
							/>
						</div>
					);
				})}
				{isTyping && <TypingIndicator />}
				{statusNotice}
			</div>

			<div className="eva-widget-input-area">
				{canQuickAct && (
					<div className="eva-widget-quick-actions">
						{EVA_QUICK_ACTIONS.map((action) => (
							<button
								key={action.label}
								type="button"
								className="eva-outline-btn eva-quick-chip"
								onClick={() => handleQuickAction(action.message)}
							>
								{action.label}
							</button>
						))}
					</div>
				)}

				<ChatInput
					value={input}
					onChange={setInput}
					onSend={handleSend}
					disabled={inputDisabled}
					sending={isSending}
				/>
				<p className="eva-widget-input-foot">
					A EVA não substitui avaliação médica.
				</p>
			</div>
		</div>
	);
}
