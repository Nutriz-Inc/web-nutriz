import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TESTIMONIALS, type Testimonial } from "../data/landing-content";
import { useReveal } from "../hooks/use-reveal";
import { SectionLabel } from "./SectionLabel";

const STARS = ["s1", "s2", "s3", "s4", "s5"];

function initials(name: string) {
	return name
		.split(" ")
		.slice(0, 2)
		.map((part) => part[0])
		.join("")
		.toUpperCase();
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
	return (
		<figure className="flex h-full w-full flex-col gap-4 rounded-2xl border border-[#e6ecf5] bg-[#f8fafc] p-7 sm:p-8">
			<figcaption className="flex items-center gap-3">
				<span className="flex size-11 items-center justify-center rounded-full bg-[#387ccd]/15 text-[14px] font-bold text-[#387ccd]">
					{initials(testimonial.name)}
				</span>
				<span className="flex flex-col">
					<span className="text-[15px] font-bold text-[#12294d]">
						{testimonial.name}
					</span>
					<span className="text-[12px] text-[#94a3b8]">
						{testimonial.since}
					</span>
				</span>
			</figcaption>

			<div className="flex gap-0.5" role="img" aria-label="5 de 5 estrelas">
				{STARS.map((star) => (
					<Star key={star} className="size-4 fill-[#f5b642] text-[#f5b642]" />
				))}
			</div>

			<blockquote className="text-[15px] leading-relaxed text-[#475569]">
				“{testimonial.text}”
			</blockquote>
		</figure>
	);
}

export function TestimonialsSection() {
	const headerReveal = useReveal();
	const shouldReduceMotion = useReducedMotion();
	const [index, setIndex] = useState(0);

	const total = TESTIMONIALS.length;
	const go = (next: number) => setIndex((next + total) % total);

	const arrowClass =
		"inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#e6ecf5] bg-white text-[#387ccd] shadow-sm transition-colors hover:bg-[#f1f5fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#387ccd]";

	return (
		<section id="depoimentos" className="scroll-mt-20 bg-white py-20 lg:py-24">
			<div className="mx-auto w-full max-w-[760px] px-5 lg:px-8">
				<motion.div
					{...headerReveal}
					className="flex flex-col items-center gap-3 text-center"
				>
					<SectionLabel color="#387ccd">DEPOIMENTOS</SectionLabel>
					<h2 className="text-[30px] font-extrabold tracking-tight text-[#12294d] lg:text-[38px]">
						Quem já doou conta
					</h2>
				</motion.div>

				<div className="mt-12 flex items-center gap-3 sm:gap-4">
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
									? "w-6 bg-[#387ccd]"
									: "w-2 bg-[#cdd8ea] hover:bg-[#a9bce0]",
							)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
