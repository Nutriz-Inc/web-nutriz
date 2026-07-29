import type { ReactNode } from "react";
import { DashboardCardHeader } from "./DashboardCardHeader";

type StatCardProps = {
	icon: ReactNode;
	iconBg: string;
	title: string;
	subtitle: string;
	value: string;
	valueColor?: string;
	footnote: string;
};

export function StatCard({
	icon,
	iconBg,
	title,
	subtitle,
	value,
	valueColor = "text-[#1f2a37]",
	footnote,
}: StatCardProps) {
	return (
		<div className="flex w-full flex-col gap-[22px] rounded-[18px] border border-[#e5e7eb] bg-white p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={icon}
				iconBg={iconBg}
				title={title}
				subtitle={subtitle}
			/>

			<div className="flex flex-col gap-1">
				<p className={`text-[36px] font-bold leading-none ${valueColor}`}>
					{value}
				</p>
				<p className="text-[12px] text-[#9ca3af]">{footnote}</p>
			</div>
		</div>
	);
}
