import {
	animate,
	motion,
	useMotionValue,
	useReducedMotion,
} from "framer-motion";
import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BackdropTone } from "@/hooks/use-backdrop-tone";

const TAMANHO = 60;
const RECUO = 20;
const MARGEM = 12;
const DISTANCIA_MINIMA = 4;

type EvaFabProps = {
	botaoRef: RefObject<HTMLButtonElement | null>;
	tom: BackdropTone;
	oculto: boolean;
	aberto: boolean;
	aoAbrir: () => void;
};

export function EvaFab({
	botaoRef,
	tom,
	oculto,
	aberto,
	aoAbrir,
}: EvaFabProps) {
	const reduzirMovimento = useReducedMotion();
	const [temHover] = useState(
		() => window.matchMedia?.("(hover: hover)").matches ?? false,
	);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const esticar = useMotionValue(1);
	const achatar = useMotionValue(1);
	const arrastou = useRef(false);
	const voltando = useRef(false);
	const [limites, setLimites] = useState({
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	});

	useEffect(() => {
		function medir() {
			setLimites({
				left: -Math.max(0, window.innerWidth - TAMANHO - RECUO - MARGEM),
				right: 0,
				top: -Math.max(0, window.innerHeight - TAMANHO - RECUO - MARGEM),
				bottom: 0,
			});
		}

		medir();
		window.addEventListener("resize", medir);
		return () => window.removeEventListener("resize", medir);
	}, []);

	useEffect(() => {
		x.set(Math.min(0, Math.max(limites.left, x.get())));
		y.set(Math.min(0, Math.max(limites.top, y.get())));
	}, [limites, x, y]);

	const voltarParaCasa = useCallback(async () => {
		if (voltando.current) {
			return;
		}

		const deslocamentoX = x.get();
		const deslocamentoY = y.get();
		const distancia = Math.hypot(deslocamentoX, deslocamentoY);

		if (reduzirMovimento || distancia < DISTANCIA_MINIMA) {
			x.set(0);
			y.set(0);
			aoAbrir();
			return;
		}

		voltando.current = true;

		const noEixoX = Math.abs(deslocamentoX) >= Math.abs(deslocamentoY);
		const intensidade = Math.min(0.34, distancia / 900);
		const estica = 1 + intensidade;
		const achata = 1 - intensidade * 0.7;
		const quadros = [1, estica, achata, 1.05, 1];
		const contraQuadros = [1, achata, estica, 0.97, 1];
		const tempos = [0, 0.26, 0.6, 0.83, 1];
		const mola = {
			type: "spring" as const,
			stiffness: 260,
			damping: 32,
			mass: 0.8,
		};
		const distorcao = {
			duration: 0.6,
			times: tempos,
			ease: "easeOut" as const,
		};

		await Promise.all([
			animate(x, 0, mola),
			animate(y, 0, mola),
			animate(noEixoX ? esticar : achatar, quadros, distorcao),
			animate(noEixoX ? achatar : esticar, contraQuadros, distorcao),
		]);

		voltando.current = false;
		aoAbrir();
	}, [achatar, aoAbrir, esticar, reduzirMovimento, x, y]);

	return (
		<motion.button
			ref={botaoRef}
			type="button"
			drag={!reduzirMovimento}
			dragMomentum={false}
			dragElastic={0.06}
			dragConstraints={limites}
			style={{ x, y, scaleX: esticar, scaleY: achatar }}
			whileHover={reduzirMovimento || !temHover ? undefined : { scale: 1.05 }}
			whileTap={reduzirMovimento ? undefined : { scale: 0.95 }}
			onDragStart={() => {
				arrastou.current = true;
				animate(esticar, 1.06, { duration: 0.18 });
				animate(achatar, 1.06, { duration: 0.18 });
			}}
			onDragEnd={() => {
				animate(esticar, 1, { duration: 0.24 });
				animate(achatar, 1, { duration: 0.24 });
				window.setTimeout(() => {
					arrastou.current = false;
				}, 140);
			}}
			onClick={() => {
				if (arrastou.current) {
					return;
				}

				voltarParaCasa();
			}}
			className={oculto ? "eva-fab eva-fab--oculto" : "eva-fab"}
			data-fundo={tom}
			aria-haspopup="dialog"
			aria-expanded={aberto}
			aria-label="Abrir chat com a EVA"
		>
			<span className="eva-fab-mark" aria-hidden="true">
				<span className="eva-fab-mark-cor eva-fab-mark-cor--forte" />
				<span className="eva-fab-mark-cor eva-fab-mark-cor--clara" />
			</span>
		</motion.button>
	);
}
