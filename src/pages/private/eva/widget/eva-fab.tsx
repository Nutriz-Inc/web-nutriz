import {
	animate,
	motion,
	useMotionValue,
	useMotionValueEvent,
	useReducedMotion,
	useVelocity,
} from "framer-motion";
import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BackdropTone } from "@/hooks/use-backdrop-tone";

const TAMANHO = 60;
const RECUO = 20;
const MARGEM = 12;
const DISTANCIA_MINIMA = 4;
const REDONDO = "50% 50% 50% 50% / 50% 50% 50% 50%";
const FORMAS_DE_BLOB = [
	REDONDO,
	"58% 42% 55% 45% / 45% 58% 42% 55%",
	"42% 58% 45% 55% / 58% 44% 56% 42%",
	"55% 45% 40% 60% / 42% 55% 45% 58%",
	REDONDO,
];
const MOLA_MOLE = {
	type: "spring" as const,
	stiffness: 380,
	damping: 11,
	mass: 0.55,
};
const MOLA_RIGIDA = {
	type: "spring" as const,
	stiffness: 900,
	damping: 42,
	mass: 0.6,
};
const SUAVE = [0.65, 0, 0.35, 1] as const;

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
	const forma = useMotionValue(REDONDO);
	const velocidadeX = useVelocity(x);
	const velocidadeY = useVelocity(y);
	const arrastando = useRef(false);
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

	const deformarPelaVelocidade = useCallback(() => {
		if (!arrastando.current) {
			return;
		}

		const vx = velocidadeX.get();
		const vy = velocidadeY.get();
		const rapidez = Math.hypot(vx, vy);
		const intensidade = Math.min(0.32, rapidez / 2600);
		const cosseno = rapidez === 0 ? 0 : Math.abs(vx) / rapidez;
		const seno = rapidez === 0 ? 0 : Math.abs(vy) / rapidez;

		animate(
			esticar,
			1.08 + intensidade * cosseno - intensidade * 0.55 * seno,
			MOLA_MOLE,
		);
		animate(
			achatar,
			1.08 + intensidade * seno - intensidade * 0.55 * cosseno,
			MOLA_MOLE,
		);
	}, [achatar, esticar, velocidadeX, velocidadeY]);

	useMotionValueEvent(velocidadeX, "change", deformarPelaVelocidade);
	useMotionValueEvent(velocidadeY, "change", deformarPelaVelocidade);

	function amolecer() {
		arrastando.current = true;
		arrastou.current = true;
		animate(esticar, 1.08, MOLA_MOLE);
		animate(achatar, 1.08, MOLA_MOLE);
		animate(forma, FORMAS_DE_BLOB, {
			duration: 1.6,
			ease: "easeInOut",
			repeat: Number.POSITIVE_INFINITY,
		});
	}

	function enrijecer() {
		arrastando.current = false;
		animate(esticar, 1, MOLA_RIGIDA);
		animate(achatar, 1, MOLA_RIGIDA);
		animate(forma, REDONDO, { duration: 0.18, ease: "easeOut" });
		window.setTimeout(() => {
			arrastou.current = false;
		}, 140);
	}

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

		const duracao = Math.min(0.7, 0.38 + distancia / 2600);
		const noEixoX = Math.abs(deslocamentoX) >= Math.abs(deslocamentoY);
		const intensidade = Math.min(0.14, distancia / 5000);
		const distorcao = {
			duration: duracao,
			times: [0, 0.45, 0.8, 1],
			ease: "easeInOut" as const,
		};
		const trajeto = { duration: duracao, ease: SUAVE };
		let abriu = false;
		const abrirAntes = window.setTimeout(() => {
			abriu = true;
			aoAbrir();
		}, duracao * 820);

		await Promise.all([
			animate(x, 0, trajeto),
			animate(y, 0, trajeto),
			animate(
				noEixoX ? esticar : achatar,
				[1, 1 + intensidade, 0.98, 1],
				distorcao,
			),
			animate(
				noEixoX ? achatar : esticar,
				[1, 1 - intensidade * 0.6, 1.01, 1],
				distorcao,
			),
		]);

		voltando.current = false;
		if (!abriu) {
			window.clearTimeout(abrirAntes);
			aoAbrir();
		}
	}, [achatar, aoAbrir, esticar, reduzirMovimento, x, y]);

	return (
		<motion.button
			ref={botaoRef}
			type="button"
			drag={!reduzirMovimento}
			dragMomentum={false}
			dragElastic={0.06}
			dragConstraints={limites}
			style={{
				x,
				y,
				scaleX: esticar,
				scaleY: achatar,
				borderRadius: forma,
			}}
			initial={false}
			animate={
				oculto
					? {
							opacity: 0,
							scale: 0.55,
							transitionEnd: { visibility: "hidden" },
						}
					: { opacity: 1, scale: 1, visibility: "visible" }
			}
			transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
			whileHover={
				reduzirMovimento || !temHover || oculto ? undefined : { scale: 1.05 }
			}
			whileTap={reduzirMovimento || oculto ? undefined : { scale: 0.95 }}
			onDragStart={amolecer}
			onDragEnd={enrijecer}
			onClick={() => {
				if (arrastou.current) {
					return;
				}

				voltarParaCasa();
			}}
			className={oculto ? "eva-fab eva-fab--oculto" : "eva-fab"}
			data-fundo={tom}
			aria-hidden={oculto || undefined}
			tabIndex={oculto ? -1 : undefined}
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
