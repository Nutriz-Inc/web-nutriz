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

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={!isClickable}
			className={cn(
				"relative flex w-full flex-col gap-3 rounded-2xl bg-white p-4 text-left shadow-[0px_8px_16px_rgba(10,38,77,0.06)] transition-[transform,box-shadow] lg:gap-5 lg:rounded-3xl lg:p-8",
				isClickable
					? "active:scale-[0.99] hover:-translate-y-0.5 hover:shadow-[0px_12px_22px_rgba(10,38,77,0.12)]"
					: "cursor-default",
				className,
			)}
		>
			{!isClickable && (
				<span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-[#eef0f4] text-[#9aa3b8] lg:right-4 lg:top-4 lg:size-7">
					<Lock className="size-3.5 lg:size-4" />
				</span>
			)}

			<div className="flex items-start gap-3 lg:gap-4">
				<span
					className={cn(
						"flex size-10 shrink-0 items-center justify-center rounded-full lg:size-14",
						isInProgress ? "bg-[#e8f1fb]" : "bg-[#fce4f0]",
					)}
				>
					<Heart
						className={cn(
							"size-5 lg:size-7",
							isInProgress ? "text-[#387ccd]" : "text-[#f2579f]",
						)}
					/>
				</span>
				<div className="flex min-w-0 flex-1 flex-col gap-2 lg:gap-3">
					<div className="flex items-center justify-between gap-2">
						<div className="flex min-w-0 flex-1 items-center justify-between gap-2">
							<p className="truncate text-[16px] font-bold text-[#0e2a45] lg:text-[22px]">
								Doação #{number}
							</p>
							<DonationStatusBadge
								isActive={isInProgress}
								hasError={hasError}
							/>
						</div>
						{isClickable && (
							<ChevronRight className="size-5 shrink-0 text-[#9aa3b8] lg:size-6" />
						)}
					</div>
				</div>
			</div>

			<div className="flex items-center gap-2 text-[13px] text-[#6b8faa] lg:gap-2.5 lg:text-[14px]">
				<Calendar className="size-4 shrink-0 lg:size-[18px]" />
				Criada em {formattedDate}
			</div>

			{isInProgress && (
				<>
					<div className="h-px bg-[#e3e9f2]" />

					<div className="flex flex-col gap-2.5 rounded-xl bg-[#f4f7fb] p-3.5 lg:gap-3 lg:rounded-2xl lg:p-5">
						<div className="flex items-center justify-between gap-2">
							<span className="text-[10px] font-bold uppercase tracking-wider text-[#6b8faa] lg:text-[11px]">
								Etapa atual
							</span>
							<span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[#0e2a45] lg:text-[12px]">
								{currentStep}/{totalSteps}
							</span>
						</div>
						{stepLabel && (
							<p className="text-[16px] font-bold leading-tight text-[#0e2a45] lg:text-[19px]">
								{stepLabel}
							</p>
						)}
						<ProgressBar current={currentStep} total={totalSteps} />
					</div>
				</>
			)}
		</button>
	);
}
