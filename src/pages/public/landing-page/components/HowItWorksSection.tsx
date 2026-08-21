import { motion } from "framer-motion";
import bancoLeite from "@/assets/images/milk-bank.jpg";
import whatsappLogo from "@/assets/images/whatsapp-logo.png";
import { cn } from "@/lib/utils";
import {
	buildLactareWhatsAppLink,
	EnumWhatsAppLinkContext,
} from "@/utils/whatsapp-link";
import { fadeUp, staggerContainer } from "../animations/variants";
import { STEP_ICONS, STEPS } from "../constants";
import { useReveal } from "../hooks/use-reveal";
import { SectionLabel } from "./SectionLabel";
import { SlideButton } from "./SlideButton";

export function HowItWorksSection() {
	const headerReveal = useReveal();
	const gridReveal = useReveal(staggerContainer);

	return (
		<section
			id="como-funciona"
			className="scroll-mt-20 bg-surface-2 py-20 lg:py-24"
		>
			<div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
				<motion.div
					{...headerReveal}
					className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
				>
					<div>
						<SectionLabel tone="teal">COMO FUNCIONA</SectionLabel>
						<h2 className="mt-3 max-w-md font-display text-[30px] font-extrabold tracking-tight text-ink lg:text-[38px]">
							Três passos para salvar uma vida
						</h2>
					</div>
					<p className="max-w-sm text-[15px] leading-relaxed text-ink-2 md:text-right">
						Do cadastro à doação, cuidamos de cada etapa com você — simples,
						seguro e acolhedor.
					</p>
				</motion.div>

				<motion.div
					{...gridReveal}
					className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[196px]"
				>
					<motion.div
						variants={fadeUp}
						className="rounded-card group relative flex min-h-[300px] flex-col justify-end overflow-hidden sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-0"
					>
						<img
							src={bancoLeite}
							alt="Profissional de banco de leite processando leite humano doado"
							className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div
							aria-hidden
							className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent"
						/>
						<div className="relative p-7">
							<span className="font-display text-[12px] font-bold uppercase tracking-[0.06em] text-white/80">
								Banco de leite
							</span>
							<p className="mt-2 max-w-xs font-display text-[22px] font-bold leading-tight text-white">
								Cada gota é processada com segurança
							</p>
						</div>
					</motion.div>

					{STEPS.map((step, index) => {
						const Icon = STEP_ICONS[index];
						return (
							<motion.div
								key={step.number}
								variants={fadeUp}
								whileHover={{ y: -4 }}
								transition={{ type: "spring", stiffness: 300, damping: 22 }}
								className="rounded-card flex flex-col justify-between border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-lift sm:col-span-2 lg:col-span-2"
							>
								<div className="flex items-start justify-between">
									<span
										className={cn(
											"rounded-card-sm grid size-11 place-items-center font-display text-[16px] font-bold text-white",
											step.badge,
										)}
									>
										{step.number}
									</span>
									<span className={step.accent}>
										<Icon />
									</span>
								</div>
								<div className="mt-5">
									<h3 className="font-display text-[18px] font-bold text-ink">
										{step.title}
									</h3>
									<p className="mt-2 text-[14px] leading-relaxed text-ink-2">
										{step.description}
									</p>
								</div>
							</motion.div>
						);
					})}

					<motion.div
						variants={fadeUp}
						className="rounded-card relative flex flex-col justify-between overflow-hidden border border-line bg-success-tint p-6 shadow-soft sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-3"
					>
						<span
							aria-hidden
							className="pointer-events-none absolute -top-16 -right-12 size-48 rounded-full bg-[#25d366]/15 blur-3xl"
						/>
						<div className="relative">
							<img src={whatsappLogo} alt="WhatsApp" className="h-6 w-auto" />
							<h3 className="mt-3 font-display text-[16px] font-bold leading-snug text-ink">
								Fale com a nossa equipe
							</h3>
							<p className="mt-1 text-[13px] text-ink-2">
								Tire dúvidas e comece a sua triagem.
							</p>
						</div>
						<div className="relative mt-4">
							<SlideButton
								label="Chamar no WhatsApp"
								onClick={() =>
									window.open(
										buildLactareWhatsAppLink(EnumWhatsAppLinkContext.NewDonor),
										"_blank",
										"noopener,noreferrer",
									)
								}
								pillClassName="bg-[#25d366] text-white"
								circleClassName="bg-white text-success"
							/>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
