import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const FAIXA_DE_LUZ = [
	"linear-gradient(100deg,",
	"transparent 40%,",
	"color-mix(in srgb, var(--amber) 45%, white) 47%,",
	"color-mix(in srgb, var(--amber) 10%, white) 50%,",
	"color-mix(in srgb, var(--amber) 45%, white) 53%,",
	"transparent 60%)",
].join(" ");

const SOMBRA =
	"0 1px 1px color-mix(in srgb, var(--ink-on-fill) 26%, transparent), 0 6px 22px color-mix(in srgb, var(--ink-on-fill) 20%, transparent)";

const REFLEXO: CSSProperties = {
	backgroundImage: FAIXA_DE_LUZ,
	backgroundSize: "320% 100%",
	backgroundRepeat: "no-repeat",
	WebkitBackgroundClip: "text",
	backgroundClip: "text",
	color: "transparent",
	textShadow: "none",
};

type HeroBrilhoProps = {
	children: string;
	className?: string;
};

export function HeroBrilho({ children, className }: HeroBrilhoProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<span
			style={{ textShadow: SOMBRA }}
			className={cn("relative inline-block text-amber", className)}
		>
			{children}
			{!shouldReduceMotion && (
				<motion.span
					aria-hidden="true"
					style={REFLEXO}
					className="pointer-events-none absolute inset-0"
					initial={{ backgroundPosition: "190% 0%" }}
					animate={{ backgroundPosition: "-90% 0%" }}
					transition={{
						duration: 2.4,
						ease: "linear",
						repeat: Number.POSITIVE_INFINITY,
						repeatDelay: 3.6,
					}}
				>
					{children}
				</motion.span>
			)}
		</span>
	);
}
