import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { EASE_OUT } from "@/lib/easing";

type EvaIrParaOFimProps = {
	visivel: boolean;
	novidade: boolean;
	aoClicar: () => void;
};

export function EvaIrParaOFim({
	visivel,
	novidade,
	aoClicar,
}: EvaIrParaOFimProps) {
	const reduzirMovimento = useReducedMotion();

	return (
		<AnimatePresence initial={false}>
			{visivel ? (
				<motion.button
					key="ir-para-o-fim"
					type="button"
					className="eva-ir-para-o-fim"
					onClick={aoClicar}
					aria-label={
						novidade ? "Ver resposta nova" : "Ir para a última mensagem"
					}
					initial={{
						opacity: 0,
						y: reduzirMovimento ? 0 : 8,
						scale: reduzirMovimento ? 1 : 0.9,
					}}
					animate={{
						opacity: 1,
						y: 0,
						scale: 1,
						transition: { duration: 0.22, ease: EASE_OUT },
					}}
					exit={{
						opacity: 0,
						scale: reduzirMovimento ? 1 : 0.9,
						transition: { duration: 0.14, ease: EASE_OUT },
					}}
				>
					<ArrowDown size={17} strokeWidth={2} aria-hidden="true" />
					<AnimatePresence initial={false}>
						{novidade ? (
							<motion.span
								key="novidade"
								className="eva-ir-para-o-fim-ponto"
								initial={{ opacity: 0, scale: 0.6 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.6 }}
								transition={{ duration: 0.18, ease: EASE_OUT }}
							/>
						) : null}
					</AnimatePresence>
				</motion.button>
			) : null}
		</AnimatePresence>
	);
}
