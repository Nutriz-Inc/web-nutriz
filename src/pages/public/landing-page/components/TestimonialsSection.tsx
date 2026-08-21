import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "../mock";
import { LandingSection } from "./LandingSection";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
	const shouldReduceMotion = useReducedMotion();
	const [index, setIndex] = useState(0);

	const total = TESTIMONIALS.length;
	const go = (next: number) => setIndex((next + total) % total);

	const arrowClass =
		"inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-blue-bright shadow-soft outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50";

	return (
		<LandingSection
			id="depoimentos"
			label="Depoimentos"
			title="Quem já doou conta"
			tone="blue"
			align="center"
			surfaceClassName="bg-surface"
		>
			<div className="mx-auto w-full max-w-[760px]">
				<div className="flex items-center gap-3 sm:gap-4">
					<button
						type="button"
						onClick={() => go(index - 1)}
						aria-label="Depoimento anterior"
						className={arrowClass}
					>
						<ChevronLeft className="size-5" />
					</button>

					<div className="flex-1 overflow-hidden">
						<motion.div
							className="flex"
							animate={{ x: `-${index * 100}%` }}
							transition={{
								duration: shouldReduceMotion ? 0 : 0.4,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							{TESTIMONIALS.map((testimonial) => (
								<div key={testimonial.name} className="w-full shrink-0">
									<TestimonialCard testimonial={testimonial} />
								</div>
							))}
						</motion.div>
					</div>

					<button
						type="button"
						onClick={() => go(index + 1)}
						aria-label="Próximo depoimento"
						className={arrowClass}
					>
						<ChevronRight className="size-5" />
					</button>
				</div>

				<div className="mt-6 flex justify-center gap-2">
					{TESTIMONIALS.map((testimonial, dotIndex) => (
						<button
							key={testimonial.name}
							type="button"
							onClick={() => setIndex(dotIndex)}
							aria-label={`Ir para depoimento ${dotIndex + 1}`}
							aria-current={dotIndex === index}
							className={cn(
								"h-2 cursor-pointer rounded-full transition-all",
								dotIndex === index
									? "w-6 bg-blue-bright"
									: "w-2 bg-blue-tint-2 hover:bg-blue-tint-2",
							)}
						/>
					))}
				</div>
			</div>
		</LandingSection>
	);
}
