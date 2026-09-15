import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
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
	const [ciclo, setCiclo] = useState(0);
	const jaRepetiu = useRef(false);

	function repetirUmaVez() {
		if (jaRepetiu.current) {
			return;
		}

		jaRepetiu.current = true;
		setCiclo(1);
	}

	return (
		<motion.div
			variants={fadeScale}
			onMouseEnter={repetirUmaVez}
			className={cn(
				"relative isolate overflow-hidden rounded-card border border-white/55 bg-white/72 px-6 py-5 shadow-soft backdrop-blur-2xl backdrop-brightness-150 backdrop-saturate-150 lg:bg-white/50 transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1",
				"before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/55 before:via-white/10 before:to-transparent",
				className,
			)}
		>
			<span className="relative flex items-center gap-2">
				<Icon
					aria-hidden="true"
					strokeWidth={1.5}
					className="size-[22px] shrink-0 text-ink-on-fill/45"
				/>
				<CountUp
					key={ciclo}
					value={value}
					decimals={decimals}
					suffix={suffix}
					className="whitespace-nowrap font-display text-[28px] font-bold leading-none text-ink-on-fill"
				/>
			</span>
			<span className="relative mt-3 block text-[14px] font-semibold text-ink-on-fill">
				{label}
			</span>
			<span className="relative block text-[13px] text-ink-on-fill/75">
				{sublabel}
			</span>
		</motion.div>
	);
}
