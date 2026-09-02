import type { IRouteStop } from "@/services/types/i-route";
import { RouteMap } from "./RouteMap";

type Props = {
	stops: IRouteStop[];
};

export function RouteMapCard({ stops }: Props) {
	return (
		<RouteMap
			stops={stops}
			className="h-[240px] w-full overflow-hidden rounded-xl border border-line sm:h-[320px] xl:h-[560px]"
		/>
	);
}
