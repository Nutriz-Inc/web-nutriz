import { APPOINTMENT_STATUS_DISPLAY } from "@/components/full/AppointmentStatusBadge";
import { BADGE_TONES } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "../../types";
import { STATUS_OPTION_DESCRIPTION } from "../constants";

type StatusRadioOptionProps = {
	status: AppointmentStatus;
	selected: boolean;
	onSelect: (status: AppointmentStatus) => void;
};

export function StatusRadioOption({
	status,
	selected,
	onSelect,
}: StatusRadioOptionProps) {
	const display = APPOINTMENT_STATUS_DISPLAY[status];

	return (
		<button
			type="button"
			onClick={() => onSelect(status)}
			className={cn(
				"flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors",
				selected
					? "border-blue-bright bg-surface-3"
					: "border-line bg-surface hover:bg-surface-2",
			)}
		>
			<span
				className={cn(
					"mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2",
					selected ? "border-blue-bright" : "border-line-strong",
				)}
			>
				{selected && <span className="size-2 rounded-full bg-blue-bright" />}
			</span>

			<div className="flex min-w-0 flex-col gap-0.5">
				<div className="flex items-center gap-2">
					<span
						className={cn(
							"size-2 shrink-0 rounded-full",
							BADGE_TONES[display.tone].dot,
						)}
					/>
					<span className="text-[14px] font-semibold text-ink">
						{display.label}
					</span>
				</div>
				<span className="text-[13px] text-ink-2">
					{STATUS_OPTION_DESCRIPTION[status]}
				</span>
			</div>
		</button>
	);
}
