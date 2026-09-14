import { type MotionValue, motion } from "framer-motion";
import heroPequena from "@/assets/images/hero/hero-ordenha-640.webp";
import heroMedia from "@/assets/images/hero/hero-ordenha-1024.webp";
import heroLarga from "@/assets/images/hero/hero-ordenha-1600.webp";
import heroMaxima from "@/assets/images/hero/hero-ordenha-2400.webp";

const SRCSET = [
	`${heroPequena} 640w`,
	`${heroMedia} 1024w`,
	`${heroLarga} 1600w`,
	`${heroMaxima} 2400w`,
].join(", ");

const SIZES = "(max-width: 1023px) 100vw, min(1400px, 100vw)";

type HeroPhotoProps = {
	deslocamento?: MotionValue<string>;
};

export function HeroPhoto({ deslocamento }: HeroPhotoProps) {
	return (
		<motion.div
			style={{ scale: 1.08, originY: 1, y: deslocamento }}
			className="absolute inset-0 -z-10 will-change-transform"
		>
			<img
				src={heroLarga}
				srcSet={SRCSET}
				sizes={SIZES}
				width={2400}
				height={1350}
				decoding="async"
				fetchPriority="high"
				alt="Mãe amamentando o bebê ao fundo e frascos de leite humano ordenhado em primeiro plano"
				className="size-full select-none object-cover object-[72%_center] lg:object-bottom"
			/>
		</motion.div>
	);
}
