import { ChevronRight, Route as RouteIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteStatusBadge } from "@/components/full/RouteStatusBadge";
import { EnumRouteStatus, type IRouteResponse } from "@/services/types/i-route";
import { formatDateBR } from "@/utils/formatter";
import { ROUTES_GRID_COLS } from "../constants";

type DriverRouteRowProps = {
	route: IRouteResponse;
};

export function DriverRouteRow({ route }: DriverRouteRowProps) {
	const navigate = useNavigate();
	const location = useLocation();

	const place = [route.city, route.neighborhood].filter(Boolean).join(" · ");
	const showMileage =
		route.status === EnumRouteStatus.Done && route.mileage != null;

	return (
		<button
			type="button"
			onClick={() =>
				navigate(`/rotas/${route.id_route}`, {
					state: { backTo: location.pathname },
				})
			}
			className={`flex w-full flex-col gap-2.5 p-4 text-left transition-colors hover:bg-surface-2 lg:grid ${ROUTES_GRID_COLS} lg:items-center lg:gap-3 lg:px-4 lg:py-3`}
		>
			<div className="flex items-center justify-between lg:contents">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-tint">
						<RouteIcon className="size-4 text-blue-deep" />
					</div>
					<span className="min-w-0 truncate text-[14px] font-semibold text-ink">
						{route.name}
					</span>
				</div>
				<ChevronRight className="size-4 text-ink-3 lg:hidden" />
			</div>
			<span className="text-[14px] text-ink-2">
				<span className="lg:hidden">Data: </span>
				{formatDateBR(route.date_set)}
			</span>
			<span className="min-w-0 text-[14px] text-ink-2 lg:truncate">
				<span className="lg:hidden">Local: </span>
				{place || "—"}
			</span>
			<span className="text-[14px] text-ink-2">
				<span className="lg:hidden">Quilometragem: </span>
				{showMileage ? `${route.mileage} km` : "—"}
			</span>
			<RouteStatusBadge status={route.status} />
			<ChevronRight className="hidden size-4 text-ink-3 lg:block" />
		</button>
	);
}
