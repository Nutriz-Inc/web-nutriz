import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChatHeader } from "../components/chat-header";
import { ChatInput } from "../components/chat-input";
import { ChatSidebar } from "../components/chat-sidebar";
import { MessageBubble } from "../components/message-bubble";
import { SiteHeader } from "../components/site-header";
import { TypingIndicator } from "../components/typing-indicator";
import "../eva.css";
import { useEvaChat } from "../hooks/use-eva-chat";
import { useIsDesktop } from "../hooks/use-is-desktop";
import type { ChatMessage } from "../types";

const GREETING: ChatMessage = {
	id: "greeting",
	role: "eva",
	paragraphs: [
		"Oi! Eu sou a EVA. Estou aqui a qualquer hora para falar sobre doação de leite, ordenha e amamentação. Como posso te ajudar?",
	],
};

const BLOCKED_MESSAGES = {
	session: "Sessão expirada. Faça login novamente.",
	consent: "É necessário aceitar os termos de uso para conversar com a EVA.",
};

function formatTime(date: Date) {
	return date.toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function EvaChatScreen() {
	const navigate = useNavigate();
	const location = useLocation();
	const isDesktop = useIsDesktop();

	const initialMessageRef = useRef<string | undefined>(
		(location.state as { initialMessage?: string } | null)?.initialMessage,
	);

	const {
		messages,
		isTyping,
		isSending,
		status,
		blockedReason,
		errorMessage,
		sendMessage,
		retry,
		newConversation,
	} = useEvaChat(initialMessageRef.current);

	const [input, setInput] = useState("");
	const [startedAt] = useState(() => formatTime(new Date()));
	const [scrolledUp, setScrolledUp] = useState(false);
	const [hasNewMessage, setHasNewMessage] = useState(false);

	const scrollRef = useRef<HTMLDivElement>(null);
	const scrolledUpRef = useRef(false);

	useEffect(() => {
		if (initialMessageRef.current) {
			navigate(location.pathname, { replace: true });
		}
	}, [navigate, location.pathname]);

	const scrollToBottom = useCallback(() => {
		const container = scrollRef.current;

		if (container) {
			container.scrollTop = container.scrollHeight;
		}

		setHasNewMessage(false);
	}, []);

	useEffect(() => {
		if (scrolledUpRef.current) {
			if (messages.length > 0 || isTyping) {
				setHasNewMessage(true);
			}
			return;
		}

		scrollToBottom();
	}, [messages, isTyping, scrollToBottom]);

	function handleScroll() {
		const container = scrollRef.current;

		if (!container) {
			return;
		}

		const nearBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight <
			80;

		scrolledUpRef.current = !nearBottom;
		setScrolledUp(!nearBottom);

		if (nearBottom) {
			setHasNewMessage(false);
		}
	}

	function handleSend() {
		if (sendMessage(input)) {
			setInput("");
		}
	}

	function startNewConversation() {
		setInput("");
		newConversation();
	}

	const blocked = blockedReason !== null;
	const inputDisabled = blocked || status === "failed";

	const statusNotice = blocked ? (
		<p
			style={{
				margin: 0,
				textAlign: "center",
				fontSize: 13,
				fontWeight: 600,
				color: "#6B6B76",
			}}
		>
			{BLOCKED_MESSAGES[blockedReason]}
		</p>
	) : status === "reconnecting" || status === "connecting" ? (
		<p
			style={{
				margin: 0,
				textAlign: "center",
				fontSize: 13,
				fontWeight: 600,
				color: "#6B6B76",
			}}
		>
			{status === "reconnecting" ? "Reconectando..." : "Conectando..."}
		</p>
	) : status === "failed" || errorMessage ? (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 10,
			}}
		>
			<p
				style={{
					margin: 0,
					textAlign: "center",
					fontSize: 13,
					fontWeight: 600,
					color: "#6B6B76",
				}}
			>
				{errorMessage ?? "Não foi possível conectar à EVA."}
			</p>
			{status === "failed" && (
				<button type="button" className="eva-outline-btn" onClick={retry}>
					Tentar novamente
				</button>
			)}
		</div>
	) : null;

	const newMessageIndicator = hasNewMessage && scrolledUp && (
		<button
			type="button"
			onClick={scrollToBottom}
			className="eva-btn-primary"
			style={{
				position: "absolute",
				bottom: 12,
				left: "50%",
				transform: "translateX(-50%)",
				height: 36,
				padding: "0 16px",
				fontSize: 13,
			}}
		>
			Nova mensagem ↓
		</button>
	);

	const datePill = (
		<span className="eva-date-pill">{`Hoje · ${startedAt}`}</span>
	);

	const messageList = (
		<>
			{messages.map((message) => (
				<MessageBubble key={message.id} message={message} desktop={isDesktop} />
			))}
			{isTyping && <TypingIndicator desktop={isDesktop} />}
			{statusNotice}
		</>
	);

	if (isDesktop) {
		return (
			<div
				className="eva-scope"
				style={{
					height: "100dvh",
					background: "#FFFFFF",
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				}}
			>
				<SiteHeader />
				<div style={{ flex: 1, display: "flex", minHeight: 0 }}>
					<ChatSidebar
						variant="history"
						onNewConversation={startNewConversation}
					/>
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							minHeight: 0,
						}}
					>
						<div
							style={{
								width: 720,
								maxWidth: "100%",
								flex: 1,
								display: "flex",
								flexDirection: "column",
								minHeight: 0,
							}}
						>
							<ChatHeader desktop onNewConversation={startNewConversation} />
							<div style={{ position: "relative", flex: 1, minHeight: 0 }}>
								<div
									ref={scrollRef}
									onScroll={handleScroll}
									role="log"
									aria-live="polite"
									style={{
										height: "100%",
										overflowY: "auto",
										display: "flex",
										flexDirection: "column",
										gap: 20,
										padding: "12px 8px",
									}}
								>
									{datePill}
									<MessageBubble message={GREETING} desktop greeting />
									{messageList}
								</div>
								{newMessageIndicator}
							</div>
							<ChatInput
								desktop
								value={input}
								onChange={setInput}
								onSend={handleSend}
								disabled={inputDisabled}
								sending={isSending}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className="eva-scope"
			style={{
				height: "100dvh",
				background: "#FAF9FB",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
			<ChatHeader desktop={false} onBack={() => navigate("/eva")} />
			<div style={{ position: "relative", flex: 1, minHeight: 0 }}>
				<div
					ref={scrollRef}
					onScroll={handleScroll}
					role="log"
					aria-live="polite"
					style={{
						height: "100%",
						overflowY: "auto",
						display: "flex",
						flexDirection: "column",
						padding: "16px 16px 10px",
					}}
				>
					<div
						style={{
							marginTop: "auto",
							display: "flex",
							flexDirection: "column",
							gap: 13,
						}}
					>
						{datePill}
						{messageList}
					</div>
				</div>
				{newMessageIndicator}
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
