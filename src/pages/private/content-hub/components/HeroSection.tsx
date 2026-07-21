import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function HeroSection() {
	return (
		<motion.div
			initial="hidden"
			whileInView="show"
			viewport={viewportOnce}
			variants={fadeUp}
			className="flex flex-col gap-2"
		>
			<h1 className="text-[28px] font-extrabold text-[#09090b] lg:text-[34px]">
				Conteúdo educativo
			</h1>
			<p className="text-[15px] text-[#71717a]">
				Artigos, vídeos e guias práticos para acompanhar você em cada etapa da
				doação de leite materno.
			</p>
		</motion.div>
	);
}
