/* eslint-disable react-refresh/only-export-components */
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { EnumJobStatus } from "@/services/types/i-job";
import type { AppointmentStatus } from "../../pages/private/job/types";

export const APPOINTMENT_STATUS_DISPLAY: Record<
	AppointmentStatus,
	{ label: string; tone: BadgeTone }
> = {
	[EnumJobStatus.Pending]: { label: "Aguardando", tone: "neutral" },
	[EnumJobStatus.Done]: { label: "Concluído", tone: "success" },
	[EnumJobStatus.Failed]: { label: "Não Concluído", tone: "error" },
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
		label: status,
		tone: "neutral" as const,
	};

	return (
		<Badge tone={display.tone} dot size="lg" className={className}>
			{display.label}
		</Badge>
	);
}
