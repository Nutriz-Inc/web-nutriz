import { Check } from "lucide-react";

type ChecklistItemProps = {
	title: string;
	description: string;
};

/** Item da lista "antes de começar": marcador de conferido + texto curto. */
export function ChecklistItem({ title, description }: ChecklistItemProps) {
	return (
		<li className="flex gap-3">
			<span
				aria-hidden="true"
				className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success-tint text-success"
			>
				<Check className="size-3.5" />
			</span>

			<div className="min-w-0">
				<p className="text-[14px] font-semibold text-ink">{title}</p>
				<p className="mt-0.5 text-[13px] leading-[19px] text-ink-2">
					{description}
				</p>
			</div>
		</li>
	);
}
