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
		<div className="flex flex-col gap-5 rounded-2xl border border-[#e7eaef] bg-white p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-col gap-1">
					<p className="text-[16px] font-bold text-[#1f2a37]">{title}</p>
					{description && (
						<p className="text-[12px] text-[#9ca3af]">{description}</p>
					)}
				</div>
				{actionSlot}
			</div>
			{children}
		</div>
	);
}
