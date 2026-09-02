import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { MapResizeHandler } from "@/components/full/MapResizeHandler";
import { useAccessibility } from "@/context/accessibility-context";
import type { IDonationPointResponse } from "@/services/types/i-donation";
import { type Coordinates, FitMapView } from "./FitMapView";
import { LocateButton } from "./LocateButton";

const DEFAULT_CENTER: [number, number] = [-23.5505, -46.6333];

const LIMITES_DO_MUNDO: [[number, number], [number, number]] = [
	[-85, -180],
	[85, 180],
];

const ZOOM_MINIMO = 3;
const ZOOM_MAXIMO = 18;
const ZOOM_MAXIMO_COM_DADOS = 16;

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
			<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-bright-fill opacity-60"></span>
			<span class="relative inline-flex size-[18px] rounded-full border-2 border-white bg-blue-bright-fill"></span>
		</span>
	`,
});

type MapPreviewProps = {
	points: IDonationPointResponse[];
	pointsReady: boolean;
	userLocation: Coordinates | null;
	userLocationReady: boolean;
	refitVersion: number;
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
	const { temaEfetivo } = useAccessibility();
	const escuro = temaEfetivo === "escuro";

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
				<MapContainer
					center={center}
					zoom={13}
					minZoom={ZOOM_MINIMO}
					maxZoom={ZOOM_MAXIMO}
					maxBounds={LIMITES_DO_MUNDO}
					maxBoundsViscosity={1}
					className="size-full"
				>
					<TileLayer
						key={temaEfetivo}
						attribution='Tiles &copy; <a href="https://www.esri.com">Esri</a> &mdash; Esri, DeLorme, NAVTEQ'
						url={`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${escuro ? "Dark" : "Light"}_Gray_Base/MapServer/tile/{z}/{y}/{x}`}
						maxZoom={ZOOM_MAXIMO}
						maxNativeZoom={ZOOM_MAXIMO_COM_DADOS}
						noWrap
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

				{!escuro && (
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 z-[400] bg-blue-tint-2/35 mix-blend-multiply"
					/>
				)}
			</div>
		</div>
	);
}
