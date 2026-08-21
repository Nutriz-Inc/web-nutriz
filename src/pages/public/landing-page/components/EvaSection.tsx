import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EVA_SUGGESTIONS } from "@/pages/private/eva/constants";
import { openEva } from "@/pages/private/eva/widget/eva-widget-bus";
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

						<motion.div
							variants={item}
							aria-hidden
							className="rounded-card w-full max-w-[380px] flex-none border border-line bg-surface p-5 shadow-lift lg:w-[380px]"
						>
							<div className="flex items-center gap-2.5">
								<span className="size-8 rounded-full bg-gradient-to-br from-warning-tint via-eva-bright to-purple" />
								<span className="text-[15px] font-bold text-ink">EVA</span>
								<span className="ml-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-success">
									<span className="size-1.5 rounded-full bg-success" />
									online
								</span>
							</div>

							<p className="mt-4 ml-auto max-w-[84%] rounded-[16px_16px_6px_16px] bg-gradient-to-br from-warning-tint via-eva-tint to-eva-tint px-3.5 py-2.5 text-[14px] leading-snug text-ink">
								Meu bebê tem 4 meses, ainda posso doar?
							</p>

							<p className="mt-3 mr-auto max-w-[88%] rounded-[16px_16px_16px_6px] bg-surface-3 px-3.5 py-2.5 text-[14px] leading-snug text-ink">
								Pode sim! Enquanto você amamenta e tem leite de sobra, sua
								doação é muito bem-vinda.
							</p>

							<div className="mt-3 inline-flex items-center gap-1.5 rounded-[16px_16px_16px_6px] bg-surface-3 px-4 py-3">
								<span className="size-1.5 rounded-full bg-ink-3" />
								<span className="size-1.5 rounded-full bg-ink-3" />
								<span className="size-1.5 rounded-full bg-ink-3" />
							</div>
						</motion.div>
					</div>
				</div>
			</motion.div>

			<motion.div
				{...reveal}
				className="mt-7 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center"
			>
				<span className="text-[15px] font-bold text-ink">Comece por aqui:</span>
				<div className="flex flex-wrap gap-2.5">
					{EVA_SUGGESTIONS.map((suggestion) => (
						<button
							key={suggestion}
							type="button"
							onClick={() => openEva(suggestion)}
							className="min-h-[44px] cursor-pointer rounded-full border border-line bg-eva-tint px-[18px] text-[14px] font-semibold text-eva outline-none transition-colors hover:bg-eva-tint/70 focus-visible:ring-3 focus-visible:ring-eva/40"
						>
							{suggestion}
						</button>
					))}
				</div>
			</motion.div>
		</LandingSection>
	);
}
