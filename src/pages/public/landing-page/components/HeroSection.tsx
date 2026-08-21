import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/images/hero-mother-baby.png";
import { HeroBackground } from "@/components/full/HeroBackground";
import {
	fadeScale,
	fadeUp,
	heroStagger,
	slideInRight,
} from "../animations/variants";
import { useScrollToSection } from "../hooks/use-scroll-to-section";
import { ActivityBadge } from "./ActivityBadge";
import { SlideButton } from "./SlideButton";
import { StatsBar } from "./StatsBar";

/**
 * Hero da landing.
 *
 * O que mudou em relacao a versao anterior:
 * - A faixa azul vai inteira ate a proxima secao. Os numeros deixaram de ser
 *   tres cartoes brancos subindo por cima do hero (`-mt-12`) e viraram uma
 *   faixa de vidro dentro dele — ver StatsBar.
 * - A foto ganhou um halo por tras, para descolar do fundo escuro sem
 *   precisar de moldura.
 * - Tipografia mais firme (peso e escala maiores) e coluna de texto mais
 *   estreita, para o titulo quebrar onde a gente quer.
 *
 * Copy e CTAs identicos: "Quero doar" leva ao cadastro e "Saiba mais" rola
 * ate "como funciona".
 */
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
			className="relative isolate overflow-hidden bg-blue-deep"
		>
			<HeroBackground />

			<div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-16 pt-[calc(7rem+env(safe-area-inset-top))] sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
				<div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
					<motion.div {...contentReveal} className="flex flex-col items-start">
						<motion.span variants={fadeScale} className="inline-flex">
							<ActivityBadge label="Faça sua doação" />
						</motion.span>

						<motion.h1
							variants={fadeUp}
							className="mt-7 font-display text-[36px] font-extrabold leading-[1.02] tracking-[-0.03em] text-white min-[420px]:text-[42px] sm:text-[52px] lg:text-[64px]"
						>
							Doar Amor.
							<br />
							<span className="text-mint-bright">Multiplica Vidas.</span>
						</motion.h1>

						<motion.p
							variants={fadeUp}
							className="mt-5 max-w-[38ch] text-[16px] leading-relaxed text-blue-tint-2 sm:text-[17px]"
						>
							Uma gota do seu leite pode ser tudo que um bebê prematuro precisa
							para sobreviver.
						</motion.p>

						<motion.div
							variants={fadeScale}
							className="mt-9 flex flex-row flex-wrap gap-3"
						>
							<SlideButton
								label="Quero doar"
								onClick={() => navigate("/registro")}
							/>
							<button
								type="button"
								onClick={() => scrollToSection("como-funciona")}
								className="inline-flex h-12 items-center rounded-full border border-white/40 bg-transparent px-7 text-[15px] font-semibold text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-mint/60"
							>
								Saiba mais
							</button>
						</motion.div>
					</motion.div>

					<motion.div
						{...imageReveal}
						className="relative mx-auto w-full max-w-md lg:max-w-none"
					>
						{/* Halo atras da foto: descola do fundo escuro sem moldura. */}
						<span
							aria-hidden="true"
							className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-bright/25 blur-[90px]"
						/>

						<motion.img
							src={heroImage}
							alt="Mãe amamentando seu bebê"
							className="h-auto w-full select-none drop-shadow-2xl"
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

				<StatsBar />
			</div>
		</section>
	);
}
