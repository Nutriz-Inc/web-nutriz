import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/easing";

const SURGE: Variants = {
	hidden: { opacity: 0, y: "0.3em", filter: "blur(8px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.7, ease: EASE_OUT },
	},
};

type HeroPalavraProps = {
	children: ReactNode;
};

export function HeroPalavra({ children }: HeroPalavraProps) {
	return (
		<motion.span variants={SURGE} className="inline-block">
			{children}
		</motion.span>
	);
}
