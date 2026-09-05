import { Plus } from "lucide-react";
import rotaAguardando from "@/assets/illustrations/rota-aguardando.png";
import rotaEmAndamento from "@/assets/illustrations/rota-em-andamento.png";
import rotaFinalizada from "@/assets/illustrations/rota-finalizada.png";
import { EmptyState } from "@/components/full/EmptyState";
import type { IRouteStop } from "@/services/types/i-route";
import type { EstadoDaRota } from "../utils";
import { estadoDaParada, indiceDaParadaAtual } from "../utils";
import { RouteStopItem } from "./RouteStopItem";

const ARTE: Record<EstadoDaRota, { src: string; alt: string }> = {
	aguardando: {
		src: rotaAguardando,
		alt: "Motorista ao lado do caminhão com a lista de paradas pronta, aguardando o início da rota",
	},
	andamento: {
		src: rotaEmAndamento,
		alt: "Caminhão a caminho das próximas paradas, com parte do trajeto já concluído",
	},
	finalizada: {
		src: rotaFinalizada,
		alt: "Motorista comemorando com todas as paradas da rota concluídas",
	},
};

type Props = {
	stops: IRouteStop[];
	rotaIniciada: boolean;
	estadoRota: EstadoDaRota;
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
	estadoRota,
	podeGerenciar,
	podeMarcar,
	onAdicionar,
	onRemover,
	onMarcar,
	onReportarProblema,
}: Props) {
	const arte = ARTE[estadoRota];

	const indiceAtual = rotaIniciada ? indiceDaParadaAtual(stops) : -1;

	return (
		<section className="flex w-full flex-1 flex-col">
			{stops.length === 0 ? (
				<EmptyState
					size="sm"
					className="my-auto"
					illustration={arte.src}
					illustrationDark={arte.src}
					title="Nenhuma parada nesta rota"
					description={
						podeGerenciar
							? "Adicione a primeira parada para montar o trajeto."
							: "As paradas aparecerão aqui quando forem cadastradas."
					}
				/>
			) : (
				<div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
					<ol className="flex shrink-0 flex-col gap-1.5 p-3 sm:gap-0 sm:p-5">
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
									!["concluida", "erro"].includes(
										estadoDaParada(stop, index, indiceAtual),
									)
								}
								onRemover={() => onRemover(stop)}
								onMarcar={() => onMarcar(stop)}
								onReportarProblema={() => onReportarProblema(stop)}
							/>
						))}
					</ol>

					<div className="pointer-events-none flex min-h-0 flex-1 items-end justify-center overflow-hidden px-5 pb-6 pt-2 sm:pb-10">
						<img
							src={arte.src}
							alt={arte.alt}
							loading="lazy"
							decoding="async"
							width={1536}
							height={1024}
							className="h-auto max-h-[110px] w-auto max-w-[240px] select-none object-contain sm:max-h-full sm:max-w-[280px]"
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
