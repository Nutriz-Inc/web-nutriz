import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeScale, fadeUp, heroStagger } from "../animations/variants";
import { useScrollToSection } from "../hooks/use-scroll-to-section";
import { HeroDourado } from "./hero/HeroDourado";
import { HeroPhoto } from "./hero/HeroPhoto";
import { HeroPonto } from "./hero/HeroPonto";
import { HeroStats } from "./hero/HeroStats";
import { HeroTrustSeal } from "./hero/HeroTrustSeal";
import { HeroWave } from "./hero/HeroWave";
import {
	HERO_OVERLAY_DESKTOP,
	HERO_OVERLAY_MOBILE,
	HERO_OVERLAY_TOPO,
} from "./hero/tokens";
import { SlideButton } from "./SlideButton";

export function HeroSection() {
	const navigate = useNavigate();
	const scrollToSection = useScrollToSection();
	const shouldReduceMotion = useReducedMotion();
	const conteudoReveal = shouldReduceMotion
		? {}
		: ({ variants: heroStagger, initial: "hidden", animate: "show" } as const);

	return (
		<section
			id="topo"
			data-fundo="claro"
			className="relative isolate overflow-hidden bg-blue-deep-fill"
		>
			<HeroPhoto />

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
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 h-60"
				style={{ background: HERO_OVERLAY_TOPO }}
			/>

			<motion.div
				{...conteudoReveal}
				className="relative z-10 mx-auto flex min-h-[min(88svh,720px)] w-full max-w-[1400px] flex-col justify-between gap-y-6 px-5 pt-[calc(clamp(5rem,12svh,8rem)+2.3125rem+env(safe-area-inset-top))] pb-32 sm:px-6 lg:min-h-[min(94svh,980px)] lg:gap-y-16 lg:px-10 lg:pt-[calc(clamp(7.5rem,22svh,15rem)+2.5rem+env(safe-area-inset-top))] lg:pb-16"
			>
				<div className="relative flex max-w-[34rem] flex-col items-start">
					<motion.h1
						variants={fadeUp}
						className="font-display text-[40px] font-medium leading-[1.08] tracking-[-0.02em] text-white min-[420px]:text-[46px] sm:text-[52px] lg:text-[56px] xl:text-[64px]"
					>
						Doar <HeroDourado>Amor</HeroDourado>
						<HeroPonto />
						<br />
						Multiplica <HeroDourado>Vidas</HeroDourado>
						<HeroPonto />
					</motion.h1>

					<motion.p
						variants={fadeUp}
						className="mt-6 max-w-md text-[15px] leading-relaxed text-canvas-on-fill sm:text-[16px]"
					>
						Uma gota do seu leite pode ser tudo que um bebê prematuro precisa
						para sobreviver.
					</motion.p>

					<motion.div
						variants={fadeScale}
						className="mt-9 flex flex-row flex-wrap items-center gap-3 sm:gap-5"
					>
						<SlideButton
							label="Quero doar"
							onClick={() => navigate("/registro")}
						/>
						<button
							type="button"
							onClick={() => scrollToSection("como-funciona")}
							className="inline-flex h-10 items-center rounded-full border border-white/30 px-5 text-[14px] font-medium text-white/90 outline-none transition-colors duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white focus-visible:ring-3 focus-visible:ring-mint/60"
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

			<HeroWave />
		</section>
	);
}
