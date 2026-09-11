import { MapPin, Navigation, Route, Timer } from "lucide-react";
import type { RouteStats } from "@/services/types/i-dashboard";
import { LIMITE_ROTA_HORAS } from "@/utils/route-time";
import { formatOptionalDecimal } from "../utils";
import { DashboardCardHeader } from "./DashboardCardHeader";
import { RouteStatItem } from "./RouteStatItem";

type RouteStatsCardProps = {
	stats: RouteStats;
};

export function RouteStatsCard({ stats }: RouteStatsCardProps) {
	const {
		average_mileage_per_route,
		average_stops_per_route,
		average_route_duration_hours,
	} = stats;

	const hasData =
		average_mileage_per_route != null ||
		average_stops_per_route != null ||
		average_route_duration_hours != null;

	return (
		<div className="flex w-full flex-col gap-[22px] rounded-card-sm border border-line bg-surface p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<Route className="size-4 text-teal" />}
				iconBg="bg-teal-tint"
				title="Eficiência das Rotas"
				subtitle="Médias por rota concluída no período"
			/>

			{!hasData ? (
				<p className="py-8 text-center text-[13px] text-ink-3">
					Nenhuma rota concluída no período selecionado.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<RouteStatItem
						icon={<Navigation className="size-4 shrink-0 text-teal" />}
						label="Quilometragem média"
						value={formatOptionalDecimal(average_mileage_per_route, " km")}
						hint="Distância percorrida por rota"
					/>
					<RouteStatItem
						icon={<MapPin className="size-4 shrink-0 text-teal" />}
						label="Paradas por rota"
						value={formatOptionalDecimal(average_stops_per_route)}
						hint="Etapas atendidas em cada saída"
					/>
					<RouteStatItem
						icon={<Timer className="size-4 shrink-0 text-teal" />}
						label="Duração média"
						value={formatOptionalDecimal(average_route_duration_hours, "h")}
						hint={
							average_route_duration_hours == null
								? `Tempo entre início e fim, no limite de ${LIMITE_ROTA_HORAS}h`
								: average_route_duration_hours > LIMITE_ROTA_HORAS
									? `Acima do limite de ${LIMITE_ROTA_HORAS}h por rota`
									: `Dentro do limite de ${LIMITE_ROTA_HORAS}h por rota`
						}
					/>
				</div>
			)}
		</div>
	);
}
