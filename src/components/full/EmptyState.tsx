import type { ReactNode } from "react";

import { Reveal } from "@/components/full/Reveal";
import { useAccessibility } from "@/context/accessibility-context";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
	illustration?: string;
	illustrationDark?: string;
	title: string;
	description?: string;
	action?: ReactNode;
	size?: "sm" | "md";
	className?: string;
};

const ALTURA = {
	sm: "h-24 sm:h-28",
	md: "h-32 sm:h-40",
} as const;

export function EmptyState({
	illustration,
	illustrationDark,
	title,
	description,
	action,
	size = "md",
	className,
}: EmptyStateProps) {
	const { temaEfetivo } = useAccessibility();
	const escuro = temaEfetivo === "escuro";
	const arte = escuro && illustrationDark ? illustrationDark : illustration;

	return (
		<Reveal
			className={cn(
				"flex flex-col items-center gap-3 px-6 py-8 text-center",
				className,
			)}
		>
			{arte && (
				<img
					src={arte}
					alt=""
					aria-hidden="true"
					loading="lazy"
					{...(illustrationDark ? {} : { "data-ilustracao": "" })}
					width={320}
					height={200}
					className={cn(
						"w-auto max-w-full select-none object-contain",
						ALTURA[size],
					)}
				/>
			)}

			<div className="flex flex-col gap-1">
				<p className="text-[15px] font-semibold text-ink">{title}</p>
				{description && (
					<p className="max-w-[38ch] text-[13px] text-ink-2">{description}</p>
				)}
			</div>

			{action && <div className="mt-1">{action}</div>}
		</Reveal>
	);
}
