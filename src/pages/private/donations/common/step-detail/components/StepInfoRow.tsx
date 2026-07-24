import type { LucideIcon } from "lucide-react";

type Props = {
	icon: LucideIcon;
	label: string;
	value: string;
};

export function StepInfoRow({ icon: Icon, label, value }: Props) {
	return (
		<div className="flex items-start gap-3">
			<div className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#eaf3fc]">
				<Icon className="size-[18px] text-[#00458b]" />
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<span className="text-[11px] text-[#7a8aa0]">{label}</span>
				<span className="text-[14px] font-semibold text-[#1b2a41]">
					{value}
				</span>
			</div>
		</div>
	);
}
