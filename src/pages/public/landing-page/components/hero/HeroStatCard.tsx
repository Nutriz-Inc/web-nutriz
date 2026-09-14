import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { CountUp } from "@/components/full/CountUp";
import { cn } from "@/lib/utils";
import { fadeScale } from "../../animations/variants";

type HeroStatCardProps = {
	Icon: LucideIcon;
	value: number;
	decimals?: number;
	suffix?: string;
	label: string;
	sublabel: string;
	className?: string;
};

export function HeroStatCard({
	Icon,
	value,
	decimals,
	suffix,
	label,
	sublabel,
	className,
}: HeroStatCardProps) {
	return (
		<motion.div
			variants={fadeScale}
			className={cn(
				"relative isolate overflow-hidden rounded-card border border-white/50 bg-white/20 px-5 py-4 shadow-lift backdrop-blur-2xl backdrop-brightness-[0.35] backdrop-saturate-150 transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1",
				"before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/35 before:via-white/10 before:to-transparent",
				className,
			)}
		>
			<span className="relative flex items-center gap-2">
				<Icon
					aria-hidden="true"
					strokeWidth={1.5}
					className="size-5 shrink-0 text-white/70"
				/>
				<CountUp
					value={value}
					decimals={decimals}
					suffix={suffix}
					className="whitespace-nowrap font-display text-[24px] font-bold leading-none text-white"
				/>
			</span>
			<span className="relative mt-2.5 block text-[13px] font-semibold text-white">
				{label}
			</span>
			<span className="relative block text-[12px] text-white/80">
				{sublabel}
			</span>
		</motion.div>
	);
}
