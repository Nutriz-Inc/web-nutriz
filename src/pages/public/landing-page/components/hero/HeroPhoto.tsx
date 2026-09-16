import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import heroPequena from "@/assets/images/hero/hero-nenem-640.webp";
import heroMedia from "@/assets/images/hero/hero-nenem-1024.webp";
import heroGrande from "@/assets/images/hero/hero-nenem-1600.webp";
import heroMaxima from "@/assets/images/hero/hero-nenem-2400.webp";
import retratoPequeno from "@/assets/images/hero/hero-nenem-retrato-560.webp";
import retratoGrande from "@/assets/images/hero/hero-nenem-retrato-896.webp";

const SRCSET = [
	`${heroPequena} 640w`,
	`${heroMedia} 1024w`,
	`${heroGrande} 1600w`,
	`${heroMaxima} 2400w`,
].join(", ");

const SRCSET_RETRATO = [`${retratoPequeno} 560w`, `${retratoGrande} 896w`].join(
	", ",
);

const MASCARA_DO_FOCO =
	"linear-gradient(to right, transparent 34%, rgba(0,0,0,0.35) 48%, #000 62%)";

const ESTILO_DA_MASCARA = {
	"--mascara-do-foco": MASCARA_DO_FOCO,
} as CSSProperties;

const ALT = "Bebê recebendo leite humano em mamadeira, segurada por um adulto";

export function HeroPhoto() {
	const shouldReduceMotion = useReducedMotion();

	const acomodar = shouldReduceMotion
		? {}
		: ({
				initial: { scale: 1.06, opacity: 0 },
				animate: { scale: 1, opacity: 1 },
				transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const },
			} as const);

	return (
		<motion.div
			{...acomodar}
			className="absolute inset-0 -z-10 overflow-hidden will-change-transform"
		>
			<img
				src={heroGrande}
				srcSet={SRCSET}
				sizes="100vw"
				width={2400}
				height={1792}
				decoding="async"
				aria-hidden="true"
				alt=""
				className="absolute inset-0 hidden size-full scale-105 select-none object-cover object-center blur-[7px] lg:block"
			/>
			<picture>
				<source media="(min-width: 1024px)" srcSet={SRCSET} sizes="100vw" />
				<img
					src={retratoGrande}
					srcSet={SRCSET_RETRATO}
					sizes="100vw"
					width={896}
					height={1792}
					decoding="async"
					fetchPriority="high"
					alt={ALT}
					style={ESTILO_DA_MASCARA}
					className="absolute inset-0 size-full select-none object-cover object-center lg:[-webkit-mask-image:var(--mascara-do-foco)] lg:[mask-image:var(--mascara-do-foco)]"
				/>
			</picture>
		</motion.div>
	);
}
