import { motion, useReducedMotion } from "framer-motion";
import {
	CalendarCheck,
	Droplet,
	type LucideIcon,
	Snowflake,
	Sparkles,
} from "lucide-react";
import { EVA_SUGGESTIONS } from "@/pages/private/eva/constants";

const ICONES_SUGESTAO: LucideIcon[] = [
	Droplet,
	Sparkles,
	Snowflake,
	CalendarCheck,
];

import evaMensagem from "@/assets/illustrations/eva-mensagem.svg";
import evaNuvens from "@/assets/illustrations/eva-nuvens.svg";
import evaRua from "@/assets/illustrations/eva-rua.svg";
import { openEva } from "@/pages/private/eva/widget/eva-widget-bus";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useReveal } from "../hooks/use-reveal";
import { EvaPreview } from "./EvaPreview";
import { LandingSection } from "./LandingSection";
import { SlideButton } from "./SlideButton";

export function EvaSection() {
	const reduce = useReducedMotion();

	const reveal = useReveal(staggerContainer);

	return (
		<LandingSection
			id="a-eva"
			label="Rede de apoio"
			title="Como você está hoje?"
			tone="eva"
			description="A EVA acolhe você a qualquer hora — doação de leite, ordenha, armazenamento e amamentação. Sem fila, sem espera."
			surfaceClassName="bg-surface"
			semDivisoria
		>
			<motion.div {...reveal}>
				<div className="rounded-card gradient-eva relative isolate border border-line px-7 pb-24 pt-10 sm:pb-28 lg:px-14 lg:pb-32 lg:pt-14">
					<img
						src={evaNuvens}
						alt=""
						aria-hidden="true"
						className="pointer-events-none absolute -top-8 left-[-4%] -z-10 hidden w-[46%] max-w-[420px] select-none opacity-45 lg:block"
					/>
					<img
						src={evaNuvens}
						alt=""
						aria-hidden="true"
						className="pointer-events-none absolute -top-6 right-0 -z-10 w-[42%] max-w-[300px] select-none opacity-45 md:-top-12 md:right-[-2%] md:w-[34%]"
					/>
					<img
						src={evaRua}
						alt=""
						aria-hidden="true"
						className="pointer-events-none absolute bottom-0 left-0 -z-10 w-full max-w-none select-none opacity-40 lg:w-[66%] lg:max-w-[700px]"
					/>
					<img
						src={evaMensagem}
						alt=""
						aria-hidden="true"
						width={588}
						height={631}
						className="pointer-events-none absolute -bottom-6 right-0 z-10 h-44 w-auto -scale-x-100 select-none md:-bottom-8 md:right-[2%] md:h-48 lg:h-60"
					/>

					<div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
						<div className="min-w-0 lg:max-w-[460px]">
							<motion.span
								variants={fadeUp}
								className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-display text-[12px] font-bold uppercase tracking-[0.06em] text-eva-deep shadow-soft"
							>
								<span
									aria-hidden
									className="size-1.5 rounded-full bg-success"
								/>
								Assistente 24 horas
							</motion.span>

							<motion.p
								variants={fadeUp}
								className="mt-6 max-w-[440px] text-[16px] font-semibold leading-relaxed text-ink lg:text-[18px]"
							>
								Pergunte o que quiser. Ela responde na hora, com conteúdo
								validado pela rBLH.
							</motion.p>

							<motion.div
								variants={fadeUp}
								className="mt-7 flex flex-wrap items-center gap-4"
							>
								<div className="relative inline-flex">
									{!reduce && (
										<motion.span
											aria-hidden
											className="pointer-events-none absolute inset-0 rounded-full border border-white"
											animate={{ opacity: [0, 0.6, 0], scale: [1, 1.1, 1.2] }}
											transition={{
												duration: 2.8,
												repeat: Number.POSITIVE_INFINITY,
												ease: "easeOut",
												times: [0, 0.4, 1],
											}}
										/>
									)}
									<SlideButton
										label="Falar com a EVA"
										onClick={() => openEva()}
										className="relative"
										pillClassName="bg-surface-on-fill text-ink-on-fill shadow-soft"
										circleClassName="bg-eva-fill text-white"
									/>
								</div>

								<span className="text-[14px] leading-snug text-ink lg:max-w-[150px]">
									Atendimento acolhedor, a qualquer hora
								</span>
							</motion.div>
						</div>

						<motion.div variants={fadeUp}>
							<EvaPreview />
						</motion.div>
					</div>
				</div>
			</motion.div>

			<motion.div
				{...reveal}
				className="mt-10 flex flex-col gap-3 lg:mt-16 lg:flex-row lg:flex-wrap lg:items-center"
			>
				<span className="text-[15px] font-bold text-ink">Comece por aqui:</span>
				<div className="eva-scope flex flex-wrap gap-2.5">
					{EVA_SUGGESTIONS.map((suggestion, indice) => {
						const Icone = ICONES_SUGESTAO[indice] ?? Sparkles;

						return (
							<button
								key={suggestion}
								type="button"
								className="eva-pill"
								onClick={() => openEva(suggestion)}
							>
								<Icone size={18} strokeWidth={1.6} aria-hidden="true" />
								{suggestion}
							</button>
						);
					})}
				</div>
			</motion.div>
		</LandingSection>
	);
}
