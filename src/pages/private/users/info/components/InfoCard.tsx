import type { ReactNode } from "react";

type InfoCardProps = {
	title: string;
	description?: string;
	actionSlot?: ReactNode;
	children: ReactNode;
};

export function InfoCard({
	title,
	description,
	actionSlot,
	children,
}: InfoCardProps) {
	return (
		<div className="flex flex-col gap-5 rounded-card-sm border border-line bg-surface p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-col gap-1">
					<p className="text-corpo font-bold text-ink">{title}</p>
					{description && (
						<p className="text-rotulo text-ink-3">{description}</p>
					)}
				</div>
				{actionSlot}
			</div>
			{children}
		</div>
	);
}
