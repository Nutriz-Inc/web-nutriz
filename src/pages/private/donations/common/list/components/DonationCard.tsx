import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronRight, Heart, Lock } from "lucide-react";
import { DonationStatusBadge } from "@/components/full/DonationStatusBadge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";
import { formatCreatedAt } from "@/utils/formatter";

type DonationCardProps = {
	number: number;
	isInProgress: boolean;
	hasError: boolean;
	createdAt: string;
	currentStep: number;
	totalSteps: number;
	stepLabel?: string;
	isClickable?: boolean;
	onClick?: () => void;
	className?: string;
};

export function DonationCard({
	number,
	isInProgress,
	hasError,
	createdAt,
	currentStep,
	totalSteps,
	stepLabel,
	isClickable = true,
	onClick,
	className,
}: DonationCardProps) {
	const formattedDate = formatCreatedAt(createdAt);
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
		<motion.button
			type="button"
			onClick={handleClick}
			disabled={!isClickable}
			whileHover={animar ? { x: 6 } : undefined}
			whileTap={animar ? { x: 2 } : undefined}
			transition={{ type: "spring", stiffness: 260, damping: 30 }}
			className={cn(
				"group relative flex w-full flex-col overflow-hidden rounded-2xl bg-surface text-left shadow-soft transition-[box-shadow,border-radius] lg:rounded-3xl",
				isInProgress
					? "gap-3 p-4 lg:gap-5 lg:p-8"
					: "gap-2 p-3.5 lg:gap-2.5 lg:p-5",
				isClickable
					? "hover:rounded-l-none focus-visible:rounded-l-none"
					: "cursor-default",
				className,
			)}
		>
			{isClickable && (
				<span
					aria-hidden="true"
					className="absolute inset-y-0 left-0 w-1.5 origin-left scale-x-0 bg-blue-deep transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
				/>
			)}
			{!isClickable && (
				<span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-surface-3 text-ink-3 lg:right-4 lg:top-4 lg:size-7">
					<Lock className="size-3.5 lg:size-4" />
				</span>
			)}

			<div
				className={cn("flex items-center gap-3", isInProgress && "lg:gap-4")}
			>
				<span
					className={cn(
						"flex shrink-0 items-center justify-center rounded-full",
						isInProgress
							? "size-10 bg-blue-tint lg:size-14"
							: "size-9 bg-eva-tint lg:size-10",
					)}
				>
					<Heart
						className={cn(
							isInProgress
								? "size-5 text-blue-bright lg:size-7"
								: "size-4 text-eva-deep lg:size-[18px]",
						)}
					/>
				</span>
				<div className="flex min-w-0 flex-1 flex-col gap-2 lg:gap-3">
					<div
						className={cn(
							"flex items-center justify-between gap-2",
							!isClickable && "pr-8 lg:pr-9",
						)}
					>
						<div className="flex min-w-0 flex-1 items-center justify-between gap-2">
							<p
								className={cn(
									"truncate font-bold text-ink",
									isInProgress
										? "text-[16px] lg:text-[22px]"
										: "text-[15px] lg:text-[17px]",
								)}
							>
								Doação #{number}
							</p>
							<DonationStatusBadge
								isActive={isInProgress}
								hasError={hasError}
							/>
						</div>
						{isClickable && (
							<ChevronRight className="size-5 shrink-0 text-ink-3 lg:size-6" />
						)}
					</div>
				</div>
			</div>

			<div
				className={cn(
					"flex items-center gap-2",
					isInProgress
						? "text-[13px] text-ink-2 lg:gap-2.5 lg:text-[14px]"
						: "text-[12.5px] text-ink-3 lg:text-[13px]",
				)}
			>
				<Calendar
					className={cn(
						"shrink-0",
						isInProgress ? "size-4 lg:size-[18px]" : "size-3.5 lg:size-4",
					)}
				/>
				Criada em {formattedDate}
			</div>

			{isInProgress && (
				<>
					<div className="h-px bg-blue-tint" />

					<div className="group/etapa relative flex flex-col gap-2.5 overflow-hidden rounded-xl bg-surface-3 p-3.5 transition-[transform,border-radius,background-color] duration-200 hover:translate-x-2 hover:rounded-l-none hover:bg-blue-tint/60 lg:gap-3 lg:rounded-2xl lg:p-5">
						<span
							aria-hidden="true"
							className="absolute inset-y-0 left-0 w-1 origin-left scale-x-0 bg-blue-bright transition-transform duration-200 group-hover/etapa:scale-x-100"
						/>

						<div className="flex items-center justify-between gap-2">
							<span className="text-[10px] font-bold uppercase tracking-wider text-ink-2 lg:text-[11px]">
								Etapa atual
							</span>
							<span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-bold text-ink lg:text-[12px]">
								{currentStep}/{totalSteps}
							</span>
						</div>
						{stepLabel && (
							<p className="text-[16px] font-bold leading-tight text-ink lg:text-[18px]">
								{stepLabel}
							</p>
						)}
						<ProgressBar current={currentStep} total={totalSteps} />
					</div>
				</>
			)}
		</motion.button>
	);
}
