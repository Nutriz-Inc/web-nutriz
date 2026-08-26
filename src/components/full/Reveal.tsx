import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
	children: React.ReactNode;
	/** Atraso em segundos, para escalonar itens de uma mesma grade. */
	delay?: number;
	className?: string;
};

/**
 * Reveal sutil ao entrar na viewport. Com `prefers-reduced-motion` o conteudo
 * aparece direto, sem deslocamento nem fade.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={cn(className)}
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.5, delay, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}
