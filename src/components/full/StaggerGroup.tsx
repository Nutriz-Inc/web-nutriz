import { motion, useInView, useReducedMotion } from "framer-motion";
import { type ReactNode, useRef } from "react";

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
	const ref = useRef<HTMLDivElement>(null);
	const visto = useInView(ref, { once: true, amount: 0.15 });

	if (semMovimento) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			ref={ref}
			className={className}
			initial="oculto"
			animate={visto ? "visivel" : "oculto"}
			variants={{
				oculto: {},
				visivel: { transition: { staggerChildren: gap, delayChildren: 0.04 } },
			}}
		>
			{children}
		</motion.div>
	);
}
