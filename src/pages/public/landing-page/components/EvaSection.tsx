import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
	CalendarCheck,
	Droplet,
	type LucideIcon,
	Snowflake,
	Sparkles,
} from "lucide-react";
import { EVA_SUGGESTIONS } from "@/pages/private/eva/constants";

/** Mesmos icones da abertura do widget, na mesma ordem. */
const ICONES_SUGESTAO: LucideIcon[] = [
	Droplet,
	Sparkles,
	Snowflake,
	CalendarCheck,
];

import { openEva } from "@/pages/private/eva/widget/eva-widget-bus";
import { EvaPreview } from "./EvaPreview";
import { LandingSection } from "./LandingSection";
import { SlideButton } from "./SlideButton";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function EvaSection() {
	const reduce = useReducedMotion();

	const reveal = reduce
		? {}
		: ({
				variants: container,
				initial: "hidden",
				whileInView: "show",
				viewport: { once: true, amount: 0.3 },
			} as const);

	return (
		<LandingSection
			id="a-eva"
			label="Rede de apoio"
			title="Como você está hoje?"
			tone="eva"
			description="A EVA acolhe você a qualquer hora — doação de leite, ordenha, armazenamento e amamentação. Sem fila, sem espera."
			surfaceClassName="bg-surface"
		>
			<motion.div {...reveal}>
				<div className="rounded-card gradient-eva relative overflow-hidden border border-line px-7 py-10 lg:px-14 lg:py-14">
					<div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
						<div className="min-w-0 lg:max-w-[460px]">
							<motion.span
								variants={item}
								className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-display text-[12px] font-bold uppercase tracking-[0.06em] text-eva shadow-soft"
							>
								<span
									aria-hidden
									className="size-1.5 rounded-full bg-success"
								/>
								Assistente 24 horas
							</motion.span>

							<motion.p
								variants={item}
								className="mt-6 max-w-[440px] text-[16px] font-semibold leading-relaxed text-ink lg:text-[18px]"
							>
								Pergunte o que quiser. Ela responde na hora, com conteúdo
								validado pela rBLH.
							</motion.p>

							<motion.div
								variants={item}
								className="mt-7 flex flex-wrap items-center gap-4"
							>
								<div className="relative inline-flex">
									{!reduce && (
										<motion.span
											aria-hidden
											className="pointer-events-none absolute inset-0 rounded-full border border-white"
											// Opacidade comeca e termina em 0: a emenda do loop fica
											// invisivel, sem o "pulo" de reset entre um pulso e outro.
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
										pillClassName="bg-white text-ink shadow-soft"
										circleClassName="bg-eva text-white"
									/>
								</div>

								<span className="max-w-[150px] text-[14px] leading-snug text-ink">
									Atendimento acolhedor, a qualquer hora
								</span>
							</motion.div>
						</div>

						<motion.div variants={item}>
							<EvaPreview />
						</motion.div>
					</div>
				</div>
			</motion.div>

			<motion.div
				{...reveal}
				className="mt-7 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center"
			>
				<span className="text-[15px] font-bold text-ink">Comece por aqui:</span>
				{/* `eva-scope` para as pilulas usarem o estilo real do widget. */}
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
