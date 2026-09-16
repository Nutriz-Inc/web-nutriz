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
	compacto?: boolean;
	className?: string;
};

export function HeroStatCard({
	Icon,
	value,
	decimals,
	suffix,
	label,
	sublabel,
	compacto = false,
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
				"relative isolate flex flex-col justify-center overflow-hidden rounded-card border border-white/55 bg-white/72 px-4 shadow-soft lg:block lg:min-h-0 lg:px-6 lg:py-5 backdrop-blur-2xl backdrop-brightness-150 backdrop-saturate-150 lg:bg-white/50 transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1",
				"before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/55 before:via-white/10 before:to-transparent",
				compacto ? "py-3" : "min-h-[7.25rem] py-4",
				className,
			)}
		>
			<span className="relative mx-auto flex w-fit items-center gap-2 lg:mx-0 lg:w-auto">
				<Icon
					aria-hidden="true"
					strokeWidth={1.5}
					className="size-[19px] shrink-0 text-ink-on-fill/45 lg:size-[22px]"
				/>
				<CountUp
					key={ciclo}
					value={value}
					decimals={decimals}
					suffix={suffix}
					className="whitespace-nowrap font-display text-[24px] font-bold leading-none text-ink-on-fill lg:text-[28px]"
				/>
			</span>
			<span className="relative mx-auto mt-2.5 block w-fit text-[13px] font-semibold text-ink-on-fill lg:mx-0 lg:mt-3 lg:w-auto lg:text-[14px]">
				{label}
			</span>
			<span
				className={cn(
					"relative mx-auto block w-fit text-[12px] leading-snug text-ink-on-fill/75 lg:mx-0 lg:min-h-0 lg:w-auto lg:text-[13px]",
					compacto ? undefined : "min-h-[2.125rem]",
				)}
			>
				{sublabel}
			</span>
		</motion.div>
	);
}
