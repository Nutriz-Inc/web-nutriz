import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { IDonationPointResponse } from "@/services/types/i-donation";
import { FitMapView, type Coordinates } from "./FitMapView";
import { LocateButton } from "./LocateButton";
import { MapResizeHandler } from "./MapResizeHandler";

const DEFAULT_CENTER: [number, number] = [-23.5505, -46.6333]; // São Paulo

const pointIcon = (selected: boolean) =>
	divIcon({
		className: "",
		iconSize: [selected ? 24 : 18, selected ? 24 : 18],
		iconAnchor: [selected ? 12 : 9, selected ? 12 : 9],
		html: `<span class="block rounded-full border-2 border-white shadow-md ${
			selected ? "bg-[#f2579f]" : "bg-[#0e9e94]"
		}" style="width:100%;height:100%"></span>`,
	});

const userIcon = divIcon({
	className: "",
	iconSize: [18, 18],
	iconAnchor: [9, 9],
	html: `
		<span class="relative flex size-[18px]">
			<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#387ccd] opacity-60"></span>
			<span class="relative inline-flex size-[18px] rounded-full border-2 border-white bg-[#387ccd]"></span>
		</span>
	`,
});

type MapPreviewProps = {
	points: IDonationPointResponse[];
	pointsReady: boolean;
	userLocation: Coordinates | null;
	userLocationReady: boolean;
	refitVersion: number;
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
	selectedId,
	onSelectPoint,
	onRequestChangeLocation,
}: MapPreviewProps) {
	const center: [number, number] = userLocation
		? [userLocation.latitude, userLocation.longitude]
		: points[0]
			? [points[0].address.latitude!, points[0].address.longitude!]
			: DEFAULT_CENTER;

	return (
		<div className="relative isolate h-[225px] w-full overflow-hidden rounded-xl lg:mx-auto lg:h-full lg:max-h-[900px] lg:w-full lg:max-w-[1200px] lg:rounded-2xl">
			<MapContainer center={center} zoom={13} className="size-full">
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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

				{points.map((point) => (
					<Marker
						key={point.id_donation_point}
						position={[point.address.latitude!, point.address.longitude!]}
						icon={pointIcon(point.id_donation_point === selectedId)}
						eventHandlers={{
							click: () => onSelectPoint?.(point.id_donation_point),
						}}
					/>
				))}

				<LocateButton onClick={onRequestChangeLocation} />
			</MapContainer>
		</div>
	);
}
