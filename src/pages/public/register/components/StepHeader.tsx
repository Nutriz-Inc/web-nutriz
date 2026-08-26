import type { LucideIcon } from "lucide-react";

type StepHeaderProps = {
	icon: LucideIcon;
	title: string;
	description: string;
	order: number;
	total: number;
};

export function StepHeader({
	icon: Icon,
	title,
	description,
	order,
	total,
}: StepHeaderProps) {
	return (
		<div className="flex items-start gap-4 border-b border-line bg-blue-tint/40 px-5 py-4 sm:px-7 sm:py-5">
			<span
				aria-hidden="true"
				className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-deep-fill text-white shadow-soft"
			>
				<Icon className="size-5" />
			</span>

			<div className="min-w-0 flex-1">
				<p className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-blue-bright">
					Etapa {order} de {total}
				</p>
				<h2 className="mt-0.5 font-display text-[17px] font-extrabold tracking-tight text-ink">
					{title}
				</h2>
				<p className="mt-0.5 text-[13px] leading-[18px] text-ink-2">
					{description}
				</p>
			</div>
		</div>
	);
}
