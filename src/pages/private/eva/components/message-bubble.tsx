import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";
import type { ChatMessage } from "../types";
import { AvatarEva } from "./avatar-eva";
import { CopiarMensagem } from "./copiar-mensagem";
import { TextoDaEva } from "./texto-da-eva";

type MessageBubbleProps = {
	message: ChatMessage;
};

const SURGE = {
	initial: { opacity: 0, scale: 0.95, y: 6 },
	animate: { opacity: 1, scale: 1, y: 0 },
	transition: { duration: 0.26, ease: EASE_OUT },
};

export function MessageBubble({ message }: MessageBubbleProps) {
	const semMovimento = useReducedMotion();
	const surge = semMovimento ? {} : SURGE;

	if (message.role === "nutriz") {
		return (
			<motion.div
				{...surge}
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-end",
					gap: 5,
					transformOrigin: "bottom right",
				}}
			>
				<div
					style={{
						maxWidth: "82%",
						background: "var(--eva-bubble-user)",
						borderRadius: "18px 18px 6px 18px",
						padding: "12px 16px",
						fontSize: 15,
						lineHeight: 1.55,
						color: "var(--eva-ink)",
					}}
				>
					{message.paragraphs.join("\n\n")}
				</div>
				{message.time && (
					<span className="eva-msg-time" style={{ paddingRight: 6 }}>
						{message.time}
					</span>
				)}
			</motion.div>
		);
	}

	const texto = message.paragraphs.join("\n\n");

	if (texto.trim() === "") {
		return null;
	}

	return (
		<motion.div
			{...surge}
			style={{
				display: "flex",
				alignItems: "flex-end",
				gap: 8,
				transformOrigin: "bottom left",
			}}
		>
			<AvatarEva size={28} />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 5,
					maxWidth: "82%",
				}}
			>
				<div
					style={{
						background: "var(--eva-bubble-eva)",
						borderRadius: "18px 18px 18px 6px",
						padding: "13px 16px",
						fontSize: 15,
						lineHeight: 1.55,
						color: "var(--eva-ink)",
					}}
				>
					<TextoDaEva texto={texto} />
				</div>
				{message.time && (
					<span className="eva-msg-meta">
						<span className="eva-msg-time" style={{ paddingLeft: 6 }}>
							{message.time}
						</span>
						<CopiarMensagem texto={texto} />
					</span>
				)}
			</div>
		</motion.div>
	);
}
