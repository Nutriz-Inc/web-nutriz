import { motion } from "framer-motion";
import { METRICS } from "../../constants";
import { HeroStatCard } from "./HeroStatCard";

const statsStagger = {
	hidden: {},
	show: { transition: { staggerChildren: 0.09, delayChildren: 0.28 } },
};

export function HeroStats() {
	return (
		<motion.div
			variants={statsStagger}
			className="hidden lg:absolute lg:right-12 lg:bottom-12 lg:flex lg:w-[15.5rem] lg:flex-col lg:gap-2.5"
		>
			{METRICS.map((metric, indice) => (
				<HeroStatCard
					key={metric.label}
					Icon={metric.Icon}
					value={metric.value}
					decimals={metric.decimals}
					suffix={metric.suffix}
					label={metric.label}
					sublabel={metric.sublabel}
					destaque={indice === 0}
				/>
			))}
		</motion.div>
	);
}
