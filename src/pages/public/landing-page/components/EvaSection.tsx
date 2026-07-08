import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useScrollToSection } from "../hooks/use-scroll-to-section";
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

const CARD_BG =
	"radial-gradient(130% 90% at 15% 8%, #f8bbd0 0%, rgba(248,187,208,0) 58%), radial-gradient(110% 85% at 88% 18%, #ce93d8 0%, rgba(206,147,216,0) 62%), radial-gradient(140% 110% at 55% 105%, #b39ddb 0%, rgba(179,157,219,0) 60%), #fdf4f8";

const FEATURES = [
	{
		title: "Resposta em segundos",
		desc: "Sem fila e sem espera. A EVA responde na hora, dia e noite.",
		Icon: ClockIcon,
	},
	{
		title: "Acolhimento de verdade",
		desc: "Linguagem calma e humana, pensada para o pós-parto.",
		Icon: HeartIcon,
	},
	{
		title: "Suas conversas protegidas",
		desc: "Privacidade garantida. A EVA não substitui avaliação médica.",
		Icon: ShieldIcon,
	},
];

export function EvaSection() {
	const navigate = useNavigate();
	const scrollToSection = useScrollToSection();
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
		<section id="a-eva" className="scroll-mt-20 bg-white py-14 lg:py-20">
			<div
				aria-hidden
				className="mx-auto mb-14 h-1.5 w-16 rounded-full bg-[#e3e8f0]"
			/>
			<motion.div
				{...reveal}
				aria-labelledby="eva-section-title"
				className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-12 px-5 lg:flex-row lg:gap-20 lg:px-8"
			>
				<div className="min-w-0 flex-1">
					<motion.p
						variants={item}
						className="text-[13px] font-bold tracking-[0.18em] text-[#a0577b]"
					>
						SUA ASSISTENTE 24 HORAS
					</motion.p>

					<motion.h2
						variants={item}
						id="eva-section-title"
						className="mt-4 text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#1c1b1f] text-balance lg:text-[44px]"
					>
						Conte com a <em className="text-[#d96b8f] not-italic">EVA</em> a
						qualquer hora
					</motion.h2>

					<motion.p
						variants={item}
						className="mt-5 max-w-[470px] text-[15px] leading-relaxed text-[#52505a] lg:text-[17px]"
					>
						A assistente da Nutriz tira suas dúvidas sobre doação de leite,
						ordenha e amamentação — com acolhimento e informação confiável, de
						madrugada ou de dia.
					</motion.p>

					<motion.ul variants={item} className="mt-8 flex flex-col gap-5">
						{FEATURES.map(({ title, desc, Icon }) => (
							<li key={title} className="flex items-start gap-4">
								<span
									aria-hidden
									className="grid size-12 flex-none place-items-center rounded-[14px] bg-[#f7eef3]"
								>
									<Icon />
								</span>
								<div>
									<p className="text-[16px] font-bold text-[#1c1b1f]">
										{title}
									</p>
									<p className="mt-0.5 text-[15px] leading-normal text-[#6b6b76]">
										{desc}
									</p>
								</div>
							</li>
						))}
					</motion.ul>

					<motion.div
						variants={item}
						className="mt-9 flex flex-wrap items-center gap-5 lg:gap-6"
					>
						<SlideButton
							label="Falar com a EVA"
							onClick={() => navigate("/login")}
							pillClassName="bg-gradient-to-r from-[#d96b8f] to-[#b39ddb] text-white"
							circleClassName="bg-white text-[#c25e86]"
						/>

						<button
							type="button"
							onClick={() => scrollToSection("artigos")}
							className="inline-flex min-h-[44px] cursor-pointer items-center rounded-md text-[15px] font-semibold text-[#1c1b1f] underline underline-offset-[3px] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#d96b8f]/60"
						>
							Ver perguntas frequentes
						</button>
					</motion.div>
				</div>

				<motion.div
					variants={item}
					className="relative w-full max-w-[520px] flex-none lg:w-[500px]"
				>
					<div
						className="flex h-[260px] flex-col items-center justify-center gap-4 overflow-hidden rounded-[26px] p-7 lg:h-[460px] lg:gap-6 lg:rounded-[32px] lg:p-10"
						style={{
							background: CARD_BG,
							boxShadow: "0 20px 50px rgba(179,157,219,0.28)",
						}}
					>
						<span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-[13px] font-semibold text-[#4a3a4f]">
							<span
								aria-hidden
								className="size-1.5 rounded-full bg-[#2e8b60]"
							/>
							Resposta em segundos
						</span>

						<div className="relative h-[150px] w-[200px] lg:h-[240px] lg:w-[300px]">
							<span
								aria-hidden
								className="absolute top-1/2 left-1/2 size-[124px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 lg:size-[158px]"
							/>
							<span
								aria-hidden
								className="absolute top-1/2 left-1/2 size-[178px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 lg:size-[218px]"
							/>
							<span
								aria-hidden
								className="absolute top-1/2 left-1/2 hidden size-[282px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 lg:block"
							/>
							{!reduce && (
								<motion.span
									aria-hidden
									className="absolute top-1/2 left-1/2 size-[96px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ce93d8]/50 lg:size-[124px]"
									initial={{ opacity: 0.5, scale: 1 }}
									animate={{ opacity: 0, scale: 1.6 }}
									transition={{
										duration: 2.6,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeOut",
									}}
								/>
							)}
							<div className="absolute top-1/2 left-1/2 grid size-[96px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_0_44px_rgba(255,255,255,0.9),0_12px_32px_rgba(179,157,219,0.35)] lg:size-[124px]">
								<span
									aria-hidden
									className="size-8 rotate-45 rounded-[0_50%_50%_50%] bg-gradient-to-br from-[#e9a7c3] to-[#b39ddb] lg:size-10"
								/>
							</div>
						</div>
					</div>

					<motion.div
						aria-hidden
						className="mx-3 -mt-8 rounded-[22px] bg-white p-4 shadow-[0_18px_44px_rgba(93,63,110,0.18)] lg:absolute lg:-bottom-8 lg:-left-8 lg:mx-0 lg:mt-0 lg:w-[340px]"
						animate={reduce ? undefined : { y: [0, -8, 0] }}
						transition={{
							duration: 5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					>
						<div className="flex items-center gap-2.5">
							<span className="grid size-[30px] place-items-center rounded-full bg-gradient-to-br from-[#f8bbd0] to-[#b39ddb]">
								<span className="size-2.5 rotate-45 rounded-[0_50%_50%_50%] bg-white" />
							</span>
							<span className="text-[15px] font-bold text-[#1c1b1f]">EVA</span>
							<span className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2e8b60]">
								<span className="size-1.5 rounded-full bg-[#4caf7d]" />
								online
							</span>
						</div>
						<p className="mt-3 ml-auto max-w-[82%] rounded-[16px_16px_6px_16px] bg-gradient-to-br from-[#fbe4ec] to-[#efdff4] px-3 py-2.5 text-[14px] leading-snug text-[#1c1b1f]">
							Meu bebê tem 4 meses, ainda posso doar?
						</p>
						<p className="mt-3 mr-auto max-w-[86%] rounded-[16px_16px_16px_6px] bg-[#f4f2f6] px-3 py-2.5 text-[14px] leading-snug text-[#1c1b1f]">
							Pode sim! Enquanto você amamenta, sua doação é muito bem-vinda.
						</p>
					</motion.div>
				</motion.div>
			</motion.div>
		</section>
	);
}

function ClockIcon() {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="9" stroke="#C25E86" strokeWidth="1.6" />
			<path
				d="M12 7.5V12l3 2"
				stroke="#C25E86"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function HeartIcon() {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M12 20s-7-4.35-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5C19 15.65 12 20 12 20Z"
				stroke="#C25E86"
				strokeWidth="1.6"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ShieldIcon() {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M12 3.5 5.5 6.2v5c0 4 2.8 6.6 6.5 8 3.7-1.4 6.5-4 6.5-8v-5L12 3.5Z"
				stroke="#C25E86"
				strokeWidth="1.6"
				strokeLinejoin="round"
			/>
			<path
				d="m9.3 12 1.9 1.9 3.6-3.8"
				stroke="#C25E86"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
