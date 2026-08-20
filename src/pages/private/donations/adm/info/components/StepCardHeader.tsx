import type { LucideIcon } from "lucide-react";
import { History } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	icon: LucideIcon;
	label: string;
	isDone: boolean;
	isFailed: boolean;
	hasStep: boolean;
	onViewTimeline: () => void;
};

export function StepCardHeader({
	icon: Icon,
	label,
	isDone,
	isFailed,
	hasStep,
	onViewTimeline,
}: Props) {
	return (
		<div className="flex items-center justify-between gap-3">
			<div className="flex min-w-0 flex-1 items-center gap-3.5">
				<div
					className={cn(
						"flex size-11 shrink-0 items-center justify-center rounded-xl",
						isFailed
							? "bg-danger-tint text-danger"
							: isDone
								? "bg-teal-tint text-teal"
								: "bg-blue-tint text-blue-deep",
					)}
				>
					<Icon className="size-[18px]" />
				</div>
				<p className="truncate text-[16px] font-bold text-ink">{label}</p>
			</div>

			{hasStep && (
				<button
					type="button"
					onClick={onViewTimeline}
					className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-blue-deep hover:bg-blue-tint"
				>
					<History className="size-4" />
					Ver timeline
				</button>
			)}
		</div>
	);
}
