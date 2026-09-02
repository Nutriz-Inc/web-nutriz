import { Plus } from "lucide-react";
import nadaPorAqui from "@/assets/illustrations/nada-por-aqui.svg";
import { EmptyState } from "@/components/full/EmptyState";
import type { IRouteStop } from "@/services/types/i-route";
import { estadoDaParada, indiceDaParadaAtual } from "../utils";
import { RouteStopItem } from "./RouteStopItem";

type Props = {
	stops: IRouteStop[];
	podeGerenciar: boolean;
	podeMarcar: boolean;
	onAdicionar: () => void;
	onRemover: (stop: IRouteStop) => void;
	onMarcar: (stop: IRouteStop) => void;
};

export function RouteStopList({
	stops,
	podeGerenciar,
	podeMarcar,
	onAdicionar,
	onRemover,
	onMarcar,
}: Props) {
	const indiceAtual = indiceDaParadaAtual(stops);

	return (
		<section className="flex w-full flex-col gap-4 rounded-2xl bg-surface p-4 shadow-soft lg:gap-6 lg:rounded-3xl lg:p-8">
			<div className="flex items-center justify-between gap-3">
				<h2 className="font-display text-xs font-bold uppercase tracking-[0.06em] text-blue-bright lg:text-[13px]">
					Paradas da rota
				</h2>
				<span className="shrink-0 rounded-full bg-surface-3 px-2.5 py-0.5 text-[11px] font-bold text-ink-2 lg:text-[12px]">
					{stops.length} {stops.length === 1 ? "parada" : "paradas"}
				</span>
			</div>

			<div className="h-px bg-blue-tint" />

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
				<ol className="flex flex-col">
					{stops.map((stop, index) => {
						const estado = estadoDaParada(stop, index, indiceAtual);

						return (
							<RouteStopItem
								key={stop.id_route_donation_step}
								stop={stop}
								numero={index + 1}
								estado={estado}
								isLast={index === stops.length - 1}
								podeRemover={podeGerenciar}
								podeMarcar={podeMarcar && estado !== "concluida"}
								onRemover={() => onRemover(stop)}
								onMarcar={() => onMarcar(stop)}
							/>
						);
					})}
				</ol>
			)}

			{podeGerenciar && (
				<button
					type="button"
					onClick={onAdicionar}
					className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-dashed border-blue-tint-2 bg-surface text-[14px] font-semibold text-blue-deep outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50"
				>
					<Plus className="size-4" />
					Adicionar parada
				</button>
			)}
		</section>
	);
}
