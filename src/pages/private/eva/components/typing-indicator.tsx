import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";
import { AvatarEva } from "./avatar-eva";

type TypingIndicatorProps = {
	rotulo?: string | null;
};

export function TypingIndicator({ rotulo }: TypingIndicatorProps) {
	const reduzirMovimento = useReducedMotion();
	const deslocar = reduzirMovimento ? 0 : 6;

	return (
		<motion.div
			initial={{ opacity: 0, y: deslocar, scale: reduzirMovimento ? 1 : 0.96 }}
			animate={{
				opacity: 1,
				y: 0,
				scale: 1,
				transition: { duration: 0.24, ease: EASE_OUT },
			}}
			exit={{
				opacity: 0,
				scale: reduzirMovimento ? 1 : 0.96,
				transition: { duration: 0.12, ease: EASE_OUT },
			}}
			style={{
				display: "flex",
				alignItems: "flex-end",
				gap: 8,
				transformOrigin: "bottom left",
			}}
		>
			<AvatarEva size={28} pulse resposta />
			<motion.div
				layout={!reduzirMovimento}
				aria-label={rotulo ?? "EVA está digitando"}
				role="status"
				transition={{ duration: 0.22, ease: EASE_OUT }}
				style={{
					background: "var(--eva-bubble-eva)",
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
				<AnimatePresence mode="popLayout" initial={false}>
					{rotulo ? (
						<motion.span
							key={rotulo}
							className="eva-typing-rotulo"
							initial={{ opacity: 0, filter: "blur(3px)" }}
							animate={{ opacity: 1, filter: "blur(0px)" }}
							exit={{ opacity: 0, filter: "blur(3px)" }}
							transition={{ duration: 0.2, ease: EASE_OUT }}
						>
							{rotulo}…
						</motion.span>
					) : null}
				</AnimatePresence>
			</motion.div>
		</motion.div>
	);
}
