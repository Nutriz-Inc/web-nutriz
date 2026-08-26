import { motion, useAnimate, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Os handlers de animacao/arraste do DOM colidem com os do framer-motion
 * (assinaturas diferentes para o mesmo nome), entao ficam de fora do spread.
 */
type StatefulButtonProps = Omit<
	ComponentPropsWithoutRef<"button">,
	| "onClick"
	| "onAnimationStart"
	| "onAnimationEnd"
	| "onDrag"
	| "onDragStart"
	| "onDragEnd"
> & {
	/** Icone fixo, antes do rotulo — some com o giro e o certo. */
	icon?: ReactNode;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<unknown>;
	children: ReactNode;
};

/**
 * Botao com estado (Aceternity UI, adaptado).
 *
 * Ao clicar mostra um giro enquanto a acao roda e um certo quando termina,
 * voltando sozinho ao normal. O nome e `StatefulButton`, e nao `Button` como
 * na biblioteca, porque `components/ui/button.tsx` ja exporta um `Button`.
 *
 * Com `prefers-reduced-motion` nada se move: a acao roda e o rotulo fica como
 * esta.
 */
export function StatefulButton({
	className,
	icon,
	children,
	onClick,
	...props
}: StatefulButtonProps) {
	const [escopo, animar] = useAnimate();
	const reduzirMovimento = useReducedMotion();

	async function handleClick(event: MouseEvent<HTMLButtonElement>) {
		// A acao dispara antes de qualquer `await`: abrir uma aba depois de um
		// await sai da janela de gesto do usuario e o navegador bloqueia.
		const acao = onClick?.(event);

		if (reduzirMovimento) {
			await acao;
			return;
		}

		await animar(
			".loader",
			{ width: 20, scale: 1, display: "block" },
			{ duration: 0.2 },
		);
		await acao;
		await animar(
			".loader",
			{ width: 0, scale: 0, display: "none" },
			{ duration: 0.2 },
		);
		await animar(
			".check",
			{ width: 20, scale: 1, display: "block" },
			{ duration: 0.2 },
		);
		await animar(
			".check",
			{ width: 0, scale: 0, display: "none" },
			{ delay: 1.6, duration: 0.2 },
		);
	}

	return (
		<motion.button
			layout
			ref={escopo}
			type="button"
			{...props}
			onClick={handleClick}
			className={cn(
				"flex min-h-[46px] min-w-[150px] items-center justify-center gap-2 rounded-full px-5 text-[14px] font-semibold outline-none transition-[filter,transform] duration-200 hover:brightness-105 focus-visible:ring-3 focus-visible:ring-blue-bright/50 active:scale-[0.98]",
				className,
			)}
		>
			<motion.span layout className="flex items-center gap-2">
				{icon}
				<Giro />
				<Certo />
				<motion.span layout>{children}</motion.span>
			</motion.span>
		</motion.button>
	);
}

function Giro() {
	return (
		<motion.svg
			aria-hidden="true"
			className="loader"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			initial={{ scale: 0, width: 0, display: "none" }}
			animate={{ rotate: [0, 360] }}
			transition={{
				duration: 0.8,
				repeat: Number.POSITIVE_INFINITY,
				ease: "linear",
			}}
			style={{ height: 20 }}
		>
			<path d="M12 3a9 9 0 1 0 9 9" />
		</motion.svg>
	);
}

function Certo() {
	return (
		<motion.svg
			aria-hidden="true"
			className="check"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			initial={{ scale: 0, width: 0, display: "none" }}
			style={{ height: 20 }}
		>
			<path d="M5 12l5 5L20 7" />
		</motion.svg>
	);
}
