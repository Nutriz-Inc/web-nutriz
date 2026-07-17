import type { LucideIcon } from "lucide-react";
import { Calendar, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCreatedAt } from "@/utils/formatter";
import {
	BADGE_CLASSNAME,
	BADGE_LABEL,
	type StepVisualStatus,
} from "../constants";

interface Props {
	order: number;
	title: string;
	description: string;
	setDate?: string;
	completedAt?: string;
	icon: LucideIcon;
	visualStatus: StepVisualStatus;
	isLast: boolean;
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
	onClick,
}: Props) {
	const isCurrent = visualStatus === "current";
	const isDone = visualStatus === "done";
	const hasCurrentDetails = isCurrent && Boolean(setDate);
	const hasCompletedInfo = Boolean(completedAt);
	const isClickable = Boolean(onClick);

	return (
		<div className="flex gap-4">
			<div className="flex flex-col items-center">
				<div
					className={cn(
						"flex shrink-0 items-center justify-center rounded-full font-bold transition-all",
						isCurrent
							? "size-9 bg-[#f2579f] text-[14px] text-white"
							: isDone
								? "size-7 bg-[#f2579f] text-white"
								: "size-7 border-[1.5px] border-[#dcd0d7] bg-white text-[12px] text-[#c3b6c0]",
					)}
				>
					{isDone ? <Check className="size-3.5" /> : order}
				</div>
				{!isLast && (
					<div
						className={cn(
							"w-px flex-1",
							isCurrent || isDone ? "bg-[#f2579f]" : "bg-[#e5e5ea]",
						)}
					/>
				)}
			</div>

			<button
				type="button"
				onClick={onClick}
				disabled={!isClickable}
				className={cn(
					"flex-1 rounded-2xl bg-white text-left transition-shadow disabled:cursor-default",
					isCurrent ? "mb-6 p-5" : "mb-4 p-3.5",
					isCurrent
						? "shadow-[0px_14px_18px_rgba(10,38,77,0.08)]"
						: "shadow-[0px_6px_10px_rgba(10,38,77,0.04)]",
					isClickable &&
						(isCurrent
							? "hover:shadow-[0px_18px_24px_rgba(10,38,77,0.14)]"
							: "hover:shadow-[0px_8px_14px_rgba(10,38,77,0.08)]"),
					!isCurrent && !isDone && "bg-[#fafbfc]",
				)}
			>
				<div className="flex items-start gap-3">
					<div
						className={cn(
							"flex shrink-0 items-center justify-center rounded-full transition-all",
							isCurrent
								? "size-11 bg-[#dbe7f6] text-[#00458b]"
								: isDone
									? "size-8 bg-[#e1f5ee] text-[#0f6e56]"
									: "size-8 bg-[#eef0f4] text-[#b7bcc7]",
						)}
					>
						<Icon className={isCurrent ? "size-5" : "size-4"} />
					</div>

					<p
						className={cn(
							"min-w-0 flex-1 break-words font-bold",
							isCurrent
								? "text-[16px] text-[#0e2a45]"
								: isDone
									? "text-[14px] text-[#0e2a45]/80"
									: "text-[14px] text-[#b7bcc7]",
						)}
					>
						{title}
					</p>

					<ChevronRight
						className={cn(
							"mt-0.5 shrink-0",
							isCurrent ? "size-5 text-[#93a9bd]" : "size-4 text-[#c3c8d1]",
						)}
					/>
				</div>

				<div
					className={cn(
						"mt-1.5 flex flex-col gap-1.5",
						isCurrent ? "pl-14" : "pl-11",
					)}
				>
					<span
						className={cn(
							"inline-flex w-fit items-center rounded-full font-semibold",
							isCurrent ? "px-2.5 py-1 text-[11px]" : "px-2 py-0.5 text-[10px]",
							BADGE_CLASSNAME[visualStatus],
						)}
					>
						{BADGE_LABEL[visualStatus]}
					</span>

					<p
						className={
							isCurrent
								? "text-[13px] text-[#6b8faa]"
								: "text-[12px] text-[#c3c8d1]"
						}
					>
						{description}
					</p>
				</div>

				{(hasCurrentDetails || hasCompletedInfo) && (
					<>
						<div
							className={cn("h-px bg-[#e5ebf3]", isCurrent ? "my-4" : "my-3")}
						/>

						<div className="flex flex-col gap-2">
							{isCurrent && setDate && (
								<div className="flex items-start gap-2">
									<Calendar className="mt-0.5 size-4 shrink-0 text-[#93a9bd]" />
									<p className="text-[14px] leading-[20px] text-[#5a7690]">
										{formatCreatedAt(setDate)}
									</p>
								</div>
							)}

							{completedAt && (
								<div className="flex items-start gap-2">
									<Check className="mt-0.5 size-3.5 shrink-0 text-[#00458b]" />
									<p
										className={cn(
											"leading-[18px] text-[#00458b]",
											isCurrent ? "text-[13px]" : "text-[12px]",
										)}
									>
										Concluído em {formatCreatedAt(completedAt)}
									</p>
								</div>
							)}
						</div>
					</>
				)}
			</button>
		</div>
	);
}
