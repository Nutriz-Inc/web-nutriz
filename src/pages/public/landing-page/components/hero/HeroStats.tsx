import { motion } from "framer-motion";
import { METRICS } from "../../constants";
import { HeroStatCard } from "./HeroStatCard";

const statsStagger = {
	hidden: {},
	show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

export function HeroStats() {
	const ultimo = METRICS.length - 1;

	return (
		<motion.div
			variants={statsStagger}
			className="relative grid w-full grid-cols-2 gap-3 lg:mx-auto lg:max-w-[62rem] lg:grid-cols-3 lg:gap-5"
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
					className={indice === ultimo ? "max-lg:col-span-2" : undefined}
				/>
			))}
		</motion.div>
	);
}
