import { Route as RouteIcon } from "lucide-react";
import { RouteStatusBadge } from "@/components/full/RouteStatusBadge";
import { formatDateBR } from "@/utils/formatter";
import { useRoutesForDonationStep } from "../hooks";

type Props = {
	idDonationStep: string;
};

export function StepRoutesList({ idDonationStep }: Props) {
	const { routes, isLoading } = useRoutesForDonationStep(idDonationStep);

	if (isLoading || routes.length === 0) return null;

	return (
		<div className="flex flex-col gap-2">
			<span className="text-[12px] font-semibold text-ink-2">
				Rotas associadas
			</span>

			<div className="flex flex-col gap-1.5">
				{routes.map((route) => (
					<div
						key={route.id_route}
						className="flex items-center justify-between gap-2 rounded-card-sm border border-line bg-surface px-3.5 py-2.5"
					>
						<span className="flex min-w-0 items-center gap-2">
							<RouteIcon className="size-4 shrink-0 text-ink-3" />
							<span className="flex min-w-0 flex-col">
								<span className="truncate text-[13px] font-semibold text-ink">
									{route.name}
								</span>
								<span className="truncate text-[11px] text-ink-3">
									{formatDateBR(route.date_set)}
									{route.driver_name ? ` · ${route.driver_name}` : ""}
								</span>
							</span>
						</span>
						<RouteStatusBadge status={route.status} />
					</div>
				))}
			</div>
		</div>
	);
}
