import type { Variants } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: easeOut },
	},
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: 0.5, ease: easeOut },
	},
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.94 },
	show: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.6, ease: easeOut },
	},
};

export const fadeScale: Variants = {
	hidden: { opacity: 0, scale: 0.94 },
	show: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.45, ease: easeOut },
	},
};

export const slideInRight: Variants = {
	hidden: { opacity: 0, x: 36 },
	show: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: easeOut },
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
