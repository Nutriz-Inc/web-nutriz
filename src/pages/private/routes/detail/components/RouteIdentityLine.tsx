import { CalendarClock, MapPin } from "lucide-react";
import { CopyableId } from "@/components/full/CopyableId";
import { RouteStatusBadge } from "@/components/full/RouteStatusBadge";
import type { IGetRouteResponse } from "@/services/types/i-route";
import { formatCreatedAt } from "@/utils/formatter";

type Props = {
	route: IGetRouteResponse;
};

export function RouteIdentityLine({ route }: Props) {
	const regiao = [route.city, route.neighborhood].filter(Boolean).join(" · ");

	return (
		<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
			<RouteStatusBadge status={route.status} />

			<CopyableId id={route.id_route} className="text-[13px] text-ink-2" />

			<span className="flex items-center gap-1.5 text-[13px] text-ink-2">
				<CalendarClock className="size-4 shrink-0" />
				{formatCreatedAt(route.date_set)}
			</span>

			{regiao && (
				<span className="flex items-center gap-1.5 text-[13px] text-ink-2">
					<MapPin className="size-4 shrink-0" />
					{regiao}
				</span>
			)}
		</div>
	);
}
