import type { ReactNode } from "react";

type DashboardCardHeaderProps = {
	icon: ReactNode;
	iconBg: string;
	title: string;
	subtitle: string;
};

export function DashboardCardHeader({
	icon,
	iconBg,
	title,
	subtitle,
}: DashboardCardHeaderProps) {
	return (
		<div className="flex flex-col gap-[22px] w-full">
			<div className="flex items-center gap-3">
				<div
					className={`${iconBg} flex size-10 shrink-0 items-center justify-center rounded-full`}
				>
					{icon}
				</div>
				<div className="flex flex-col gap-0.5">
					<p className="text-[15px] font-semibold text-ink">{title}</p>
					<p className="text-[12px] text-ink-2">{subtitle}</p>
				</div>
			</div>
			<div className="h-px w-full bg-blue-tint" />
		</div>
	);
}
