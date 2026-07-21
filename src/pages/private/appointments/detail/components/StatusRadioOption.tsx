import { cn } from "@/lib/utils";
import { APPOINTMENT_STATUS_DISPLAY } from "../../shared/AppointmentStatusBadge";
import type { AppointmentStatus } from "../../types";
import { STATUS_OPTION_DESCRIPTION } from "../constants";

type StatusRadioOptionProps = {
	status: AppointmentStatus;
	selected: boolean;
	isCurrent: boolean;
	onSelect: (status: AppointmentStatus) => void;
};

export function StatusRadioOption({
	status,
	selected,
	isCurrent,
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
					? "border-[#387ccd] bg-[#f2f8fe]"
					: "border-[#e7ecf2] bg-white hover:bg-[#f9fafc]",
			)}
		>
			<span
				className={cn(
					"mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2",
					selected ? "border-[#387ccd]" : "border-[#c0c7d1]",
				)}
			>
				{selected && <span className="size-2 rounded-full bg-[#387ccd]" />}
			</span>

			<div className="flex min-w-0 flex-col gap-0.5">
				<div className="flex items-center gap-2">
					<span className={cn("size-2 shrink-0 rounded-full", display.dot)} />
					<span className="text-[14px] font-semibold text-[#1f2a37]">
						{display.label}
					</span>
					{isCurrent && (
						<span className="rounded-full bg-[#eef2f7] px-2 py-0.5 text-[11px] font-semibold text-[#6b7280]">
							atual
						</span>
					)}
				</div>
				<span className="text-[13px] text-[#6b7280]">
					{STATUS_OPTION_DESCRIPTION[status]}
				</span>
			</div>
		</button>
	);
}
