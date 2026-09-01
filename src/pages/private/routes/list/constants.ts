import type { FilterChipOption } from "@/components/full/FilterChips";
import { EnumRouteStatus } from "@/services/types/i-route";

export type RouteStatusFilter = "all" | EnumRouteStatus;

export const ROUTE_STATUS_FILTER_OPTIONS: FilterChipOption<RouteStatusFilter>[] =
	[
		{ key: "all", label: "Todas" },
		{ key: EnumRouteStatus.Pending, label: "Pendente" },
		{ key: EnumRouteStatus.InProgress, label: "Em andamento" },
		{ key: EnumRouteStatus.Done, label: "Concluída" },
		{ key: EnumRouteStatus.Canceled, label: "Cancelada" },
		{ key: EnumRouteStatus.Error, label: "Erro" },
	];
