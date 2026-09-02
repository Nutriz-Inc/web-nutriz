import { Plus } from "lucide-react";
import nadaPorAqui from "@/assets/illustrations/nada-por-aqui.svg";
import { EmptyState } from "@/components/full/EmptyState";
import type { IRouteStop } from "@/services/types/i-route";
import { estadoDaParada, indiceDaParadaAtual } from "../utils";
import { RouteStopItem } from "./RouteStopItem";

type Props = {
	stops: IRouteStop[];
	rotaIniciada: boolean;
	podeGerenciar: boolean;
	podeMarcar: boolean;
	onAdicionar: () => void;
	onRemover: (stop: IRouteStop) => void;
	onMarcar: (stop: IRouteStop) => void;
};

export function RouteStopList({
	stops,
	rotaIniciada,
	podeGerenciar,
	podeMarcar,
	onAdicionar,
	onRemover,
	onMarcar,
}: Props) {
	const indiceAtual = rotaIniciada ? indiceDaParadaAtual(stops) : -1;

	return (
		<section className="flex w-full flex-col">
			{stops.length === 0 ? (
				<EmptyState
					size="sm"
					illustration={nadaPorAqui}
					title="Nenhuma parada nesta rota"
					description={
						podeGerenciar
							? "Adicione a primeira parada para montar o trajeto."
							: "As paradas aparecerão aqui quando forem cadastradas."
					}
				/>
			) : (
				<ol className="flex flex-col px-5 pt-4 xl:max-h-[560px] xl:overflow-y-auto">
					{stops.map((stop, index) => (
						<RouteStopItem
							key={stop.id_route_donation_step}
							stop={stop}
							numero={index + 1}
							estado={estadoDaParada(stop, index, indiceAtual)}
							isLast={index === stops.length - 1}
							podeRemover={podeGerenciar}
							podeMarcar={
								podeMarcar &&
								estadoDaParada(stop, index, indiceAtual) !== "concluida"
							}
							onRemover={() => onRemover(stop)}
							onMarcar={() => onMarcar(stop)}
						/>
					))}
				</ol>
			)}

			{podeGerenciar && (
				<div className="p-5 pt-1">
					<button
						type="button"
						onClick={onAdicionar}
						className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-dashed border-blue-tint-2 bg-surface text-[14px] font-semibold text-blue-deep outline-none transition-colors hover:bg-blue-tint focus-visible:ring-4 focus-visible:ring-blue-bright/50"
					>
						<Plus className="size-4" />
						Adicionar parada
					</button>
				</div>
			)}
		</section>
	);
}
