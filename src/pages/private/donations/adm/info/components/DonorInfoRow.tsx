import type { LucideIcon } from "lucide-react";
import { CopyableId } from "@/components/full/CopyableId";

type Props = {
	icon: LucideIcon;
	label: string;
	value: string;
	isCopyable?: boolean;
};

export function DonorInfoRow({
	icon: Icon,
	label,
	value,
	isCopyable = false,
}: Props) {
	return (
		<div className="flex flex-col gap-1.5">
			<span className="text-[12px] font-semibold text-ink-2">{label}</span>
			<div className="flex items-center gap-2.5 rounded-card-sm border border-line bg-white px-3.5 py-3">
				<Icon className="size-4 shrink-0 text-ink-3" />
				{isCopyable ? (
					<CopyableId
						id={value}
						className="flex-1 text-[14px] font-semibold text-ink"
					/>
				) : (
					<span className="truncate text-[14px] font-semibold text-ink">
						{value}
					</span>
				)}
			</div>
		</div>
	);
}
