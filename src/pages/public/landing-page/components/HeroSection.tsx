import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/images/hero-mother-baby.png";
import {
	fadeScale,
	fadeUp,
	heroStagger,
	slideInRight,
} from "../animations/variants";
import { useScrollToSection } from "../hooks/use-scroll-to-section";
import { ActivityBadge } from "./ActivityBadge";
import { HeroBackground } from "./HeroBackground";
import { SlideButton } from "./SlideButton";

export function HeroSection() {
	const navigate = useNavigate();
	const scrollToSection = useScrollToSection();
	const shouldReduceMotion = useReducedMotion();

	const contentReveal = shouldReduceMotion
		? {}
		: ({ variants: heroStagger, initial: "hidden", animate: "show" } as const);
	const imageReveal = shouldReduceMotion
		? {}
		: ({ variants: slideInRight, initial: "hidden", animate: "show" } as const);

	return (
		<section
			id="topo"
			className="relative isolate overflow-hidden bg-[#0a3a87]"
		>
			<HeroBackground />

			<div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-12 px-5 pt-28 pb-16 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pt-36 lg:pb-24">
				<motion.div {...contentReveal} className="flex flex-col items-start">
					<motion.span variants={fadeScale} className="inline-flex">
						<ActivityBadge label="Faça sua doação" dotColor="#72f2eb" />
					</motion.span>

					<motion.h1
						variants={fadeUp}
						className="mt-6 text-[32px] font-extrabold leading-[1.08] tracking-tight text-white min-[420px]:text-[38px] sm:text-[46px] md:text-[52px] lg:text-[60px]"
					>
						Doar Amor.
						<br />
						<span className="text-[#72f2eb]">Multiplica Vidas.</span>
					</motion.h1>

					<motion.p
						variants={fadeUp}
						className="mt-4 max-w-md text-[15px] leading-relaxed text-[#c7d6f0] sm:text-[16px]"
					>
						Uma gota do seu leite pode ser tudo que um bebê prematuro precisa
						para sobreviver.
					</motion.p>

					<motion.div
						variants={fadeScale}
						className="mt-8 flex flex-row flex-wrap gap-3"
					>
						<SlideButton
							label="Quero doar"
							onClick={() => navigate("/registro")}
						/>
						<button
							type="button"
							onClick={() => scrollToSection("como-funciona")}
							className="inline-flex h-12 items-center rounded-full border border-white/40 bg-transparent px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2fd9c5]"
						>
							Saiba mais
						</button>
					</motion.div>
				</motion.div>

				<motion.div
					{...imageReveal}
					className="mx-auto w-full max-w-md lg:max-w-lg"
				>
					<motion.img
						src={heroImage}
						alt="Mãe amamentando seu bebê"
						className="h-auto w-full select-none"
						width={782}
						height={692}
						animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
						transition={
							shouldReduceMotion
								? undefined
								: {
										duration: 6,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									}
						}
					/>
				</motion.div>
			</div>
		</section>
	);
}
