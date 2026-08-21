import { motion, useReducedMotion } from "framer-motion";
import type { ChatMessage } from "../types";
import { AvatarEva } from "./avatar-eva";

type MessageBubbleProps = {
	message: ChatMessage;
};

/**
 * Bolha de mensagem. A da EVA e rosa claro a esquerda; a da nutriz e rosa
 * escuro a direita, com texto branco (6,6:1 — ver eva.css).
 *
 * A bolha entra subindo alguns pixels, com a origem no lado de quem falou.
 * Com `prefers-reduced-motion` ela simplesmente aparece.
 */
export function MessageBubble({ message }: MessageBubbleProps) {
	const reduzirMovimento = useReducedMotion();
	const daNutriz = message.role === "nutriz";

	const entrada = reduzirMovimento
		? {}
		: {
				initial: { opacity: 0, y: 10, scale: 0.97 },
				animate: { opacity: 1, y: 0, scale: 1 },
				transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
				style: {
					transformOrigin: daNutriz ? "bottom right" : "bottom left",
				},
			};

	if (daNutriz) {
		return (
			<motion.div
				{...entrada}
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-end",
					gap: 5,
					...entrada.style,
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
					<span
						style={{
							fontSize: 12,
							color: "var(--ink-2)",
							paddingRight: 4,
						}}
					>
						{message.time}
					</span>
				)}
			</motion.div>
		);
	}

	const paragraphs = message.paragraphs.map((text, index) => ({
		key: `${message.id}-${index}`,
		text,
	}));

	return (
		<motion.div
			{...entrada}
			style={{
				display: "flex",
				alignItems: "flex-end",
				gap: 8,
				...entrada.style,
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
						border:
							"1px solid color-mix(in oklch, var(--eva) 18%, transparent)",
						borderRadius: "18px 18px 18px 6px",
						padding: "13px 16px",
						fontSize: 15,
						lineHeight: 1.55,
						color: "var(--eva-ink)",
						display: "flex",
						flexDirection: "column",
						gap: 10,
					}}
				>
					{paragraphs.map((paragraph) => (
						<p key={paragraph.key} style={{ margin: 0 }}>
							{paragraph.text}
						</p>
					))}
				</div>
				{message.time && (
					<span style={{ fontSize: 12, color: "var(--ink-2)", paddingLeft: 4 }}>
						{message.time}
					</span>
				)}
			</div>
		</motion.div>
	);
}
