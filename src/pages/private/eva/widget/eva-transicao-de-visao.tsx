import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { EASE_OUT } from "@/lib/easing";

const ORDEM: Record<string, number> = { welcome: 0, chat: 1, ajuda: 2 };

const DESLOCAMENTO = 24;

type EvaTransicaoDeVisaoProps = {
	visao: string;
	children: ReactNode;
};

export function EvaTransicaoDeVisao({
	visao,
	children,
}: EvaTransicaoDeVisaoProps) {
	const reduzirMovimento = useReducedMotion();
	const anterior = useRef(visao);
	const direcao = useRef(1);

	if (anterior.current !== visao) {
		direcao.current =
			(ORDEM[visao] ?? 0) >= (ORDEM[anterior.current] ?? 0) ? 1 : -1;
		anterior.current = visao;
	}

	const passo = reduzirMovimento ? 0 : DESLOCAMENTO;
	const desfoque = reduzirMovimento ? "blur(0px)" : "blur(4px)";

	return (
		<AnimatePresence mode="popLayout" initial={false} custom={direcao.current}>
			<motion.div
				key={visao}
				className="eva-widget-vista"
				custom={direcao.current}
				variants={{
					entrar: (lado: number) => ({
						opacity: 0,
						x: passo * lado,
						filter: desfoque,
					}),
					centro: {
						opacity: 1,
						x: 0,
						filter: "blur(0px)",
						transition: { duration: 0.26, ease: EASE_OUT },
					},
					sair: (lado: number) => ({
						opacity: 0,
						x: -passo * lado,
						filter: desfoque,
						transition: { duration: 0.16, ease: EASE_OUT },
					}),
				}}
				initial="entrar"
				animate="centro"
				exit="sair"
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
