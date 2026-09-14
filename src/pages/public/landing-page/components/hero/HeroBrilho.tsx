import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

const REFLEXO = [
	"linear-gradient(100deg,",
	"var(--amber) 0%,",
	"var(--amber) 40%,",
	"color-mix(in srgb, var(--amber) 20%, white) 48%,",
	"color-mix(in srgb, var(--amber) 55%, white) 52%,",
	"var(--amber) 60%,",
	"var(--amber) 100%)",
].join(" ");

const ESTILO: CSSProperties = {
	backgroundImage: REFLEXO,
	backgroundSize: "320% 100%",
	backgroundRepeat: "no-repeat",
	WebkitBackgroundClip: "text",
	backgroundClip: "text",
	color: "transparent",
};

type HeroBrilhoProps = {
	children: string;
	className?: string;
};

export function HeroBrilho({ children, className }: HeroBrilhoProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <span className={`text-amber ${className ?? ""}`}>{children}</span>;
	}

	return (
		<motion.span
			style={ESTILO}
			className={className}
			initial={{ backgroundPosition: "190% 0%" }}
			animate={{ backgroundPosition: "-90% 0%" }}
			transition={{
				duration: 2.6,
				ease: "linear",
				repeat: Number.POSITIVE_INFINITY,
				repeatDelay: 3.4,
			}}
		>
			{children}
		</motion.span>
	);
}
