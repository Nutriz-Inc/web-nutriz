import { motion, useReducedMotion } from "framer-motion";

/**
 * Fundo do hero.
 *
 * Substitui o `HeroBackground` compartilhado (que segue no CTA final): aquele
 * era uma malha de seis gradientes disputando atencao, toda em azul e roxo.
 * Aqui a historia de cor e outra — base marinho, uma aurora verde-agua
 * subindo da esquerda e um brilho azul no alto a direita, atras da foto. O
 * verde-agua e o mesmo `--mint` do titulo e do botao, entao o hero inteiro
 * fala a mesma lingua.
 *
 * Por cima, uma malha de pontos bem apagada da textura sem virar ruido.
 */
export function HeroAurora() {
	const reduzirMovimento = useReducedMotion();

	const deriva = (x: number, y: number, duracao: number) =>
		reduzirMovimento
			? {}
			: {
					animate: { x: [0, x, 0], y: [0, y, 0] },
					transition: {
						duration: duracao,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut" as const,
					},
				};

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
		>
			{/* Base marinho, mais profunda embaixo. */}
			<div className="absolute inset-0 bg-[linear-gradient(165deg,var(--blue-deep)_0%,color-mix(in_oklch,var(--blue-deep)_82%,var(--blue))_55%,var(--blue-deep)_100%)]" />

			{/* Aurora verde-agua subindo da esquerda. */}
			<motion.div
				{...deriva(40, -30, 24)}
				className="absolute -bottom-[35%] -left-[15%] h-[85%] w-[70%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--mint)_45%,transparent),transparent)] blur-[110px]"
			/>

			{/* Brilho azul no alto a direita, atras da foto. */}
			<motion.div
				{...deriva(-34, 26, 20)}
				className="absolute -right-[10%] -top-[25%] h-[90%] w-[60%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--blue-bright)_50%,transparent),transparent)] blur-[110px]"
			/>

			{/* Toque rosa da EVA, so para o azul nao ficar monocromatico. */}
			<motion.div
				{...deriva(24, 20, 28)}
				className="absolute bottom-[10%] right-[22%] h-[45%] w-[35%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--eva)_28%,transparent),transparent)] blur-[110px]"
			/>

			{/* Malha de pontos: textura discreta, some antes da metade. */}
			<div
				className="absolute inset-0 opacity-[0.18] [mask-image:linear-gradient(to_bottom,black,transparent_65%)]"
				style={{
					backgroundImage:
						"radial-gradient(rgb(255 255 255 / 0.35) 1px, transparent 1px)",
					backgroundSize: "26px 26px",
				}}
			/>
		</div>
	);
}
