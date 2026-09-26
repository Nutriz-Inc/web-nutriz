import { motion, type PanInfo, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { EASE_OUT } from "@/lib/easing";
import { cn } from "@/lib/utils";
import { useReveal } from "../hooks/use-reveal";
import { TESTIMONIALS } from "../mock";
import { LandingSection } from "./LandingSection";
import { TestimonialCard } from "./TestimonialCard";

const VELOCIDADE_DE_ARREMESSO = 300;

const DISTANCIA_PARA_TROCAR = 60;

export function TestimonialsSection() {
	const shouldReduceMotion = useReducedMotion();
	const [index, setIndex] = useState(0);

	const total = TESTIMONIALS.length;
	const go = (next: number) => setIndex((next + total) % total);

	function aoSoltar(_: PointerEvent, gesto: PanInfo) {
		const arremesso = Math.abs(gesto.velocity.x) > VELOCIDADE_DE_ARREMESSO;
		const longe = Math.abs(gesto.offset.x) > DISTANCIA_PARA_TROCAR;

		if (!arremesso && !longe) {
			return;
		}

		const direcao = arremesso ? gesto.velocity.x : gesto.offset.x;
		go(direcao < 0 ? index + 1 : index - 1);
	}

	const arrowClass =
		"inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-blue-bright shadow-soft outline-none transition-[background-color,transform] duration-150 ease-out active:scale-[0.95] hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50";

	const carrosselReveal = useReveal();

	return (
		<LandingSection
			id="depoimentos"
			label="Depoimentos"
			title="Quem já doou conta"
			tone="blue"
			align="center"
			surfaceClassName="bg-surface"
			className="-mt-12 pt-0 pb-4 sm:-mt-16 sm:pb-6 lg:-mt-24 lg:pb-8"
		>
			<motion.div {...carrosselReveal} className="mx-auto w-full max-w-[760px]">
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
							drag={shouldReduceMotion ? false : "x"}
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={0.35}
							dragSnapToOrigin
							onDragEnd={aoSoltar}
							className="cursor-grab active:cursor-grabbing"
						>
							<motion.div
								className="flex"
								animate={{ x: `-${index * 100}%` }}
								transition={{
									duration: shouldReduceMotion ? 0 : 0.4,
									ease: EASE_OUT,
								}}
							>
								{TESTIMONIALS.map((testimonial) => (
									<div key={testimonial.name} className="w-full shrink-0">
										<TestimonialCard testimonial={testimonial} />
									</div>
								))}
							</motion.div>
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
								"relative h-2 cursor-pointer rounded-full transition-[width,background-color] duration-200 ease-out before:absolute before:-inset-2 before:content-['']",
								dotIndex === index
									? "w-6 bg-blue-bright"
									: "w-2 bg-blue-tint-2 hover:bg-blue-tint-2",
							)}
						/>
					))}
				</div>
			</motion.div>
		</LandingSection>
	);
}
