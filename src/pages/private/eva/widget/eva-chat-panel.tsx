import { useCallback, useEffect, useRef, useState } from "react";
import { ChatInput } from "../components/chat-input";
import { MessageBubble } from "../components/message-bubble";
import { RelatorioNoChat } from "../components/relatorio-no-chat";
import { TypingIndicator } from "../components/typing-indicator";
import {
	BLOCKED_MESSAGES,
	CONNECTION_ERROR_MESSAGE,
	EVA_PERSONAS,
} from "../constants";
import "../eva.css";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { env } from "@/config/env";
import { EASE_OUT } from "@/lib/easing";
import type { EvaChat } from "../hooks/use-eva-chat";
import type { ChatMessage, EvaMessageAction } from "../types";
import { EvaActionButton } from "./eva-action-button";
import { EvaIrParaOFim } from "./eva-ir-para-o-fim";
import { useEvaAccess } from "./use-eva-access";

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

const DISTANCIA_PARA_O_ATALHO = 160;

function messageAction(message: ChatMessage): EvaMessageAction | null {
	if (message.role !== "eva") {
		return null;
	}
	if (message.action) {
		return message.action;
	}
	return null;
}

type EvaChatPanelProps = {
	chat: EvaChat;
	onClose: () => void;
};

export function EvaChatPanel({ chat, onClose }: EvaChatPanelProps) {
	const { mode } = useEvaAccess();
	const saudacao: ChatMessage = {
		id: "greeting",
		role: "eva",
		paragraphs: [EVA_PERSONAS[mode].saudacao],
	};

	const {
		messages,
		isTyping,
		isSending,
		etapaAtual,
		status,
		blockedReason,
		errorMessage,
		sendMessage,
		retry,
		reenviarUltima,
		perguntaPendente,
		isAnonymous,
	} = chat;

	const [input, setInput] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);
	const stickToBottomRef = useRef(true);
	const [longeDoFim, setLongeDoFim] = useState(false);
	const [novidade, setNovidade] = useState(false);
	const reduzirMovimento = useReducedMotion();

	const handleScroll = useCallback(() => {
		const container = scrollRef.current;

		if (!container) {
			return;
		}

		const distanceFromBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight;

		stickToBottomRef.current = distanceFromBottom <= AUTO_SCROLL_THRESHOLD;
		setLongeDoFim(distanceFromBottom > DISTANCIA_PARA_O_ATALHO);

		if (stickToBottomRef.current) {
			setNovidade(false);
		}
	}, []);

	const irParaOFim = useCallback(() => {
		const container = scrollRef.current;

		if (!container) {
			return;
		}

		stickToBottomRef.current = true;
		setNovidade(false);
		container.scrollTo({
			top: container.scrollHeight,
			behavior: reduzirMovimento ? "auto" : "smooth",
		});
	}, [reduzirMovimento]);

	useEffect(() => {
		const container = scrollRef.current;

		if (!container || (messages.length === 0 && !isTyping)) {
			return;
		}

		if (stickToBottomRef.current) {
			container.scrollTop = container.scrollHeight;
			return;
		}

		setNovidade(true);
	}, [messages, isTyping]);

	function handleSend() {
		if (sendMessage(input)) {
			stickToBottomRef.current = true;
			setInput("");
		}
	}

	const blocked = blockedReason !== null;
	const inputDisabled = blocked || status === "failed";
	const consentSupportHref =
		blockedReason === "consent" ? buildConsentSupportHref() : null;

	const chaveDoAviso = blocked
		? `bloqueio-${blockedReason}`
		: status === "failed" || errorMessage
			? "falha"
			: status;

	const ultimaResposta = [...messages]
		.reverse()
		.find((message) => message.role === "eva");
	const ultimaRespostaPronta = ultimaResposta?.time
		? ultimaResposta.paragraphs.join(" ")
		: null;

	const podeTentarDeNovo =
		blockedReason === "indisponivel" || (status === "failed" && !blocked);
	const falhouAoResponder =
		!blocked && status === "open" && errorMessage !== null;

	const statusNotice = blocked ? (
		<div className="eva-widget-notice-group" role="alert">
			<p
				className={`eva-widget-notice ${
					blockedReason === "rate_limit" || blockedReason === "consent"
						? "eva-widget-notice--alerta"
						: "eva-widget-notice--erro"
				}`}
			>
				{BLOCKED_MESSAGES[blockedReason]}
				{perguntaPendente ? (
					<span className="eva-widget-notice-pendente">
						Sua pergunta: “{perguntaPendente}”
					</span>
				) : null}
			</p>
			{consentSupportHref ? (
				<a
					href={consentSupportHref}
					target="_blank"
					rel="noopener noreferrer"
					className="eva-outline-btn"
				>
					Falar com o suporte
				</a>
			) : null}
			{blockedReason === "rate_limit" && isAnonymous ? (
				<a href="/registro" className="eva-outline-btn">
					Criar conta
				</a>
			) : null}
			{podeTentarDeNovo ? (
				<button type="button" className="eva-outline-btn" onClick={retry}>
					Tentar novamente
				</button>
			) : null}
		</div>
	) : status === "reconnecting" || status === "connecting" ? (
		<p className="eva-widget-notice eva-widget-notice--info" role="status">
			{status === "reconnecting" ? "Reconectando…" : "Conectando à EVA…"}
		</p>
	) : status === "failed" || errorMessage ? (
		<div className="eva-widget-notice-group" role="alert">
			<p className="eva-widget-notice eva-widget-notice--erro">
				{errorMessage ?? CONNECTION_ERROR_MESSAGE}
				{perguntaPendente ? (
					<span className="eva-widget-notice-pendente">
						Sua pergunta: “{perguntaPendente}”
					</span>
				) : null}
			</p>
			{podeTentarDeNovo ? (
				<button type="button" className="eva-outline-btn" onClick={retry}>
					Tentar novamente
				</button>
			) : null}
			{falhouAoResponder ? (
				<button
					type="button"
					className="eva-outline-btn"
					onClick={() => {
						stickToBottomRef.current = true;
						reenviarUltima();
					}}
				>
					Perguntar de novo
				</button>
			) : null}
		</div>
	) : null;

	return (
		<div className="eva-scope eva-widget-chat">
			<div
				ref={scrollRef}
				onScroll={handleScroll}
				className="eva-widget-scroll"
				role="log"
				aria-live="off"
				aria-label="Conversa com a EVA"
			>
				<span className="eva-date-pill">Hoje</span>
				<MessageBubble message={saudacao} />
				{messages.map((message) => {
					const action = messageAction(message);
					if (!action && !message.relatorio) {
						return <MessageBubble key={message.id} message={message} />;
					}
					return (
						<div key={message.id} className="eva-msg-with-action">
							<MessageBubble message={message} />
							{message.relatorio ? (
								<RelatorioNoChat relatorio={message.relatorio} />
							) : null}
							{action ? (
								<EvaActionButton
									action={action}
									isAnonymous={isAnonymous}
									onNavigate={onClose}
								/>
							) : null}
						</div>
					);
				})}
				<AnimatePresence initial={false}>
					{isTyping ? (
						<TypingIndicator key="digitando" rotulo={etapaAtual} />
					) : null}
				</AnimatePresence>
				<AnimatePresence initial={false}>
					{statusNotice ? (
						<motion.div
							key={chaveDoAviso}
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, transition: { duration: 0.12 } }}
							transition={{ duration: 0.24, ease: EASE_OUT }}
						>
							{statusNotice}
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>

			<p className="sr-only" aria-live="polite">
				{ultimaRespostaPronta ? `EVA respondeu: ${ultimaRespostaPronta}` : ""}
			</p>

			<EvaIrParaOFim
				visivel={longeDoFim}
				novidade={novidade}
				aoClicar={irParaOFim}
			/>

			<div className="eva-widget-input-area">
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
