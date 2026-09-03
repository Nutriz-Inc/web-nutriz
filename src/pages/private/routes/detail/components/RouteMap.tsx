import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { MapResizeHandler } from "@/components/full/MapResizeHandler";
import { cn } from "@/lib/utils";
import type { IRouteStop } from "@/services/types/i-route";
import { formatarEndereco, temCoordenadas } from "../utils";
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

const COR_CONCLUIDA = "#00549e";
const COR_PENDENTE = "#246cb9";

function stopIcon(numero: number, concluida: boolean) {
	const cor = concluida ? COR_CONCLUIDA : COR_PENDENTE;
	const opacidade = concluida ? "1" : "0.9";

	return divIcon({
		className: "",
		iconSize: [30, 30],
		iconAnchor: [15, 15],
		html: `<span style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9999px;background:${cor};opacity:${opacidade};color:#fff;font-family:inherit;font-size:13px;font-weight:700;border:2.5px solid #fff;box-shadow:0 2px 5px rgba(15,31,61,.35)">${numero}</span>`,
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
							color: COR_PENDENTE,
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
						icon={stopIcon(index + 1, Boolean(stop.date_start))}
						title={`${index + 1}. ${formatarEndereco(stop)}`}
					/>
				))}
			</MapContainer>
		</div>
	);
}
