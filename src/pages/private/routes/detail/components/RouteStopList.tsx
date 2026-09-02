import { Plus } from "lucide-react";
import rotaSemParadas from "@/assets/illustrations/rota-sem-paradas.svg";
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
	onReportarProblema: (stop: IRouteStop) => void;
};

export function RouteStopList({
	stops,
	rotaIniciada,
	podeGerenciar,
	podeMarcar,
	onAdicionar,
	onRemover,
	onMarcar,
	onReportarProblema,
}: Props) {
	const indiceAtual = rotaIniciada ? indiceDaParadaAtual(stops) : -1;

	return (
		<section className="flex w-full flex-1 flex-col">
			{stops.length === 0 ? (
				<EmptyState
					size="sm"
					className="my-auto"
					illustration={rotaSemParadas}
					title="Nenhuma parada nesta rota"
					description={
						podeGerenciar
							? "Adicione a primeira parada para montar o trajeto."
							: "As paradas aparecerão aqui quando forem cadastradas."
					}
				/>
			) : (
				// A rolagem fica neste container, nao na <ol>: assim a ilustracao de
				// rodape ocupa o que sobrar quando a lista e curta, e some sozinha
				// (flex-1 colapsa) quando as paradas passam da altura do cartao.
				<div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
					<ol className="flex shrink-0 flex-col p-5">
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
								onReportarProblema={() => onReportarProblema(stop)}
							/>
						))}
					</ol>

					<div
						aria-hidden="true"
						className="pointer-events-none flex min-h-0 flex-1 items-end justify-center overflow-hidden px-6 pb-5 pt-2"
					>
						<img
							src={rotaSemParadas}
							alt=""
							loading="lazy"
							data-ilustracao=""
							width={454}
							height={272}
							className="max-h-full w-full max-w-[240px] select-none opacity-70"
						/>
					</div>
				</div>
			)}

			{podeGerenciar && (
				<div className="mt-auto border-t border-line p-4">
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
