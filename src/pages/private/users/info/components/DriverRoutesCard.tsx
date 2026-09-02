import { LoaderCircle } from "lucide-react";
import { Fragment, useState } from "react";
import nadaPorAqui from "@/assets/illustrations/nada-por-aqui.svg";
import { EmptyState } from "@/components/full/EmptyState";
import { FilterChips } from "@/components/full/FilterChips";
import {
	ROUTE_STATUS_FILTER_OPTIONS,
	type RouteStatusFilter,
} from "@/pages/private/routes/list/constants";
import type { IRouteResponse } from "@/services/types/i-route";
import { ROUTES_GRID_COLS } from "../constants";
import { DriverRouteRow } from "./DriverRouteRow";
import { InfoCard } from "./InfoCard";

const COLUMN_LABELS = ["Rota", "Data", "Local", "Quilometragem", "Status", ""];

type DriverRoutesCardProps = {
	routes: IRouteResponse[];
	loading?: boolean;
};

export function DriverRoutesCard({ routes, loading }: DriverRoutesCardProps) {
	const [filter, setFilter] = useState<RouteStatusFilter>("all");

	const filtered = routes
		.filter((route) => filter === "all" || route.status === filter)
		.sort((a, b) => b.date_set.localeCompare(a.date_set));

	return (
		<InfoCard
			title="Rotas Vinculadas"
			description={`${routes.length} ${routes.length === 1 ? "rota encontrada" : "rotas encontradas"} para este(a) motorista`}
			actionSlot={
				<div className="flex items-center gap-2 overflow-x-auto pb-1">
					<FilterChips
						options={ROUTE_STATUS_FILTER_OPTIONS}
						value={filter}
						onChange={setFilter}
					/>
				</div>
			}
		>
			{loading ? (
				<div className="flex w-full justify-center py-6">
					<LoaderCircle className="animate-spin text-ink-3" />
				</div>
			) : filtered.length === 0 ? (
				<EmptyState
					size="sm"
					illustration={nadaPorAqui}
					title="Nenhuma rota encontrada"
					description="Ajuste o filtro selecionado."
				/>
			) : (
				<div className="overflow-hidden rounded-xl border border-surface-3">
					<div
						className={`hidden bg-surface-2 px-4 py-3 lg:grid ${ROUTES_GRID_COLS} lg:gap-3`}
					>
						{COLUMN_LABELS.map((label) => (
							<span
								key={label || "actions"}
								className="text-[11px] font-semibold uppercase tracking-wide text-ink-3"
							>
								{label}
							</span>
						))}
					</div>
					{filtered.map((route, index) => (
						<Fragment key={route.id_route}>
							{index > 0 && <div className="h-px bg-surface-3" />}
							<DriverRouteRow route={route} />
						</Fragment>
					))}
				</div>
			)}
		</InfoCard>
	);
}
