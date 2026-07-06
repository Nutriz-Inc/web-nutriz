import type { ReactNode } from "react";

export function DetailRow({
	icon,
	label,
	value,
}: {
	icon: ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-start gap-3">
			<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#387ccd]/15">
				{icon}
			</div>
			<div className="flex flex-col gap-0.5">
				<span className="text-[12px] text-[#888]">{label}</span>
				<span className="text-[12px] text-[#1a1a1a]">{value}</span>
			</div>
		</div>
	);
}