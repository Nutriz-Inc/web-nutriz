import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProfileSectionCardProps = {
	label: string;
	title: string;
	as?: "h2" | "h3";
	tone?: "blue" | "eva";
	action?: ReactNode;
	className?: string;
	children: ReactNode;
};

const LABEL_TONE = {
	blue: "text-blue-bright",
	eva: "text-eva-deep",
} as const;

export function ProfileSectionCard({
	label,
	title,
	as: Heading = "h2",
	tone = "blue",
	action,
	className,
	children,
}: ProfileSectionCardProps) {
	return (
		<section
			className={cn(
				"flex flex-col gap-5 rounded-card-sm border bg-surface p-5 shadow-soft sm:p-6",
				tone === "eva" ? "border-eva/35" : "border-line",
				className,
			)}
		>
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex min-w-0 flex-col gap-1">
					<p
						className={cn(
							"font-display text-[11px] font-bold uppercase tracking-[0.06em]",
							LABEL_TONE[tone],
						)}
					>
						{label}
					</p>
					<Heading className="truncate text-[16px] font-bold text-ink">
						{title}
					</Heading>
				</div>
				{action}
			</div>

			{children}
		</section>
	);
}
