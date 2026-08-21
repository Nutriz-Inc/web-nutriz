import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
import { HeroAurora } from "./HeroAurora";
import { StatsBar } from "./StatsBar";

/**
 * Hero da landing — composicao refeita.
 *
 * O que mudou em relacao a versao anterior:
 * - **Altura**: era do tamanho do conteudo; agora ocupa a tela (`min-h-dvh`),
 *   com o conteudo ancorado embaixo. A primeira impressao virou uma cena, nao
 *   um bloco.
 * - **Cor**: a malha roxo/azul do `HeroBackground` saiu e entrou a
 *   `HeroAurora` — verde-agua subindo da esquerda, azul no alto a direita e um
 *   toque de rosa. O verde-agua e o mesmo do titulo e do botao.
 * - **Botao**: o CTA primario era branco; agora e verde-agua com texto azul
 *   escuro (7,36:1). O secundario virou link com seta, sem caixa.
 * - **Foto**: era um bloco centrado na coluna da direita; agora e maior e
 *   sangra pela borda direita da tela, cortada pela secao.
 * - **Numeros**: viraram uma linha de tipografia sobre uma regua fina, no
 *   lugar dos cartoes.
 *
 * Copy e destinos dos CTAs seguem identicos.
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
			className="relative isolate flex min-h-dvh flex-col justify-end overflow-hidden"
		>
			<HeroAurora />

			<div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-end gap-10 px-5 pb-14 pt-[calc(8rem+env(safe-area-inset-top))] sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-6 lg:px-8 lg:pb-16">
				<motion.div {...contentReveal} className="flex flex-col items-start">
					<motion.span variants={fadeScale} className="inline-flex">
						<ActivityBadge label="Faça sua doação" />
					</motion.span>

					<motion.h1
						variants={fadeUp}
						className="mt-8 font-display text-[40px] font-extrabold leading-[0.98] tracking-[-0.035em] text-white min-[420px]:text-[46px] sm:text-[58px] lg:text-[72px]"
					>
						Doar Amor.
						<br />
						<span className="text-mint-bright">Multiplica Vidas.</span>
					</motion.h1>

					<motion.p
						variants={fadeUp}
						className="mt-6 max-w-[34ch] text-[16px] leading-relaxed text-blue-tint-2 sm:text-[18px]"
					>
						Uma gota do seu leite pode ser tudo que um bebê prematuro precisa
						para sobreviver.
					</motion.p>

					<motion.div
						variants={fadeScale}
						className="mt-9 flex flex-row flex-wrap items-center gap-x-7 gap-y-4"
					>
						{/*
						 * CTA em verde-agua com texto azul escuro: 7,36:1, bem acima de
						 * AA, e tira o botao branco que se confundia com o cartao de
						 * "Cadastrar-se" do cabecalho.
						 */}
						<button
							type="button"
							onClick={() => navigate("/registro")}
							className="group inline-flex h-[52px] items-center gap-3 rounded-full bg-mint px-8 text-[16px] font-bold text-blue-deep outline-none transition-[transform,background-color] hover:bg-mint-bright focus-visible:ring-3 focus-visible:ring-mint/60 active:scale-[0.98]"
						>
							Quero doar
							<ArrowRight
								className="size-[18px] transition-transform duration-300 motion-safe:group-hover:translate-x-1"
								aria-hidden="true"
							/>
						</button>

						<button
							type="button"
							onClick={() => scrollToSection("como-funciona")}
							className="group inline-flex h-[52px] items-center gap-2 rounded-full px-1 text-[16px] font-semibold text-white outline-none transition-colors hover:text-mint-bright focus-visible:ring-3 focus-visible:ring-mint/60"
						>
							Saiba mais
							<span
								aria-hidden="true"
								className="block h-px w-6 bg-current transition-all duration-300 motion-safe:group-hover:w-10"
							/>
						</button>
					</motion.div>

					<StatsBar />
				</motion.div>

				{/*
				 * A foto sangra pela borda direita da tela: `lg:-mr-*` puxa para
				 * fora do container e a secao corta. No mobile ela fica contida.
				 */}
				<motion.div
					{...imageReveal}
					className="relative order-first mx-auto w-full max-w-sm sm:max-w-md lg:order-none lg:-mr-24 lg:max-w-none xl:-mr-32"
				>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[78%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/20 blur-[100px]"
					/>

					<motion.img
						src={heroImage}
						alt="Mãe amamentando seu bebê"
						className="h-auto w-full select-none drop-shadow-2xl"
						width={782}
						height={692}
						animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
						transition={
							shouldReduceMotion
								? undefined
								: {
										duration: 7,
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
