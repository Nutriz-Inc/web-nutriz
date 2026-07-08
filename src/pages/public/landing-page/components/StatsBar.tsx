import { motion } from "framer-motion";
import { MetricCard } from "@/pages/private/home/components/MetricCard";
import { useReveal } from "../hooks/use-reveal";
import { METRICS } from "./constants";

export function StatsBar() {
	const reveal = useReveal();

	return (
		<div className="relative z-10 mx-auto -mt-12 w-full max-w-[1100px] px-5 lg:-mt-16 lg:px-8">
			<motion.div
				{...reveal}
				className="flex flex-col gap-4 lg:flex-row lg:gap-6"
			>
				{METRICS.map(({ Icon, iconClassName, ...metric }) => (
					<MetricCard
						key={metric.label}
						iconBg={metric.iconBg}
						icon={<Icon className={iconClassName} />}
						value={metric.value}
						valueColor={metric.valueColor}
						label={metric.label}
						sublabel={metric.sublabel}
					/>
				))}
			</motion.div>
		</div>
	);
}
