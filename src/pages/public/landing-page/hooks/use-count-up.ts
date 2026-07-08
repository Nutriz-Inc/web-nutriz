import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 1600) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "-60px" });
	const shouldReduceMotion = useReducedMotion();
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (!inView) {
			return;
		}

		if (shouldReduceMotion) {
			setValue(target);
			return;
		}

		let frame = 0;
		const start = performance.now();

		const tick = (now: number) => {
			const progress = Math.min((now - start) / duration, 1);
			const eased = 1 - (1 - progress) ** 3;
			setValue(Math.round(eased * target));

			if (progress < 1) {
				frame = requestAnimationFrame(tick);
			}
		};

		frame = requestAnimationFrame(tick);

		return () => cancelAnimationFrame(frame);
	}, [inView, shouldReduceMotion, target, duration]);

	return { ref, value };
}
