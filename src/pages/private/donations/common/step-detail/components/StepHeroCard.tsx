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
		<div className="flex flex-col gap-4 rounded-2xl border border-[#e3eaf2] bg-white p-5 shadow-[0px_6px_10px_rgba(15,26,51,0.06)]">
			<div className="flex justify-start">
				<button
					type="button"
					onClick={onViewTimeline}
					className="flex items-center gap-1.5 text-[13px] font-semibold text-[#00458b]"
				>
					<History className="size-[18px]" />
					Ver timeline
				</button>
			</div>

			<div className="flex flex-col items-center gap-3">
				<div className="flex size-[76px] items-center justify-center rounded-full bg-[#e5f1fc]">
					{Icon && <Icon className="size-[30px] text-[#00458b]" />}
				</div>

				<p className="text-center text-[19px] font-bold text-[#1b2a41]">
					{title}
				</p>
				<p className="text-center text-[13px] text-[#6b8faa]">{description}</p>

				<Status status={status} size="lg" dot />
			</div>
		</div>
	);
}
