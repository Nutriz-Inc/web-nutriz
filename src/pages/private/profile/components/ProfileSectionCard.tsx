import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProfileSectionCardProps = {
	label: string;
	title: string;
	as?: "h2" | "h3";
	action?: ReactNode;
	className?: string;
	children: ReactNode;
};

export function ProfileSectionCard({
	label,
	title,
	as: Heading = "h2",
	action,
	className,
	children,
}: ProfileSectionCardProps) {
	return (
		<section
			className={cn(
				"flex flex-col gap-5 rounded-card-sm border border-line bg-surface p-5 shadow-soft sm:p-6",
				className,
			)}
		>
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex min-w-0 flex-col gap-1">
					<p
						className={cn(
							"font-display text-rotulo font-bold uppercase tracking-[0.06em] text-blue-bright",
						)}
					>
						{label}
					</p>
					<Heading className="truncate text-corpo font-bold text-ink">
						{title}
					</Heading>
				</div>
				{action}
			</div>

			{children}
		</section>
	);
}
