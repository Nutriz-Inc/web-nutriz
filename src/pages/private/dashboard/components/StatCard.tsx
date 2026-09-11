import type { ReactNode } from "react";
import { CountUp } from "@/components/full/CountUp";
import { DashboardCardHeader } from "./DashboardCardHeader";

type StatCardProps = {
	icon: ReactNode;
	iconBg: string;
	title: string;
	subtitle: string;
	value: number | null;
	decimals?: number;
	suffix?: string;
	valueColor?: string;
	footnote: string;
};

export function StatCard({
	icon,
	iconBg,
	title,
	subtitle,
	value,
	decimals = 0,
	suffix = "",
	valueColor = "text-ink",
	footnote,
}: StatCardProps) {
	return (
		<div className="flex w-full flex-col gap-[22px] rounded-card-sm border border-line bg-surface p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={icon}
				iconBg={iconBg}
				title={title}
				subtitle={subtitle}
			/>

			<div className="flex flex-col gap-1">
				<p
					className={`text-[36px] font-bold leading-none tabular-nums ${valueColor}`}
				>
					{value === null ? (
						"—"
					) : (
						<CountUp value={value} decimals={decimals} suffix={suffix} />
					)}
				</p>
				<p className="text-[12px] text-ink-3">{footnote}</p>
			</div>
		</div>
	);
}
