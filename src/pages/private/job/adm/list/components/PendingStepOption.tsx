import { Calendar, Check, FileText, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IDonationStepResponse } from "@/services/types/i-donation";
import { formatCreatedAt } from "@/utils/formatter";
import { findStepDefinition } from "../../../detail/utils";
import { formatLocation } from "../../../utils";

type PendingStepOptionProps = {
	step: IDonationStepResponse;
	selected: boolean;
	onSelect: () => void;
};

export function PendingStepOption({
	step,
	selected,
	onSelect,
}: PendingStepOptionProps) {
	const StepIcon = findStepDefinition(step.name)?.icon ?? FileText;

	return (
		<button
			type="button"
			onClick={onSelect}
			aria-pressed={selected}
			className={cn(
				"flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors",
				selected
					? "border-blue-bright bg-blue-tint"
					: "border-line bg-surface hover:border-blue-tint-2",
			)}
		>
			<span
				className={cn(
					"flex size-9 shrink-0 items-center justify-center rounded-full",
					selected
						? "bg-blue-bright-fill text-white"
						: "bg-blue-tint text-blue-deep",
				)}
			>
				{selected ? (
					<Check className="size-[18px]" />
				) : (
					<StepIcon className="size-[18px]" />
				)}
			</span>

			<div className="flex min-w-0 flex-1 flex-col gap-1">
				<span className="text-[14px] font-bold text-ink">{step.name}</span>

				<span className="flex items-center gap-1.5 text-[12px] text-ink-2">
					<Calendar className="size-3.5 shrink-0 text-ink-3" />
					{step.set_date ? formatCreatedAt(step.set_date) : "Sem data definida"}
				</span>

				{step.address && (
					<span className="flex items-start gap-1.5 text-[12px] text-ink-2">
						<MapPin className="mt-0.5 size-3.5 shrink-0 text-ink-3" />
						<span className="line-clamp-2">{formatLocation(step.address)}</span>
					</span>
				)}

				{step.description && (
					<span className="line-clamp-2 text-[12px] text-ink-3">
						{step.description}
					</span>
				)}
			</div>
		</button>
	);
}
