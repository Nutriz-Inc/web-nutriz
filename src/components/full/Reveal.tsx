import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
	children: React.ReactNode;
	delay?: number;
	className?: string;
};

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
