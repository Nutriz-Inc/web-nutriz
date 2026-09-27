import type { ReactNode } from "react";

type DashboardCardHeaderProps = {
	icon: ReactNode;
	iconBg?: string;
	title: string;
	subtitle: ReactNode;
};

export function DashboardCardHeader({
	icon,
	title,
	subtitle,
}: DashboardCardHeaderProps) {
	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex items-start gap-2.5">
				<span className="mt-[3px] shrink-0 text-ink-3">{icon}</span>
				<div className="flex min-w-0 flex-col gap-0.5">
					<p className="text-corpo font-semibold leading-tight text-ink">
						{title}
					</p>
					<p className="text-rotulo leading-snug text-ink-3">{subtitle}</p>
				</div>
			</div>
		</div>
	);
}
