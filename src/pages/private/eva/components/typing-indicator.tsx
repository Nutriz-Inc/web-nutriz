import { motion, useReducedMotion } from "framer-motion";
import { AvatarEva } from "./avatar-eva";

/**
 * "A EVA esta digitando": avatar com pulso e tres pontinhos que sobem em
 * cascata (a animacao vive em eva.css e para com `prefers-reduced-motion`).
 */
export function TypingIndicator() {
	const reduzirMovimento = useReducedMotion();

	const entrada = reduzirMovimento
		? {}
		: {
				initial: { opacity: 0, y: 8 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0 },
				transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const },
			};

	return (
		<motion.div
			{...entrada}
			style={{ display: "flex", alignItems: "flex-end", gap: 8 }}
		>
			<AvatarEva size={28} pulse />
			<div
				aria-label="EVA está digitando"
				role="status"
				style={{
					background: "var(--eva-bubble-eva)",
					border: "1px solid var(--line-strong)",
					borderRadius: "18px 18px 18px 6px",
					padding: "15px 16px",
					display: "flex",
					gap: 5,
					alignItems: "center",
				}}
			>
				<span className="eva-typing-dot" />
				<span className="eva-typing-dot" />
				<span className="eva-typing-dot" />
			</div>
		</motion.div>
	);
}
