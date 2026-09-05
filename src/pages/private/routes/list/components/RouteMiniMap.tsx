import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { MapResizeHandler } from "@/components/full/MapResizeHandler";

const TILE_ROTA =
	"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";

const marcador = divIcon({
	className: "",
	iconSize: [18, 18],
	iconAnchor: [9, 9],
	html: '<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#00549e;border:3px solid #fff;box-shadow:0 2px 5px rgba(15,31,61,.35)"></span>',
});

const RECORTES: [number, number][] = [
	[-23.5505, -46.6333],
	[-23.5629, -46.6544],
	[-23.5475, -46.6361],
	[-23.5975, -46.6875],
	[-23.5329, -46.7918],
	[-23.5087, -46.6266],
	[-23.5678, -46.7089],
	[-23.6236, -46.6403],
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
	const containerRef = useRef<HTMLDivElement>(null);
	const [visivel, setVisivel] = useState(false);
	const centro = recorteDaRota(idRoute);

	useEffect(() => {
		const elemento = containerRef.current;

		if (!elemento) return;

		if (typeof IntersectionObserver === "undefined") {
			setVisivel(true);
			return;
		}

		const observador = new IntersectionObserver(
			(entradas) => {
				if (entradas.some((entrada) => entrada.isIntersecting)) {
					setVisivel(true);
					observador.disconnect();
				}
			},
			{ rootMargin: "200px" },
		);

		observador.observe(elemento);

		return () => observador.disconnect();
	}, []);

	if (!visivel) {
		return <div ref={containerRef} className="size-full bg-surface-2" />;
	}

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
			<TileLayer url={TILE_ROTA} maxNativeZoom={16} noWrap />
			<MapResizeHandler />
			<Marker position={centro} icon={marcador} />
		</MapContainer>
	);
}
