import { Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { Status } from "@/components/full/Status";
import { cn } from "@/lib/utils";
import {
	EnumDonationStepStatus,
	type DonationStepTimeline,
} from "@/services/types/i-donation";
import { formatCreatedAt } from "@/utils/formatter";

const DOT_CLASSNAME: Record<EnumDonationStepStatus, string> = {
	[EnumDonationStepStatus.Pending]: "bg-[#854f0b]",
	[EnumDonationStepStatus.Review]: "bg-[#0f6e56]",
	[EnumDonationStepStatus.Done]: "bg-[#0f6e56]",
	[EnumDonationStepStatus.Warn]: "bg-[#a32d2d]",
	[EnumDonationStepStatus.Failed]: "bg-[#a32d2d]",
};

const DESCRIPTION_TRUNCATE_LENGTH = 110;

type Props = {
	entry: DonationStepTimeline;
	isLast: boolean;
};

export function TimelineEntry({ entry, isLast }: Props) {
	const [expanded, setExpanded] = useState(false);
	const isLong = entry.description.length > DESCRIPTION_TRUNCATE_LENGTH;

	return (
		<div className="flex gap-3">
			<div className="flex flex-col items-center">
				<div
					className={cn(
						"size-3 shrink-0 rounded-full",
						DOT_CLASSNAME[entry.status],
					)}
				/>
				{!isLast && <div className="mt-1 w-px flex-1 bg-[#e0e0e0]" />}
			</div>

			<div className={cn("min-w-0 flex-1", !isLast && "pb-4")}>
				<Status status={entry.status} />

				<p
					className={cn(
						"mt-1.5 text-[12px] leading-[18px] text-[#5a7690]",
						!expanded && isLong && "line-clamp-2",
					)}
				>
					{entry.description}
				</p>

				{isLong && (
					<button
						type="button"
						onClick={() => setExpanded((current) => !current)}
						className="mt-0.5 text-[12px] font-semibold text-[#387ccd]"
					>
						{expanded ? "Ver menos" : "Ver mais"}
					</button>
				)}

				<div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#9aa3b8]">
					{entry.set_date && (
						<span className="flex items-center gap-1">
							<Calendar className="size-3.5" />
							Previsto {formatCreatedAt(entry.set_date)}
						</span>
					)}
					<span className="flex items-center gap-1">
						<Clock className="size-3.5" />
						Registrado em {formatCreatedAt(entry.created_at)}
					</span>
				</div>
			</div>
		</div>
	);
}
