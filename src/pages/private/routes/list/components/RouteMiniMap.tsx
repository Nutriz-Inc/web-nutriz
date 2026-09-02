import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";
import { MapPinned } from "lucide-react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { MapResizeHandler } from "@/components/full/MapResizeHandler";
import { useAccessibility } from "@/context/accessibility-context";
import { useRegionCoordinates } from "../hooks";

const marcador = divIcon({
	className: "",
	iconSize: [18, 18],
	iconAnchor: [9, 9],
	html: '<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#00549e;border:3px solid #fff;box-shadow:0 2px 5px rgba(15,31,61,.35)"></span>',
});

type Props = {
	city?: string;
	neighborhood?: string;
};

export function RouteMiniMap({ city, neighborhood }: Props) {
	const { temaEfetivo } = useAccessibility();
	const escuro = temaEfetivo === "escuro";
	const temRegiao = Boolean(city || neighborhood);
	const { data, isLoading } = useRegionCoordinates(city, neighborhood);

	if (temRegiao && isLoading) {
		return <div className="size-full animate-pulse bg-surface-2" />;
	}

	// Sem coordenada nao da para desenhar o mapa certo, e desenhar o errado seria
	// pior. O lugar vira um painel proprio em vez de um icone solto no cinza.
	if (!data) {
		return (
			<div className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-tint via-surface-2 to-surface-2 px-3 text-center">
				<MapPinned className="size-6 text-blue-deep/60" />
				<span className="text-[11px] leading-tight text-ink-2">
					{temRegiao ? "Região não localizada" : "Região não informada"}
				</span>
			</div>
		);
	}

	const centro: [number, number] = [data.latitude, data.longitude];

	return (
		<MapContainer
			center={centro}
			zoom={12}
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
