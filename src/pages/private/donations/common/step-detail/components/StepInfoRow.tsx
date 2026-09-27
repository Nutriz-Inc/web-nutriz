import type { LucideIcon } from "lucide-react";

type Props = {
	icon: LucideIcon;
	label: string;
	value: string;
	detail?: string;
};

export function StepInfoRow({ icon: Icon, label, value, detail }: Props) {
	return (
		<div className="flex items-start gap-4">
			<div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-tint">
				<Icon className="size-5 text-blue-deep" aria-hidden="true" />
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
				<span className="text-rotulo font-semibold uppercase tracking-[0.1em] text-ink-3">
					{label}
				</span>
				<span className="text-corpo font-semibold leading-snug text-ink">
					{value}
				</span>
				{detail ? (
					<span className="text-apoio leading-snug text-ink-2">{detail}</span>
				) : null}
			</div>
		</div>
	);
}
