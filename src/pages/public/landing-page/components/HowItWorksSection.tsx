import { motion } from "framer-motion";
import bancoLeite from "@/assets/images/milk-bank.jpg";
import whatsappIcone from "@/assets/images/whatsapp-icon.svg";
import { StatefulButton } from "@/components/ui/stateful-button";
import { cn } from "@/lib/utils";
import {
	buildLactareWhatsAppLink,
	EnumWhatsAppLinkContext,
} from "@/utils/whatsapp-link";
import { fadeUp, staggerContainer } from "../animations/variants";
import { STEP_ICONS, STEPS } from "../constants";
import { useReveal } from "../hooks/use-reveal";
import { LandingSection } from "./LandingSection";

export function HowItWorksSection() {
	const gridReveal = useReveal(staggerContainer);

	return (
		<LandingSection
			id="como-funciona"
			label="Como funciona"
			title="Três passos para salvar uma vida"
			tone="teal"
			description="Do cadastro à doação, cuidamos de cada etapa com você — simples, seguro e acolhedor."
			surfaceClassName="bg-surface-2"
		>
			<motion.div
				{...gridReveal}
				className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[196px] lg:grid-cols-4"
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
						{/*
						 * O `whatsapp-logo.png` traz a palavra "WhatsApp" em verde
						 * escuro, que sumia sobre o cartao escuro. Aqui o simbolo vem
						 * do SVG (branco, sobre a bolha verde) e a palavra e texto, que
						 * acompanha o tema.
						 */}
						<span className="flex items-center gap-2">
							<span className="flex size-6 items-center justify-center rounded-full bg-[#25d366]">
								<img
									src={whatsappIcone}
									alt=""
									aria-hidden="true"
									className="size-4"
								/>
							</span>
							<span className="text-[15px] font-bold text-ink">WhatsApp</span>
						</span>
						<h3 className="mt-3 font-display text-[16px] font-bold leading-snug text-ink">
							Fale com a nossa equipe
						</h3>
						<p className="mt-1 text-[13px] text-ink-2">
							Tire dúvidas e comece a sua triagem.
						</p>
					</div>
					<div className="relative mt-4">
						<StatefulButton
							/*
							 * Aqui vai so o simbolo (ja branco no proprio arquivo), nao
							 * o `whatsapp-logo.png`: aquele e a marca com a palavra
							 * "WhatsApp" escrita, e dentro do botao virava
							 * "WhatsApp Chamar no WhatsApp", em verde escuro sobre
							 * verde. A marca completa segue no topo do cartao.
							 */
							icon={
								<img
									src={whatsappIcone}
									alt=""
									aria-hidden="true"
									className="size-5"
								/>
							}
							onClick={() => {
								window.open(
									buildLactareWhatsAppLink(EnumWhatsAppLinkContext.NewDonor),
									"_blank",
									"noopener,noreferrer",
								);
								// A aba abre na hora; a espera existe so para o giro
								// aparecer antes do certo.
								return new Promise((resolver) => setTimeout(resolver, 700));
							}}
							className="bg-[#25d366] text-white shadow-soft"
						>
							Chamar no WhatsApp
						</StatefulButton>
					</div>
				</motion.div>
			</motion.div>
		</LandingSection>
	);
}
