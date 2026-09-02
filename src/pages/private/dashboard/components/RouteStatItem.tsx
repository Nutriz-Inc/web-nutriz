import type { ReactNode } from "react";

type RouteStatItemProps = {
	icon: ReactNode;
	label: string;
	value: string;
	hint: string;
};

export function RouteStatItem({
	icon,
	label,
	value,
	hint,
}: RouteStatItemProps) {
	return (
		<div className="flex flex-col gap-2 rounded-xl border border-line bg-canvas p-4">
			<div className="flex items-center gap-2">
				{icon}
				<p className="text-[12px] text-ink-2">{label}</p>
			</div>
			<p className="text-[28px] font-bold leading-none text-ink">{value}</p>
			<p className="text-[11px] text-ink-3">{hint}</p>
		</div>
	);
}
