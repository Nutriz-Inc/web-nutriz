/* eslint-disable react-refresh/only-export-components */
import { cn } from "@/lib/utils";
import { EnumJobStatus } from "@/services/types/i-job";
import type { AppointmentStatus } from "../types";

export const APPOINTMENT_STATUS_DISPLAY: Record<
	AppointmentStatus,
	{ label: string; bg: string; text: string; dot: string }
> = {
	[EnumJobStatus.Pending]: {
		label: "Aguardando",
		bg: "bg-[#eef1f5]",
		text: "text-[#5b6472]",
		dot: "bg-[#9aa3b2]",
	},
	[EnumJobStatus.Done]: {
		label: "Concluído",
		bg: "bg-[#e1f5ee]",
		text: "text-[#0f6e56]",
		dot: "bg-[#12a877]",
	},
	[EnumJobStatus.Failed]: {
		label: "Não Concluído",
		bg: "bg-[#fdecec]",
		text: "text-[#cf3030]",
		dot: "bg-[#e5484d]",
	},
};

const UNKNOWN_STATUS_DISPLAY = {
	bg: "bg-[#eef1f5]",
	text: "text-[#5b6472]",
	dot: "bg-[#9aa3b2]",
};

type AppointmentStatusBadgeProps = {
	status: AppointmentStatus;
	className?: string;
};

export function AppointmentStatusBadge({
	status,
	className,
}: AppointmentStatusBadgeProps) {
	const display = APPOINTMENT_STATUS_DISPLAY[status] ?? {
		...UNKNOWN_STATUS_DISPLAY,
		label: status,
	};

	return (
		<span
			className={cn(
				"flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold",
				display.bg,
				display.text,
				className,
			)}
		>
			<span className={cn("size-2 shrink-0 rounded-full", display.dot)} />
			{display.label}
		</span>
	);
}
