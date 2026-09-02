import type { IRouteStop } from "@/services/types/i-route";
import { RouteMap } from "./RouteMap";

type Props = {
	stops: IRouteStop[];
};

export function RouteMapCard({ stops }: Props) {
	return (
		<section className="overflow-hidden rounded-card-sm border border-line bg-surface p-1.5 shadow-soft">
			<RouteMap
				stops={stops}
				className="h-[240px] w-full overflow-hidden rounded-[0.625rem] sm:h-[320px] lg:h-[560px]"
			/>
		</section>
	);
}
