import type React from "react";
import { cn } from "@/lib/utils";

type SectionCardProps = {
	icon: React.ReactNode;
	iconVariant?: "chip" | "bare";
	title: string;
	action?: React.ReactNode;
	variant?: "default" | "new";
	children: React.ReactNode;
};

export function SectionCard({
	icon,
	iconVariant = "chip",
	title,
	action,
	variant = "default",
	children,
}: SectionCardProps) {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-2xl border bg-surface",
				variant === "new"
					? "border-[1.5px] border-eva/35"
					: "border-blue-bright/20",
			)}
		>
			<div className="flex items-center justify-between border-b border-blue-bright/12 px-3 py-3">
				<div className="flex items-center gap-2.5">
					<div
						className={cn(
							"flex size-[34px] shrink-0 items-center justify-center",
							iconVariant === "chip"
								? "rounded-[7px] bg-blue-tint text-blue-deep"
								: "rounded-full",
						)}
					>
						{icon}
					</div>
					<p className="text-[13px] font-bold uppercase text-blue-deep">
						{title}
					</p>
				</div>
				{action}
			</div>

			<div className="flex flex-col divide-y divide-blue-bright/10">
				{children}
			</div>
		</div>
	);
}
