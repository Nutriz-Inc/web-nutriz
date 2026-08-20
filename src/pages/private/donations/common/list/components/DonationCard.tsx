import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronRight, Heart, Lock } from "lucide-react";
import { DonationStatusBadge } from "@/components/full/DonationStatusBadge";
import { cn } from "@/lib/utils";
import { formatCreatedAt } from "@/utils/formatter";
import { ProgressBar } from "./ProgressBar";

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

	// O clique afunda o card e ele volta antes de a rota trocar: sem a pausa,
	// a navegacao come a animacao e o toque parece nao ter resposta.
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
			whileHover={animar ? { x: 3, scale: 1.004 } : undefined}
			whileTap={animar ? { scale: 0.993 } : undefined}
			transition={{ type: "spring", stiffness: 260, damping: 30 }}
			className={cn(
				"group relative flex w-full flex-col gap-3 overflow-hidden rounded-2xl bg-white p-4 text-left shadow-soft transition-[box-shadow,border-radius] lg:gap-5 lg:rounded-3xl lg:p-8",
				isClickable
					? "hover:rounded-l-none hover:shadow-lift focus-visible:rounded-l-none"
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

			<div className="flex items-start gap-3 lg:gap-4">
				<span
					className={cn(
						"flex size-10 shrink-0 items-center justify-center rounded-full lg:size-14",
						isInProgress ? "bg-blue-tint" : "bg-eva-tint",
					)}
				>
					<Heart
						className={cn(
							"size-5 lg:size-7",
							isInProgress ? "text-blue-bright" : "text-eva",
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
							<p className="truncate text-[16px] font-bold text-ink lg:text-[22px]">
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

			<div className="flex items-center gap-2 text-[13px] text-ink-2 lg:gap-2.5 lg:text-[14px]">
				<Calendar className="size-4 shrink-0 lg:size-[18px]" />
				Criada em {formattedDate}
			</div>

			{isInProgress && (
				<>
					<div className="h-px bg-blue-tint" />

					<div className="flex flex-col gap-2.5 rounded-xl bg-surface-3 p-3.5 lg:gap-3 lg:rounded-2xl lg:p-5">
						<div className="flex items-center justify-between gap-2">
							<span className="text-[10px] font-bold uppercase tracking-wider text-ink-2 lg:text-[11px]">
								Etapa atual
							</span>
							<span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-ink lg:text-[12px]">
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
