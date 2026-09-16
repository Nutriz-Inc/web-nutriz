import type { Variants } from "framer-motion";

export * from "@/lib/motion";

const saidaSuave = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 30, scale: 0.98, filter: "blur(8px)" },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		filter: "blur(0px)",
		transition: { duration: 0.7, ease: saidaSuave },
	},
};

export const fadeScale: Variants = {
	hidden: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
	show: {
		opacity: 1,
		scale: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: saidaSuave },
	},
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.94, filter: "blur(10px)" },
	show: {
		opacity: 1,
		scale: 1,
		filter: "blur(0px)",
		transition: { duration: 0.8, ease: saidaSuave },
	},
};

export const staggerContainer: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const heroStagger: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

export const viewportOnce = { once: true, margin: "-120px" } as const;
