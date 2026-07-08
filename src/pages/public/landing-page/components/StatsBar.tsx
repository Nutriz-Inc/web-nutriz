import { motion } from "framer-motion";
import { STATS, type Stat } from "../data/landing-content";
import { useCountUp } from "../hooks/use-count-up";
import { useReveal } from "../hooks/use-reveal";

function StatItem({ stat }: { stat: Stat }) {
	const { ref, value } = useCountUp(stat.target);
	const display =
		stat.format === "thousands" ? value.toLocaleString("pt-BR") : String(value);

	return (
		<div className="flex flex-col items-center gap-1 px-4 text-center">
			<span
				ref={ref}
				className="text-[34px] font-extrabold leading-none lg:text-[40px]"
				style={{ color: stat.color }}
			>
				{stat.prefix}
				{display}
				{stat.suffix}
			</span>
			<span className="text-[13px] font-medium text-[#64748b]">
				{stat.label}
			</span>
		</div>
	);
}

export function StatsBar() {
	const reveal = useReveal();

	return (
		<div className="relative z-10 mx-auto -mt-12 w-full max-w-[900px] px-5 lg:-mt-16 lg:px-8">
			<motion.div
				{...reveal}
				className="grid grid-cols-1 divide-y divide-[#e6ecf5] rounded-2xl border border-[#e6ecf5] bg-white px-4 py-6 shadow-xl shadow-[#0a3a87]/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
			>
				{STATS.map((stat) => (
					<StatItem key={stat.label} stat={stat} />
				))}
			</motion.div>
		</div>
	);
}
