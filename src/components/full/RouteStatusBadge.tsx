/* eslint-disable react-refresh/only-export-components */
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { EnumRouteStatus } from "@/services/types/i-route";

export const ROUTE_STATUS_DISPLAY: Record<
	EnumRouteStatus,
	{ label: string; tone: BadgeTone }
> = {
	[EnumRouteStatus.Pending]: { label: "Pendente", tone: "warning" },
	[EnumRouteStatus.InProgress]: { label: "Em andamento", tone: "info" },
	[EnumRouteStatus.Done]: { label: "Concluída", tone: "success" },
	[EnumRouteStatus.Canceled]: { label: "Cancelada", tone: "neutral" },
	[EnumRouteStatus.Error]: { label: "Erro", tone: "error" },
};

type RouteStatusBadgeProps = {
	status: EnumRouteStatus;
};

export function RouteStatusBadge({ status }: RouteStatusBadgeProps) {
	const display = ROUTE_STATUS_DISPLAY[status];

	return (
		<Badge tone={display.tone} dot size="lg">
			{display.label}
		</Badge>
	);
}
