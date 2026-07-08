import { motion } from "framer-motion";
import { Droplet, Heart, Users } from "lucide-react";
import { MetricCard } from "@/pages/private/home/components/MetricCard";
import { useReveal } from "../hooks/use-reveal";

const METRICS = [
	{
		iconBg: "bg-[#e6f1fb]",
		icon: <Users className="size-6 text-[#00458b]" />,
		value: "4.200+",
		valueColor: "text-[#00458b]",
		label: "Doadoras ativas",
		sublabel: "Em todo o Brasil",
	},
	{
		iconBg: "bg-[#e1f5ee]",
		icon: <Droplet className="size-6 text-[#0e9e94]" />,
		value: "12 mil L",
		valueColor: "text-[#0e9e94]",
		label: "Leite coletado",
		sublabel: "Doados aos bancos de leite",
	},
	{
		iconBg: "bg-[#fbeaf0]",
		icon: <Heart className="size-6 text-[#f2579f]" fill="#f2579f" />,
		value: "98%",
		valueColor: "text-[#f2579f]",
		label: "Satisfação",
		sublabel: "Das nossas doadoras",
	},
];

export function StatsBar() {
	const reveal = useReveal();

	return (
		<div className="relative z-10 mx-auto -mt-12 w-full max-w-[1100px] px-5 lg:-mt-16 lg:px-8">
			<motion.div
				{...reveal}
				className="flex flex-col gap-4 lg:flex-row lg:gap-6"
			>
				{METRICS.map((metric) => (
					<MetricCard
						key={metric.label}
						iconBg={metric.iconBg}
						icon={metric.icon}
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
