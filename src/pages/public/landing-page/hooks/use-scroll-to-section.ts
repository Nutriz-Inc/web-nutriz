import { useReducedMotion } from "framer-motion";
import { useCallback } from "react";

export function useScrollToSection() {
	const shouldReduceMotion = useReducedMotion();

	return useCallback(
		(targetId: string) => {
			const element = document.getElementById(targetId);

			if (!element) {
				return;
			}

			element.scrollIntoView({
				behavior: shouldReduceMotion ? "auto" : "smooth",
				block: "start",
			});
		},
		[shouldReduceMotion],
	);
}
