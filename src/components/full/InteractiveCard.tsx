import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { cn } from "@/lib/utils";

type InteractiveCardProps = {
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	children: ReactNode;
	"aria-label"?: string;
};

/**
 * Cartao clicavel do app: ao passar o mouse ele desliza um pouco para a
 * direita, a borda esquerda fica reta e uma barra azul preenche a lateral,
 * como um item selecionado. O clique afunda de leve e so entao navega, para
 * o toque ter resposta antes de a tela trocar.
 *
 * E o padrao de qualquer cartao que leva para outra tela (doacoes, etapas,
 * conteudos). Com `prefers-reduced-motion` nada se move.
 * Ver docs/design-system.md.
 */
export function InteractiveCard({
	onClick,
	disabled = false,
	className,
	children,
	"aria-label": ariaLabel,
}: InteractiveCardProps) {
	const reduzirMovimento = useReducedMotion();
	const animar = !disabled && !reduzirMovimento && !!onClick;

	function handleClick() {
		if (!onClick || disabled) {
			return;
		}
		if (!animar) {
			onClick();
			return;
		}
		window.setTimeout(onClick, 140);
	}

	return (
		<motion.button
			type="button"
			onClick={handleClick}
			disabled={disabled}
			aria-label={ariaLabel}
			whileHover={animar ? { x: 6 } : undefined}
			whileTap={animar ? { x: 2 } : undefined}
			transition={{ type: "spring", stiffness: 260, damping: 30 }}
			className={cn(
				"group relative w-full overflow-hidden text-left transition-[border-radius] outline-none disabled:cursor-default",
				!disabled &&
					onClick &&
					"hover:rounded-l-none focus-visible:rounded-l-none",
				className,
			)}
		>
			{!disabled && onClick && (
				<span
					aria-hidden="true"
					className="absolute inset-y-0 left-0 z-10 w-1.5 origin-left scale-x-0 bg-blue-deep transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
				/>
			)}

			{children}
		</motion.button>
	);
}
