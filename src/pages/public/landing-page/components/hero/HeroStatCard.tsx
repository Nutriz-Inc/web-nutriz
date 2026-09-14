import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { CountUp } from "@/components/full/CountUp";
import { cn } from "@/lib/utils";
import { fadeScale } from "../../animations/variants";
import { HERO_GLASS } from "./tokens";

type HeroStatCardProps = {
	Icon: LucideIcon;
	value: number;
	decimals?: number;
	suffix?: string;
	label: string;
	sublabel: string;
	destaque?: boolean;
};

export function HeroStatCard({
	Icon,
	value,
	decimals,
	suffix,
	label,
	sublabel,
	destaque = false,
}: HeroStatCardProps) {
	return (
		<motion.div
			variants={fadeScale}
			style={{ backgroundColor: HERO_GLASS }}
			className="rounded-card-sm border border-white/20 px-4 py-3.5 backdrop-blur-md transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1"
		>
			<span className="flex items-center gap-2.5">
				<span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/15">
					<Icon aria-hidden="true" className="size-4 text-mint-bright" />
				</span>
				<CountUp
					value={value}
					decimals={decimals}
					suffix={suffix}
					className={cn(
						"whitespace-nowrap font-display font-bold leading-none text-white",
						destaque ? "text-[26px]" : "text-[20px]",
					)}
				/>
			</span>
			<span className="mt-2.5 block text-[12px] font-semibold text-canvas-on-fill">
				{label}
			</span>
			<span className="block text-[11px] text-canvas-on-fill">{sublabel}</span>
		</motion.div>
	);
}
