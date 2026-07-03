import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatHeader } from "../components/chat-header";
import { ChatInput } from "../components/chat-input";
import { ChatSidebar } from "../components/chat-sidebar";
import { MessageBubble } from "../components/message-bubble";
import { SiteHeader } from "../components/site-header";
import { TypingIndicator } from "../components/typing-indicator";
import "../eva.css";
import { useIsDesktop } from "../hooks/use-is-desktop";
import type { ChatMessage } from "../types";

const GREETING: ChatMessage = {
	id: "greeting",
	role: "eva",
	paragraphs: [
		"Oi! Eu sou a EVA. Estou aqui a qualquer hora para falar sobre doação de leite, ordenha e amamentação. Como posso te ajudar?",
	],
};

function formatTime(date: Date) {
	return date.toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function EvaChatScreen() {
	const navigate = useNavigate();
	const isDesktop = useIsDesktop();

	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isTyping] = useState(false);
	const [input, setInput] = useState("");
	const [startedAt] = useState(() => formatTime(new Date()));

	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = scrollRef.current;

		if (container) {
			container.scrollTop = container.scrollHeight;
		}
	}, []);

	function sendMessage() {
		const text = input.trim();

		if (!text) {
			return;
		}

		setMessages((previous) => [
			...previous,
			{
				id: `${Date.now()}`,
				role: "nutriz",
				paragraphs: [text],
				time: formatTime(new Date()),
			},
		]);
		setInput("");
	}

	function newConversation() {
		setMessages([]);
		setInput("");
	}

	const datePill = (
		<span className="eva-date-pill">{`Hoje · ${startedAt}`}</span>
	);

	const messageList = (
		<>
			{messages.map((message) => (
				<MessageBubble key={message.id} message={message} desktop={isDesktop} />
			))}
			{isTyping && <TypingIndicator desktop={isDesktop} />}
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
					<ChatSidebar variant="history" onNewConversation={newConversation} />
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
							<ChatHeader desktop onNewConversation={newConversation} />
							<div
								ref={scrollRef}
								role="log"
								aria-live="polite"
								style={{
									flex: 1,
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
							<ChatInput
								desktop
								value={input}
								onChange={setInput}
								onSend={sendMessage}
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
			<div
				ref={scrollRef}
				role="log"
				aria-live="polite"
				style={{
					flex: 1,
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
			<ChatInput
				desktop={false}
				value={input}
				onChange={setInput}
				onSend={sendMessage}
			/>
		</div>
	);
}
