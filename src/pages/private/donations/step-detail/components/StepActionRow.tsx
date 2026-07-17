import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
	icon: ReactNode;
	label: string;
	onClick: () => void;
};

export function StepActionRow({ icon, label, onClick }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex w-full items-center gap-3 rounded-xl py-1 text-left transition-colors hover:bg-[#f4f7fb]"
		>
			<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#387ccd]/15">
				{icon}
			</div>
			<span className="flex-1 text-[13px] font-semibold text-[#387ccd]">
				{label}
			</span>
			<ChevronRight className="size-4 shrink-0 text-[#387ccd]" />
		</button>
	);
}
