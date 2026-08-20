import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImpactFactProps = {
	icon: LucideIcon;
	value: string;
	label: string;
	toneClassName: string;
};

/** Numero curto de impacto, no formato dos cartoes de impacto da home. */
export function ImpactFact({
	icon: Icon,
	value,
	label,
	toneClassName,
}: ImpactFactProps) {
	return (
		<div className="rounded-card flex items-center gap-4 border border-line bg-surface p-5 shadow-soft">
			<span
				aria-hidden="true"
				className={cn(
					"flex size-12 shrink-0 items-center justify-center rounded-full",
					toneClassName,
				)}
			>
				<Icon className="size-5" />
			</span>

			<div className="min-w-0">
				<p className="font-display text-[22px] font-extrabold leading-none text-ink tabular-nums">
					{value}
				</p>
				<p className="mt-1.5 text-[13px] leading-[18px] text-ink-2">{label}</p>
			</div>
		</div>
	);
}
