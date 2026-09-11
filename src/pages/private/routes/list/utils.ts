import { EnumRouteStatus, type IRouteResponse } from "@/services/types/i-route";

const PESO_POR_STATUS: Record<EnumRouteStatus, number> = {
	[EnumRouteStatus.InProgress]: 0,
	[EnumRouteStatus.Pending]: 1,
	[EnumRouteStatus.Error]: 2,
	[EnumRouteStatus.Done]: 3,
	[EnumRouteStatus.Canceled]: 4,
};

export function ordenarPorPrioridade(
	routes: IRouteResponse[],
): IRouteResponse[] {
	return [...routes].sort(
		(a, b) => PESO_POR_STATUS[a.status] - PESO_POR_STATUS[b.status],
	);
}
