import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/variants";
import { METRICS } from "../constants";
import { useReveal } from "../hooks/use-reveal";
import { HeroStat } from "./HeroStat";

/**
 * Faixa de numeros do hero.
 *
 * Era um trio de cartoes brancos que subia por cima do hero com `-mt-12` e
 * quebrava a faixa azul ao meio. Agora e uma unica peca de vidro dentro do
 * proprio hero, com as tres estatisticas separadas por fios — o azul segue
 * inteiro ate a proxima secao.
 */
export function StatsBar() {
	const reveal = useReveal(staggerContainer);

	return (
		<motion.div
			{...reveal}
			className="rounded-card mt-12 overflow-hidden border border-white/15 bg-white/8 backdrop-blur-md sm:mt-16"
		>
			<div className="grid divide-y divide-white/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
				{METRICS.map((metric) => (
					<motion.div key={metric.label} variants={fadeUp}>
						<HeroStat
							Icon={metric.Icon}
							accent={metric.accent}
							value={metric.value}
							label={metric.label}
							sublabel={metric.sublabel}
						/>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
}
