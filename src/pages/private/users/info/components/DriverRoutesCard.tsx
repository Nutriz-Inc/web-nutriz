import { Fragment, useState } from "react";
import nadaPorAqui from "@/assets/illustrations/nada-por-aqui.svg";
import { EmptyState } from "@/components/full/EmptyState";
import {
	type FilterChipOption,
	FilterChips,
} from "@/components/full/FilterChips";
import { EnumRouteStatus, type IRouteResponse } from "@/services/types/i-route";
import { ROUTES_GRID_COLS } from "../constants";
import { DriverRouteRow } from "./DriverRouteRow";
import { InfoCard } from "./InfoCard";

type RouteFilter = "all" | "open" | "done";

const FILTER_OPTIONS: FilterChipOption<RouteFilter>[] = [
	{ key: "all", label: "Todas" },
	{ key: "open", label: "Em aberto" },
	{ key: "done", label: "Concluídas" },
];

const COLUMN_LABELS = ["Rota", "Data", "Região", "Quilometragem", "Status", ""];

type DriverRoutesCardProps = {
	routes: IRouteResponse[];
};

export function DriverRoutesCard({ routes }: DriverRoutesCardProps) {
	const [filter, setFilter] = useState<RouteFilter>("all");

	const filtered = routes.filter((route) => {
		if (filter === "open") {
			return (
				route.status === EnumRouteStatus.Pending ||
				route.status === EnumRouteStatus.InProgress
			);
		}
		if (filter === "done") return route.status === EnumRouteStatus.Done;
		return true;
	});

	return (
		<InfoCard
			title="Rotas Vinculadas"
			description={`${routes.length} ${routes.length === 1 ? "rota encontrada" : "rotas encontradas"} para este(a) motorista`}
			actionSlot={
				<div className="flex items-center gap-2 overflow-x-auto pb-1">
					<FilterChips
						options={FILTER_OPTIONS}
						value={filter}
						onChange={setFilter}
					/>
				</div>
			}
		>
			{filtered.length === 0 ? (
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
								className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-2"
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
