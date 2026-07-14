import type { LucideIcon } from "lucide-react";
import { Calendar, ChevronRight } from "lucide-react";
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
	waiting: "bg-[#dbe7f6] text-[#5a7690]",
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

	return (
		<div className="flex gap-4">
			<div className="flex flex-col items-center">
				<div
					className={cn(
						"flex size-9 shrink-0 items-center justify-center rounded-full text-[14px] font-bold",
						isCurrent
							? "bg-[#f2579f] text-white"
							: "border-[1.5px] border-[#f2579f] bg-white text-[#f2579f]",
					)}
				>
					{order}
				</div>
				{!isLast && (
					<div
						className={cn(
							"w-px flex-1",
							isCurrent ? "bg-[#f2579f]" : "bg-[#f6c9de]",
						)}
					/>
				)}
			</div>

			<div className="mb-6 flex-1 rounded-2xl bg-white p-5 shadow-[0px_14px_18px_rgba(10,38,77,0.08)]">
				<div className="flex items-center gap-3">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#dbe7f6]">
						<Icon className="size-5 text-[#00458b]" />
					</div>

					<p className="flex-1 text-[16px] font-bold text-[#0e2a45]">{title}</p>

					<span
						className={cn(
							"inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold",
							BADGE_CLASSNAME[visualStatus],
						)}
					>
						{BADGE_LABEL[visualStatus]}
					</span>

					<ChevronRight className="size-5 shrink-0 text-[#93a9bd]" />
				</div>

				<div className="my-4 h-px bg-[#e5ebf3]" />

				<div className="flex items-start gap-2">
					<Calendar className="mt-0.5 size-4 shrink-0 text-[#93a9bd]" />
					<p className="text-[14px] leading-[20px] text-[#5a7690]">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}
