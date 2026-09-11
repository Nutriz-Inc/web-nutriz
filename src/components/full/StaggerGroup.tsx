import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type StaggerGroupProps = {
	children: ReactNode;
	className?: string;
	gap?: number;
};

export function StaggerGroup({
	children,
	className,
	gap = 0.06,
}: StaggerGroupProps) {
	const semMovimento = useReducedMotion();

	if (semMovimento) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial="oculto"
			whileInView="visivel"
			viewport={{ once: true, amount: 0.15 }}
			variants={{
				oculto: {},
				visivel: { transition: { staggerChildren: gap, delayChildren: 0.04 } },
			}}
		>
			{children}
		</motion.div>
	);
}
