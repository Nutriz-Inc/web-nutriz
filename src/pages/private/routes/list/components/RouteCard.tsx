import { Calendar, Gauge, MapPin, User } from "lucide-react";
import { AppointmentInfoRow } from "@/components/full/AppointmentInfoRow";
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
		<div className="flex w-full flex-col gap-4 rounded-card-sm border border-line bg-surface p-5 text-left transition-transform duration-200 hover:scale-[1.02] hover:shadow-soft">
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex min-w-0 flex-col">
						<p className="truncate text-[16px] font-bold text-ink">
							{route.name}
						</p>
					</div>
				</div>
				<RouteStatusBadge status={route.status} />
			</div>

			<div className="flex flex-col gap-3">
				<AppointmentInfoRow
					icon={<User className="size-[18px] shrink-0 text-ink-3" />}
					label="Motorista"
					value={route.driver_name ?? "—"}
				/>
				<AppointmentInfoRow
					icon={<Calendar className="size-[18px] shrink-0 text-ink-3" />}
					label="Data programada"
					value={formatDateBR(route.date_set)}
				/>
				{location && (
					<AppointmentInfoRow
						icon={<MapPin className="size-[18px] shrink-0 text-ink-3" />}
						label="Local"
						value={location}
					/>
				)}
				{showMileage && (
					<AppointmentInfoRow
						icon={<Gauge className="size-[18px] shrink-0 text-ink-3" />}
						label="Quilometragem"
						value={`${route.mileage} km`}
					/>
				)}
			</div>
		</div>
	);
}
