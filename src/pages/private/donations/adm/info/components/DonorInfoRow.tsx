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
			<span className="text-[12px] font-semibold text-[#6b7280]">{label}</span>
			<div className="flex items-center gap-2.5 rounded-[10px] border border-[#e7eaef] bg-white px-3.5 py-3">
				<Icon className="size-4 shrink-0 text-[#9ca3af]" />
				{isCopyable ? (
					<CopyableId
						id={value}
						className="flex-1 text-[14px] font-semibold text-[#1f2a37]"
					/>
				) : (
					<span className="truncate text-[14px] font-semibold text-[#1f2a37]">
						{value}
					</span>
				)}
			</div>
		</div>
	);
}
