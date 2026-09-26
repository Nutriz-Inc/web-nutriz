import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DashboardCardHeader } from "./DashboardCardHeader";

type PainelCardProps = {
	icon: ReactNode;
	title: string;
	subtitle: string;
	acao?: ReactNode;
	className?: string;
	children: ReactNode;
};

export function PainelCard({
	icon,
	title,
	subtitle,
	acao,
	className,
	children,
}: PainelCardProps) {
	return (
		<section
			className={cn(
				"flex h-full w-full flex-col gap-[22px] rounded-card-sm border border-line bg-surface p-5 lg:p-[26px]",
				className,
			)}
		>
			<div className="flex items-start justify-between gap-4">
				<DashboardCardHeader icon={icon} title={title} subtitle={subtitle} />
				{acao ? <div className="shrink-0">{acao}</div> : null}
			</div>
			{children}
		</section>
	);
}
