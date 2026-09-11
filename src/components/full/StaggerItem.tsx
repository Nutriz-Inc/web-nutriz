import { motion } from "framer-motion";
import type { ReactNode } from "react";

type StaggerItemProps = {
	children: ReactNode;
	className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
	return (
		<motion.div
			className={className}
			variants={{
				oculto: { opacity: 0, y: 12 },
				visivel: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
				},
			}}
		>
			{children}
		</motion.div>
	);
}
