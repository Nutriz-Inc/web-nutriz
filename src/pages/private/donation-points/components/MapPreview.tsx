import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { IDonationPointResponse } from "@/services/types/i-donation";
import { type Coordinates, FitMapView } from "./FitMapView";
import { LocateButton } from "./LocateButton";
import { MapResizeHandler } from "./MapResizeHandler";

const DEFAULT_CENTER: [number, number] = [-23.5505, -46.6333]; // São Paulo

// Pin classico (gota) em vez de bolinha: sobre o mapa colorido do OSM uma
// bolinha some, e a gota tem silhueta reconhecivel. Selecionado fica maior e
// em rosa; os demais em vermelho.
const pointIcon = (selected: boolean) => {
	const largura = selected ? 34 : 26;
	const altura = selected ? 46 : 35;
	const cor = selected ? "#e0457a" : "#d92b3f";

	return divIcon({
		className: "",
		iconSize: [largura, altura],
		iconAnchor: [largura / 2, altura],
		html: `<svg width="${largura}" height="${altura}" viewBox="0 0 26 35" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 2px 3px rgba(15,31,61,.35))">
			<path d="M13 0C5.82 0 0 5.82 0 13c0 9.75 13 22 13 22s13-12.25 13-22c0-7.18-5.82-13-13-13z" fill="${cor}"/>
			<path d="M11.4 7.6h3.2v3.2h3.2v3.2h-3.2v3.2h-3.2v-3.2H8.2v-3.2h3.2z" fill="#ffffff"/>
		</svg>`,
	});
};

const userIcon = divIcon({
	className: "",
	iconSize: [18, 18],
	iconAnchor: [9, 9],
	html: `
		<span class="relative flex size-[18px]">
			<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-bright opacity-60"></span>
			<span class="relative inline-flex size-[18px] rounded-full border-2 border-white bg-blue-bright"></span>
		</span>
	`,
});

type MapPreviewProps = {
	points: IDonationPointResponse[];
	pointsReady: boolean;
	userLocation: Coordinates | null;
	userLocationReady: boolean;
	refitVersion: number;
	/**
	 * Mostra o botao de trocar endereco acima do mapa. A landing desliga: la
	 * ele vive na linha dos filtros, alinhado ao topo da lista.
	 */
	showLocateButton?: boolean;
	selectedId: string | null;
	onSelectPoint?: (id: string) => void;
	onRequestChangeLocation: () => void;
};

export function MapPreview({
	points,
	pointsReady,
	userLocation,
	userLocationReady,
	refitVersion,
	showLocateButton = true,
	selectedId,
	onSelectPoint,
	onRequestChangeLocation,
}: MapPreviewProps) {
	// Ponto com coordenada de verdade: a API pode devolver endereco sem
	// lat/long, e um NaN no centro deixa o mapa cinza.
	const primeiroComCoordenada = points.find(
		(point) =>
			point.address.latitude != null && point.address.longitude != null,
	);

	const center: [number, number] = userLocation
		? [userLocation.latitude, userLocation.longitude]
		: primeiroComCoordenada
			? [
					primeiroComCoordenada.address.latitude!,
					primeiroComCoordenada.address.longitude!,
				]
			: DEFAULT_CENTER;

	return (
		<div className="flex h-full w-full flex-col gap-3 lg:mx-auto lg:max-w-[1200px]">
			{showLocateButton && <LocateButton onClick={onRequestChangeLocation} />}

			<div className="relative isolate h-[225px] w-full overflow-hidden rounded-xl lg:h-full lg:max-h-[900px] lg:rounded-2xl">
				<MapContainer center={center} zoom={13} className="size-full">
					{/*
					 * Voyager (CARTO) no lugar do tile padrao do OSM: mesma base de
					 * dados, com agua e areas verdes coloridas, porem sem o excesso
					 * de ruas e rotulos. Assim o pin do ponto e o que salta na tela.
					 */}
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
						url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
						subdomains="abcd"
						maxZoom={19}
					/>

					<FitMapView
						userLocation={userLocation}
						points={points}
						ready={pointsReady && userLocationReady}
						refitVersion={refitVersion}
					/>

					<MapResizeHandler />

					{userLocation && (
						<Marker
							position={[userLocation.latitude, userLocation.longitude]}
							icon={userIcon}
						/>
					)}

					{points
						.filter(
							(point) =>
								point.address.latitude != null &&
								point.address.longitude != null,
						)
						.map((point) => (
							<Marker
								key={point.id_donation_point}
								position={[point.address.latitude!, point.address.longitude!]}
								icon={pointIcon(point.id_donation_point === selectedId)}
								eventHandlers={{
									click: () => onSelectPoint?.(point.id_donation_point),
								}}
							/>
						))}
				</MapContainer>

				{/*
				 * Tinta azul da paleta sobre os tiles: fica entre o mapa e os pins
				 * (z abaixo do markerPane do Leaflet), entao os marcadores seguem
				 * clicaveis e na cor cheia.
				 */}
				<span
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 z-[400] bg-blue-tint-2/35 mix-blend-multiply"
				/>
			</div>
		</div>
	);
}
