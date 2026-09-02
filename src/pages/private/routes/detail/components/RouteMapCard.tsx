import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { IRouteStop } from "@/services/types/i-route";
import { RouteMap } from "./RouteMap";

type Props = {
	stops: IRouteStop[];
	overlay?: ReactNode;
	desfocado?: boolean;
};

export function RouteMapCard({ stops, overlay, desfocado = false }: Props) {
	return (
		<div className="relative isolate h-[240px] w-full overflow-hidden rounded-xl border border-line sm:h-[320px] xl:h-[560px]">
			<div
				className={cn(
					"size-full transition-[filter,transform] duration-500 ease-out",
					desfocado && "scale-105 blur-[5px]",
				)}
			>
				<RouteMap stops={stops} interativo={!desfocado} className="size-full" />
			</div>

			{desfocado && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 z-[400] bg-canvas/35"
				/>
			)}

			{overlay}
		</div>
	);
}
