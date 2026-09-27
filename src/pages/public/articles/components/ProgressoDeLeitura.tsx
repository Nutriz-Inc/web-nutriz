import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ProgressoDeLeitura() {
	const semMovimento = useReducedMotion();
	const { scrollYProgress } = useScroll();
	const progresso = useSpring(scrollYProgress, {
		stiffness: 180,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<motion.div
			aria-hidden="true"
			className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-blue-bright"
			style={{ scaleX: semMovimento ? scrollYProgress : progresso }}
		/>
	);
}
