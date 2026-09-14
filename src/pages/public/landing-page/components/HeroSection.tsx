import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
	fadeScale,
	fadeUp,
	heroStagger,
	scaleIn,
} from "../animations/variants";
import { useScrollToSection } from "../hooks/use-scroll-to-section";
import { HeroEyebrow } from "./hero/HeroEyebrow";
import { HeroPhoto } from "./hero/HeroPhoto";
import { HeroStats } from "./hero/HeroStats";
import { HeroTrustSeal } from "./hero/HeroTrustSeal";
import { HERO_OVERLAY_DESKTOP, HERO_OVERLAY_MOBILE } from "./hero/tokens";
import { SlideButton } from "./SlideButton";

export function HeroSection() {
	const navigate = useNavigate();
	const scrollToSection = useScrollToSection();
	const shouldReduceMotion = useReducedMotion();
	const blocoRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: blocoRef,
		offset: ["start start", "end start"],
	});
	const deslocamentoDaFoto = useTransform(
		scrollYProgress,
		[0, 1],
		["0%", "6%"],
	);

	const blocoReveal = shouldReduceMotion
		? {}
		: ({ variants: scaleIn, initial: "hidden", animate: "show" } as const);
	const conteudoReveal = shouldReduceMotion
		? {}
		: ({ variants: heroStagger, initial: "hidden", animate: "show" } as const);

	return (
		<section
			id="topo"
			className="relative isolate overflow-hidden bg-blue-deep-fill"
		>
			<div className="mx-auto w-full max-w-[1400px] px-5 pt-[calc(6rem+env(safe-area-inset-top))] pb-20 sm:px-6 lg:px-10 lg:pt-[calc(7.5rem+env(safe-area-inset-top))] lg:pb-28">
				<motion.div
					ref={blocoRef}
					{...blocoReveal}
					className="relative isolate overflow-hidden rounded-card shadow-lift"
				>
					<HeroPhoto
						deslocamento={shouldReduceMotion ? undefined : deslocamentoDaFoto}
					/>

					<div
						aria-hidden="true"
						className="absolute inset-0 lg:hidden"
						style={{ background: HERO_OVERLAY_MOBILE }}
					/>
					<div
						aria-hidden="true"
						className="absolute inset-0 hidden lg:block"
						style={{ background: HERO_OVERLAY_DESKTOP }}
					/>

					<motion.div
						{...conteudoReveal}
						className="relative z-10 flex min-h-[620px] flex-col px-6 pt-10 pb-[14rem] sm:px-10 lg:min-h-[660px] lg:justify-center lg:px-14 lg:py-16"
					>
						<div className="flex max-w-[34rem] flex-col items-start">
							<motion.span variants={fadeScale} className="inline-flex">
								<HeroEyebrow label="Faça sua doação" />
							</motion.span>

							<motion.h1
								variants={fadeUp}
								className="mt-6 font-display text-[34px] font-extrabold leading-[1.06] tracking-tight text-white min-[420px]:text-[40px] sm:text-[48px] lg:text-[60px]"
							>
								Doar Amor.
								<br />
								<span className="text-mint-bright">Multiplica Vidas.</span>
							</motion.h1>

							<motion.p
								variants={fadeUp}
								className="mt-5 max-w-md text-[15px] leading-relaxed text-canvas-on-fill sm:text-[16px]"
							>
								Uma gota do seu leite pode ser tudo que um bebê prematuro
								precisa para sobreviver.
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
									className="inline-flex h-12 items-center rounded-full border border-white/40 bg-transparent px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
								>
									Saiba mais
								</button>
							</motion.div>

							<motion.span variants={fadeUp} className="mt-7 inline-flex">
								<HeroTrustSeal />
							</motion.span>
						</div>

						<HeroStats />
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
