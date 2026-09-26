import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/lib/easing";
import { copiarTexto } from "../copiar-texto";

const TEMPO_DO_CHECK = 1600;

type CopiarMensagemProps = {
	texto: string;
};

export function CopiarMensagem({ texto }: CopiarMensagemProps) {
	const reduzirMovimento = useReducedMotion();
	const [copiado, setCopiado] = useState(false);
	const relogio = useRef<number | undefined>(undefined);

	useEffect(() => () => window.clearTimeout(relogio.current), []);

	async function copiar() {
		if (!(await copiarTexto(texto))) {
			return;
		}

		setCopiado(true);
		window.clearTimeout(relogio.current);
		relogio.current = window.setTimeout(
			() => setCopiado(false),
			TEMPO_DO_CHECK,
		);
	}

	const troca = reduzirMovimento
		? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
		: {
				initial: { opacity: 0, scale: 0.6, filter: "blur(3px)" },
				animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
				exit: { opacity: 0, scale: 0.6, filter: "blur(3px)" },
			};

	return (
		<button
			type="button"
			className="eva-copiar"
			onClick={copiar}
			aria-label={copiado ? "Resposta copiada" : "Copiar resposta"}
			data-copiado={copiado || undefined}
		>
			<AnimatePresence mode="popLayout" initial={false}>
				<motion.span
					key={copiado ? "check" : "copiar"}
					className="eva-copiar-icone"
					transition={{ duration: 0.18, ease: EASE_OUT }}
					{...troca}
				>
					{copiado ? (
						<Check size={14} strokeWidth={2.2} aria-hidden="true" />
					) : (
						<Copy size={13} strokeWidth={1.8} aria-hidden="true" />
					)}
				</motion.span>
			</AnimatePresence>
			<span aria-live="polite" className="sr-only">
				{copiado ? "Copiada" : ""}
			</span>
		</button>
	);
}
