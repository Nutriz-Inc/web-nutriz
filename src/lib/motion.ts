import type { Variants } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: EASE_OUT },
	},
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: 0.5, ease: EASE_OUT },
	},
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.94 },
	show: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.6, ease: EASE_OUT },
	},
};

export const fadeScale: Variants = {
	hidden: { opacity: 0, scale: 0.94 },
	show: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.45, ease: EASE_OUT },
	},
};

export const slideInRight: Variants = {
	hidden: { opacity: 0, x: 36 },
	show: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: EASE_OUT },
	},
};

export const staggerContainer: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.1, delayChildren: 0.05 },
	},
};

export const heroStagger: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.12, delayChildren: 0.1 },
	},
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
