import type { LucideIcon } from "lucide-react";
import { History } from "lucide-react";
import { Status } from "@/components/full/Status";
import type { EnumDonationStepStatus } from "@/services/types/i-donation";

type Props = {
	icon?: LucideIcon;
	title: string;
	description: string;
	status: EnumDonationStepStatus;
	onViewTimeline: () => void;
};

export function StepHeroCard({
	icon: Icon,
	title,
	description,
	status,
	onViewTimeline,
}: Props) {
	return (
		<div className="flex flex-col gap-4 rounded-card-sm border border-line bg-surface p-5 shadow-soft">
			<div className="flex justify-start">
				<button
					type="button"
					onClick={onViewTimeline}
					className="flex items-center gap-1.5 text-[13px] font-semibold text-blue-deep"
				>
					<History className="size-[18px]" />
					Ver timeline
				</button>
			</div>

			<div className="flex flex-col items-center gap-3">
				<div className="flex size-[76px] items-center justify-center rounded-full bg-blue-tint">
					{Icon && <Icon className="size-[30px] text-blue-deep" />}
				</div>

				<p className="text-center text-[18px] font-bold text-ink">{title}</p>
				<p className="text-center text-[13px] text-ink-2">{description}</p>

				<Status status={status} size="lg" dot />
			</div>
		</div>
	);
}
