import { useCallback } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

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
