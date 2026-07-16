import type { LucideIcon } from "lucide-react";
import { Calendar, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepVisualStatus = "done" | "current" | "waiting";

const BADGE_LABEL: Record<StepVisualStatus, string> = {
	done: "CONCLUÍDO",
	current: "EM ANDAMENTO",
	waiting: "AGUARDANDO",
};

const BADGE_CLASSNAME: Record<StepVisualStatus, string> = {
	done: "bg-[#e1f5ee] text-[#0f6e56]",
	current: "bg-[#dbe7f6] text-[#00458b]",
	waiting: "bg-[#eef0f4] text-[#9aa3b8]",
};

interface Props {
	order: number;
	title: string;
	description: string;
	icon: LucideIcon;
	visualStatus: StepVisualStatus;
	isLast: boolean;
}

export function DonationStepCard({
	order,
	title,
	description,
	icon: Icon,
	visualStatus,
	isLast,
}: Props) {
	const isCurrent = visualStatus === "current";
	const isDone = visualStatus === "done";

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

			<div
				className={cn(
					"flex-1 rounded-2xl bg-white transition-shadow",
					isCurrent
						? "mb-6 p-5 shadow-[0px_14px_18px_rgba(10,38,77,0.08)] hover:shadow-[0px_18px_24px_rgba(10,38,77,0.14)]"
						: "mb-4 p-3.5 shadow-[0px_6px_10px_rgba(10,38,77,0.04)] hover:shadow-[0px_8px_14px_rgba(10,38,77,0.08)]",
					!isCurrent && !isDone && "bg-[#fafbfc]",
				)}
			>
				<div className="flex items-center gap-3">
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
							"flex-1 font-bold",
							isCurrent
								? "text-[16px] text-[#0e2a45]"
								: isDone
									? "text-[14px] text-[#0e2a45]/80"
									: "text-[14px] text-[#b7bcc7]",
						)}
					>
						{title}
					</p>

					<span
						className={cn(
							"inline-flex shrink-0 items-center rounded-full font-semibold",
							isCurrent ? "px-2.5 py-1 text-[11px]" : "px-2 py-0.5 text-[10px]",
							BADGE_CLASSNAME[visualStatus],
						)}
					>
						{BADGE_LABEL[visualStatus]}
					</span>

					<ChevronRight
						className={cn(
							"shrink-0",
							isCurrent ? "size-5 text-[#93a9bd]" : "size-4 text-[#c3c8d1]",
						)}
					/>
				</div>

				{isCurrent && (
					<>
						<div className="my-4 h-px bg-[#e5ebf3]" />

						<div className="flex items-start gap-2">
							<Calendar className="mt-0.5 size-4 shrink-0 text-[#93a9bd]" />
							<p className="text-[14px] leading-[20px] text-[#5a7690]">
								{description}
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
