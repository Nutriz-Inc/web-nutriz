import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EVA_SUGGESTIONS } from "@/pages/private/eva/constants";
import { openEva } from "@/pages/private/eva/widget/eva-widget-bus";
import { EVA_LANDING_BG } from "../constants";
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
		<section
			id="a-eva"
			className="scroll-mt-20 bg-white pt-4 lg:pt-6 pb-12 lg:pb-16"
		>
			<div
				aria-hidden
				className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-blue-tint lg:mb-8"
			/>

			<motion.div
				{...reveal}
				aria-labelledby="eva-section-title"
				className="mx-auto max-w-[1200px] px-5 lg:px-8"
			>
				<div
					className="relative overflow-hidden rounded-3xl px-7 py-10 lg:rounded-2xl lg:px-14 lg:py-16"
					style={{ background: EVA_LANDING_BG }}
				>
					<div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
						<div className="min-w-0 lg:max-w-[460px]">
							<motion.span
								variants={item}
								className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-[13px] font-bold tracking-[0.12em] text-danger"
							>
								<span
									aria-hidden
									className="size-1.5 rounded-full bg-[#2ea36a]"
								/>
								ASSISTENTE 24 HORAS
							</motion.span>

							<motion.h2
								variants={item}
								id="eva-section-title"
								className="mt-6 text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink lg:text-[48px]"
							>
								Como você está hoje?
							</motion.h2>

							<motion.p
								variants={item}
								className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-ink lg:text-[16px]"
							>
								A EVA acolhe você a qualquer hora — doação de leite, ordenha,
								armazenamento e amamentação. Sem fila, sem espera.
							</motion.p>

							<motion.div
								variants={item}
								className="mt-9 flex flex-wrap items-center gap-4"
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
							className="w-full max-w-[380px] flex-none rounded-2xl bg-white p-5 shadow-lift lg:w-[380px]"
						>
							<div className="flex items-center gap-2.5">
								<span className="size-8 rounded-full bg-gradient-to-br from-warning-tint via-eva-bright to-purple" />
								<span className="text-[15px] font-bold text-ink">EVA</span>
								<span className="ml-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-success">
									<span className="size-1.5 rounded-full bg-[#2ea36a]" />
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

				<motion.div
					variants={item}
					className="mt-7 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center"
				>
					<span className="text-[15px] font-bold text-ink">
						Comece por aqui:
					</span>
					<div className="flex flex-wrap gap-2.5">
						{EVA_SUGGESTIONS.map((suggestion) => (
							<button
								key={suggestion}
								type="button"
								onClick={() => openEva(suggestion)}
								className="min-h-[44px] cursor-pointer rounded-full bg-danger-tint px-[18px] text-[14px] font-semibold text-eva transition-[filter] hover:brightness-[0.97] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eva"
							>
								{suggestion}
							</button>
						))}
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
