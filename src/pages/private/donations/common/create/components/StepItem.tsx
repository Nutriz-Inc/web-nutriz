import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
	icon: ReactNode;
	iconBg: string;
	title: string;
	children: ReactNode;
	isLast?: boolean;
}

export function StepItem({
	icon,
	iconBg,
	title,
	children,
	isLast = false,
}: Props) {
	return (
		<div className="flex gap-4 lg:gap-5">
			<div className="flex flex-col items-center">
				<div
					className={cn(
						"flex size-11 shrink-0 items-center justify-center rounded-full lg:size-14",
						iconBg,
					)}
				>
					{icon}
				</div>
				{!isLast && <div className="w-px flex-1 bg-[#e5ebf3] lg:hidden" />}
			</div>

			<div className="pb-8 pt-2 lg:pb-8 lg:pt-1.5">
				<p className="hidden text-[17px] font-bold text-[#0e2a45] lg:block">
					{title}
				</p>
				<p className="text-[16px] leading-[22px] text-[#0e2a45] lg:mt-1 lg:text-[15px] lg:leading-[21px] lg:text-[#5a7690]">
					{children}
				</p>
			</div>
		</div>
	);
}
