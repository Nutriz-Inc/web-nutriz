import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { MapResizeHandler } from "@/components/full/MapResizeHandler";
import { useAccessibility } from "@/context/accessibility-context";

const marcador = divIcon({
	className: "",
	iconSize: [18, 18],
	iconAnchor: [9, 9],
	html: '<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#00549e;border:3px solid #fff;box-shadow:0 2px 5px rgba(15,31,61,.35)"></span>',
});

// O mapa do card e enfeite: nao vale uma ida ao Nominatim por cartao, que ainda
// por cima deixava sem mapa toda rota sem regiao cadastrada. Cada card recebe um
// recorte fixo, sorteado pelo id da rota — o mesmo card mostra sempre o mesmo.
const RECORTES: [number, number][] = [
	[-23.5505, -46.6333], // Se
	[-23.5629, -46.6544], // Bela Vista
	[-23.5475, -46.6361], // Republica
	[-23.5975, -46.6875], // Santo Amaro
	[-23.5329, -46.7918], // Butanta
	[-23.5087, -46.6266], // Santana
	[-23.5678, -46.7089], // Pinheiros
	[-23.6236, -46.6403], // Jabaquara
];

function recorteDaRota(id: string): [number, number] {
	let soma = 0;

	for (let i = 0; i < id.length; i += 1) {
		soma = (soma + id.charCodeAt(i) * (i + 1)) % 100000;
	}

	return RECORTES[soma % RECORTES.length];
}

type Props = {
	idRoute: string;
};

export function RouteMiniMap({ idRoute }: Props) {
	const { temaEfetivo } = useAccessibility();
	const escuro = temaEfetivo === "escuro";
	const centro = recorteDaRota(idRoute);

	return (
		<MapContainer
			center={centro}
			zoom={13}
			dragging={false}
			scrollWheelZoom={false}
			doubleClickZoom={false}
			touchZoom={false}
			keyboard={false}
			zoomControl={false}
			attributionControl={false}
			className="size-full"
		>
			<TileLayer
				key={temaEfetivo}
				url={
					escuro
						? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
						: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
				}
				maxNativeZoom={16}
				noWrap
			/>
			<MapResizeHandler />
			<Marker position={centro} icon={marcador} />
		</MapContainer>
	);
}
