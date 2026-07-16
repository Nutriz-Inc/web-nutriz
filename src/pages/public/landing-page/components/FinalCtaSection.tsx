import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useReveal } from "../hooks/use-reveal";
import { ActivityBadge } from "./ActivityBadge";
import { CTA_AVATARS } from "./constants";
import { HeroBackground } from "./HeroBackground";
import { SlideButton } from "./SlideButton";

export function FinalCtaSection() {
	const navigate = useNavigate();
	const reveal = useReveal();

	return (
		<section className="bg-[#f5f7fb] py-20 lg:py-24">
			<div className="mx-auto w-full max-w-[1200px] px-5 lg:px-8">
				<motion.div
					{...reveal}
					className="rounded-[34px] bg-white p-2 shadow-xl shadow-[#0a3a87]/10"
				>
					<div className="relative isolate overflow-hidden rounded-[26px]">
						<HeroBackground />

						<div className="relative z-10 flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-14">
							<div className="max-w-lg">
								<ActivityBadge label="Junte-se a nós" dotColor="#72f2eb" />

								<h2 className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px] lg:text-[40px]">
									Pronta para fazer a diferença?
								</h2>

								<p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#c7d6f0] sm:text-[16px]">
									Cadastre-se agora e comece sua jornada de doação.
								</p>
							</div>

							<div className="flex flex-col items-start gap-5 lg:items-end">
								<div className="flex w-full flex-col gap-3 sm:flex-row lg:justify-end">
									<SlideButton
										label="Quero ser doadora"
										onClick={() => navigate("/registro")}
										className="w-full sm:w-auto"
									/>
									<Button
										onClick={() => navigate("/login")}
										className="h-12 w-full rounded-full border border-white/40 bg-transparent px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
									>
										Já sou doadora — fazer login
									</Button>
								</div>

								<div className="flex items-center gap-3">
									<div className="flex -space-x-2" aria-hidden>
										{CTA_AVATARS.map((color) => (
											<span
												key={color}
												className="size-8 rounded-full border-2 border-white"
												style={{ backgroundColor: color }}
											/>
										))}
									</div>
									<span className="text-[13px] text-[#c7d6f0]">
										<span className="font-bold text-white">4.200+</span>{" "}
										doadoras já fazem parte
									</span>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
