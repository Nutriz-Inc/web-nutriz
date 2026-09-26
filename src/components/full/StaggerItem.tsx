import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/easing";

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
					transition: { duration: 0.4, ease: EASE_OUT },
				},
			}}
		>
			{children}
		</motion.div>
	);
}
