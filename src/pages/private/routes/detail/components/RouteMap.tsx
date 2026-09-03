import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { MapResizeHandler } from "@/components/full/MapResizeHandler";
import { cn } from "@/lib/utils";
import type { IRouteStop } from "@/services/types/i-route";
import type { EstadoDaParada } from "../utils";
import {
	estadoDaParada,
	formatarEndereco,
	indiceDaParadaAtual,
	temCoordenadas,
} from "../utils";
import { FitRouteBounds } from "./FitRouteBounds";
import { MapInteractionToggle } from "./MapInteractionToggle";

// O mapa das rotas fica no tile claro mesmo no tema escuro: o World_Topo_Map
// mostra nome de rua, quadra e ponto de referencia que o Dark Gray Base nao tem,
// e aqui o mapa e ferramenta de trabalho do motorista, nao enfeite.
const TILE_ROTA =
	"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";

const CENTRO_PADRAO: [number, number] = [-23.5505, -46.6333];
const ZOOM_MINIMO = 3;
const ZOOM_MAXIMO = 18;
const ZOOM_MAXIMO_COM_DADOS = 16;

// O marcador conta o mesmo que a lista de paradas: verde quando o motorista
// registrou a chegada, vermelho quando marcou imprevisto, azul enquanto nao
// aconteceu nenhum dos dois.
const COR_DA_PARADA: Record<EstadoDaParada, string> = {
	concluida: "var(--success-fill)",
	erro: "var(--danger-fill)",
	atual: "#246cb9",
	proxima: "#246cb9",
};

const COR_TRACADO = "#246cb9";

function stopIcon(numero: number, estado: EstadoDaParada) {
	const cor = COR_DA_PARADA[estado];
	const resolvida = estado === "concluida" || estado === "erro";

	return divIcon({
		className: "",
		iconSize: [30, 30],
		iconAnchor: [15, 15],
		html: `<span style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9999px;background:${cor};opacity:${resolvida ? "1" : "0.9"};color:#fff;font-family:inherit;font-size:13px;font-weight:700;border:2.5px solid #fff;box-shadow:0 2px 5px rgba(15,31,61,.35)">${numero}</span>`,
	});
}

type Props = {
	stops: IRouteStop[];
	interativo?: boolean;
	className?: string;
};

export function RouteMap({ stops, interativo = true, className }: Props) {
	const comCoordenada = stops.filter(temCoordenadas);

	const posicoes: [number, number][] = comCoordenada.map((stop) => [
		stop.address?.latitude as number,
		stop.address?.longitude as number,
	]);

	const centro = posicoes[0] ?? CENTRO_PADRAO;

	// O indice da parada atual e calculado sobre a lista inteira, nao so sobre as
	// que tem coordenada: se uma parada sem endereco esta pendente, ela ainda e a
	// vez dela, e as seguintes continuam azuis.
	const indiceAtual = indiceDaParadaAtual(stops);

	return (
		<div
			className={cn(
				"relative isolate",
				!interativo && "[&_.leaflet-control-zoom]:hidden",
				className,
			)}
		>
			<MapContainer
				center={centro}
				zoom={13}
				minZoom={ZOOM_MINIMO}
				maxZoom={ZOOM_MAXIMO}
				className="size-full"
			>
				<TileLayer
					attribution='Tiles &copy; <a href="https://www.esri.com">Esri</a>'
					url={TILE_ROTA}
					maxZoom={ZOOM_MAXIMO}
					maxNativeZoom={ZOOM_MAXIMO_COM_DADOS}
					noWrap
				/>

				<MapResizeHandler />
				<MapInteractionToggle interativo={interativo} />
				<FitRouteBounds posicoes={posicoes} />

				{posicoes.length > 1 && (
					<Polyline
						positions={posicoes}
						pathOptions={{
							color: COR_TRACADO,
							weight: 4,
							opacity: 0.75,
							dashArray: "1 10",
							lineCap: "round",
						}}
					/>
				)}

				{comCoordenada.map((stop, index) => (
					<Marker
						key={stop.id_route_donation_step}
						position={posicoes[index]}
						icon={stopIcon(
							index + 1,
							estadoDaParada(stop, stops.indexOf(stop), indiceAtual),
						)}
						title={`${index + 1}. ${formatarEndereco(stop)}`}
					/>
				))}
			</MapContainer>
		</div>
	);
}
