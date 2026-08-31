import { Calendar, Gauge, MapPin, User } from "lucide-react";
import { EnumRouteStatus, type IRouteResponse } from "@/services/types/i-route";
import { formatDateBR } from "@/utils/formatter";
import { RouteStatusBadge } from "./RouteStatusBadge";

type RouteCardProps = {
	route: IRouteResponse;
};

export function RouteCard({ route }: RouteCardProps) {
	const location = [route.city, route.neighborhood].filter(Boolean).join(" · ");
	const showMileage =
		route.status === EnumRouteStatus.Done && route.mileage != null;

	return (
		<div className="flex w-full flex-col gap-3.5 bg-surface p-[18px] lg:flex-row lg:items-center lg:gap-6 lg:px-6 lg:py-4">
			<div className="flex min-w-0 flex-col gap-1 lg:w-[260px] lg:shrink-0">
				<p className="truncate text-[18px] font-bold text-ink">{route.name}</p>
				<span className="flex items-center gap-1.5 text-[13px] text-ink-3">
					<User className="size-[14px] shrink-0" />
					<span className="truncate">{route.driver_name ?? "—"}</span>
				</span>
			</div>

			<div className="flex flex-wrap items-center gap-2 lg:w-[160px] lg:shrink-0">
				<RouteStatusBadge status={route.status} />
			</div>

			<div className="h-px bg-blue-tint lg:hidden" />

			<div className="flex flex-col gap-2.5 lg:flex-1 lg:flex-row lg:flex-wrap lg:items-center lg:justify-end lg:gap-6">
				{location && (
					<div className="flex items-center gap-2.5">
						<MapPin className="size-[18px] shrink-0 text-ink-3" />
						<span className="text-[15px] font-semibold text-ink">
							{location}
						</span>
					</div>
				)}

				<div className="flex items-center gap-2.5">
					<Calendar className="size-[18px] shrink-0 text-ink-3" />
					<span className="text-[14px] text-ink-2">Data:</span>
					<span className="text-[15px] font-semibold text-ink">
						{formatDateBR(route.date_set)}
					</span>
				</div>

				{showMileage && (
					<div className="flex items-center gap-2.5">
						<Gauge className="size-[18px] shrink-0 text-ink-3" />
						<span className="text-[14px] text-ink-2">Quilometragem:</span>
						<span className="text-[15px] font-semibold text-ink">
							{route.mileage} km
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
