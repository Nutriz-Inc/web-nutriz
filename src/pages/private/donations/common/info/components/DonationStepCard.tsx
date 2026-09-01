import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StepDot } from "@/components/ui/step-dot";
import { cn } from "@/lib/utils";
import { formatDateTimeParts } from "@/utils/formatter";
import { BADGE_LABEL, BADGE_TONE, type StepVisualStatus } from "../constants";

interface Props {
	order: number;
	title: string;
	description: string;
	setDate?: string;
	completedAt?: string;
	icon: LucideIcon;
	visualStatus: StepVisualStatus;
	isLast: boolean;
	justChanged?: boolean;
	onClick?: () => void;
}

export function DonationStepCard({
	order,
	title,
	description,
	setDate,
	completedAt,
	icon: Icon,
	visualStatus,
	isLast,
	justChanged = false,
	onClick,
}: Props) {
	const isCurrent = visualStatus === "current";
	const isDone = visualStatus === "done";
	const isClickable = Boolean(onClick);

	const stampSource = completedAt ?? (isCurrent ? setDate : undefined);
	const stamp = stampSource ? formatDateTimeParts(stampSource) : undefined;

	const reduzirMovimento = useReducedMotion();
	const animar = isClickable && !reduzirMovimento;

	function handleClick() {
		if (!onClick) {
			return;
		}
		if (!animar) {
			onClick();
			return;
		}
		window.setTimeout(onClick, 140);
	}

	return (
		<div className="flex gap-3.5 lg:gap-4">
			<div className="flex flex-col items-center">
				<StepDot
					status={visualStatus}
					order={order}
					className={isCurrent ? "size-9 text-[14px]" : "size-7 text-[12px]"}
				/>

				{!isLast && (
					<div
						className={cn(
							"my-1.5 flex-1",
							isDone
								? "w-0.5 rounded-full bg-blue-bright-fill"
								: "w-0 border-l-2 border-dashed border-blue-tint-2",
						)}
					/>
				)}
			</div>

			<motion.button
				type="button"
				onClick={handleClick}
				disabled={!isClickable}
				whileHover={animar ? { x: 6 } : undefined}
				whileTap={animar ? { x: 2 } : undefined}
				transition={{ type: "spring", stiffness: 260, damping: 30 }}
				className={cn(
					"group relative mb-4 flex-1 overflow-hidden rounded-xl p-3.5 text-left transition-[border-radius] disabled:cursor-default lg:rounded-2xl lg:p-5",
					isCurrent
						? "bg-blue-tint/70"
						: isDone
							? "bg-surface-3"
							: "bg-surface-2",
					isClickable && "hover:rounded-l-none focus-visible:rounded-l-none",
					justChanged && "motion-safe:brilho-etapa",
				)}
			>
				{isClickable && (
					<span
						aria-hidden="true"
						className="absolute inset-y-0 left-0 w-1.5 origin-left scale-x-0 bg-blue-deep transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
					/>
				)}

				{justChanged && (
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-eva/20 to-transparent motion-safe:varredura-etapa"
					/>
				)}

				<div className="flex items-start gap-3">
					<div className="flex min-w-0 flex-1 flex-col gap-2">
						<div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
							<Icon
								className={cn(
									"size-[18px] shrink-0",
									isCurrent
										? "text-blue-bright"
										: isDone
											? "text-success"
											: "text-ink-3",
								)}
							/>

							<p
								className={cn(
									"min-w-0 break-words font-bold",
									isCurrent
										? "text-[16px] text-ink lg:text-[18px]"
										: isDone
											? "text-[15px] text-ink lg:text-[16px]"
											: "text-[15px] text-ink-3 lg:text-[16px]",
								)}
							>
								{title}
							</p>

							<Badge
								tone={BADGE_TONE[visualStatus]}
								size="sm"
								caps
								dot={isCurrent}
								className="px-2 py-0.5 text-[10px] tracking-wider lg:text-[11px]"
							>
								{isDone && <Check className="size-3" strokeWidth={3} />}
								{BADGE_LABEL[visualStatus]}
							</Badge>
						</div>

						<p
							className={cn(
								"text-[13px] leading-[19px] lg:text-[14px] lg:leading-[20px]",
								isCurrent || isDone ? "text-ink-2" : "text-ink-3",
							)}
						>
							{description}
						</p>
					</div>

					<div className="flex shrink-0 items-start gap-2">
						<div className="flex flex-col items-end leading-tight">
							{stamp ? (
								<>
									<span className="text-[12px] font-semibold text-ink-2 lg:text-[13px]">
										{stamp.date}
									</span>
									<span className="text-[11px] text-ink-3 lg:text-[12px]">
										{stamp.time}
									</span>
								</>
							) : (
								<span className="text-[13px] text-ink-3">—</span>
							)}
						</div>

						{isClickable && (
							<ChevronRight className="mt-0.5 size-5 shrink-0 text-ink-3" />
						)}
					</div>
				</div>
			</motion.button>
		</div>
	);
}
