import type React from "react";
import { cn } from "@/lib/utils";

type SectionCardProps = {
	icon: React.ReactNode;
	title: string;
	action?: React.ReactNode;
	variant?: "default" | "new";
	children: React.ReactNode;
};

export function SectionCard({
	icon,
	title,
	action,
	variant = "default",
	children,
}: SectionCardProps) {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-2xl border bg-white/10",
				variant === "new"
					? "border-[1.5px] border-[#f25ca2]/35"
					: "border-[#387ccd]/20",
			)}
		>
			<div className="flex items-center justify-between border-b border-[#387ccd]/12 px-3 py-3">
				<div className="flex items-center gap-2.5">
					<div className="flex size-[34px] items-center justify-center rounded-[7px] bg-[#e6f3ff] text-[#00458b]">
						{icon}
					</div>
					<p className="text-[13px] font-bold uppercase text-[#00458b]">
						{title}
					</p>
				</div>
				{action}
			</div>

			<div className="flex flex-col divide-y divide-[#387ccd]/10">
				{children}
			</div>
		</div>
	);
}
