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
	const { data, isLoading } = useRegionCoordinates(city, neighborhood);

	if (isLoading || !data) {
		return (
			<div className="flex size-full items-center justify-center bg-surface-2">
				<MapPinned className="size-6 text-blue-tint-2" />
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
				url={`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${escuro ? "Dark" : "Light"}_Gray_Base/MapServer/tile/{z}/{y}/{x}`}
				maxNativeZoom={16}
				noWrap
			/>
			<MapResizeHandler />
			<Marker position={centro} icon={marcador} />
		</MapContainer>
	);
}
