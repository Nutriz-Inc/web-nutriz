import type { Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
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
