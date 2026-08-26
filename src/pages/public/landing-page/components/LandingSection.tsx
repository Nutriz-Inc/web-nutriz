import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/full/SectionHeading";
import { cn } from "@/lib/utils";
import { useReveal } from "../hooks/use-reveal";

type LandingSectionProps = {
	id?: string;
	label: string;
	title: string;
	tone?: "blue" | "eva" | "teal" | "mint";
	description?: string;
	align?: "left" | "center";
	onDark?: boolean;
	surfaceClassName?: string;
	semDivisoria?: boolean;
	className?: string;
	children: ReactNode;
};

export function LandingSection({
	id,
	label,
	title,
	tone = "teal",
	description,
	align = "left",
	onDark = false,
	surfaceClassName,
	semDivisoria = false,
	className,
	children,
}: LandingSectionProps) {
	const headerReveal = useReveal();

	return (
		<section
			id={id}
			aria-labelledby={id ? `${id}-titulo` : undefined}
			className={cn(
				"scroll-mt-20 py-12 sm:py-16 lg:py-20",
				surfaceClassName,
				className,
			)}
		>
			<div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
				<motion.div {...headerReveal}>
					<SectionHeading
						id={id ? `${id}-titulo` : undefined}
						label={label}
						title={title}
						tone={tone}
						align={align}
						onDark={onDark}
						actionSlot={
							description && align === "left" ? (
								<p className="max-w-sm text-[15px] leading-relaxed text-ink-2 md:text-right">
									{description}
								</p>
							) : undefined
						}
					/>

					{description && align === "center" && (
						<p
							className={cn(
								"mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed",
								onDark ? "text-blue-tint-2" : "text-ink-2",
							)}
						>
							{description}
						</p>
					)}
				</motion.div>

				{!semDivisoria && (
					<hr
						className={cn(
							"mt-6 border-0 border-t",
							onDark ? "border-white/15" : "border-blue-tint-2/60",
						)}
					/>
				)}

				<div className="mt-8 lg:mt-10">{children}</div>
			</div>
		</section>
	);
}
