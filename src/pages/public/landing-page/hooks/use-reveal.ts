import { useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "../animations/variants";

export function useReveal(variants: Variants = fadeUp) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return {} as const;
	}

	return {
		variants,
		initial: "hidden",
		whileInView: "show",
		viewport: viewportOnce,
	} as const;
}
