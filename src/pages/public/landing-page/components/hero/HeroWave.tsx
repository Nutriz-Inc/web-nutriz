import { motion, useReducedMotion } from "framer-motion";
import { SectionWave } from "../SectionWave";

export function HeroWave() {
	const shouldReduceMotion = useReducedMotion();

	const subir = shouldReduceMotion
		? {}
		: ({
				initial: { y: "100%" },
				animate: { y: 0 },
				transition: {
					duration: 1.1,
					delay: 0.35,
					ease: [0.22, 1, 0.36, 1] as const,
				},
			} as const);

	return (
		<motion.div
			{...subir}
			className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 lg:h-48"
		>
			<SectionWave
				nome="hero"
				corDeBaixoClassName="text-surface-2"
				className="absolute inset-0"
			/>
		</motion.div>
	);
}
