import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";
import { LocateFixed } from "lucide-react";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { IDonationPointResponse } from "@/services/types/i-donation";

const DEFAULT_CENTER: [number, number] = [-23.5505, -46.6333]; // São Paulo

const pointIcon = (selected: boolean) =>
	divIcon({
		className: "",
		iconSize: [selected ? 24 : 18, selected ? 24 : 18],
		iconAnchor: [selected ? 12 : 9, selected ? 12 : 9],
		html: `<span class="block rounded-full border-2 border-white shadow-md ${
			selected ? "bg-[#f2579f]" : "bg-[#387ccd]"
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

type Coordinates = {
	latitude: number;
	longitude: number;
};

type DonationPointWithLocation = IDonationPointResponse & {
	address: NonNullable<IDonationPointResponse["address"]> & {
		latitude: number;
		longitude: number;
	};
};

function hasLocation(
	point: IDonationPointResponse,
): point is DonationPointWithLocation {
	return (
		point.address?.latitude != null && point.address?.longitude != null
	);
}

function FitMapToData({
	userLocation,
	points,
	ready,
}: {
	userLocation: Coordinates | null;
	points: DonationPointWithLocation[];
	ready: boolean;
}) {
	const map = useMap();
	const hasFitted = useRef(false);

	useEffect(() => {
		if (hasFitted.current || !ready) return;

		const coords: [number, number][] = points.map((point) => [
			point.address.latitude,
			point.address.longitude,
		]);

		if (userLocation) {
			coords.push([userLocation.latitude, userLocation.longitude]);
		}

		if (coords.length === 0) return;

		hasFitted.current = true;

		if (coords.length === 1) {
			map.setView(coords[0], 14);
			return;
		}

		map.fitBounds(coords, { padding: [36, 36], maxZoom: 15 });
	}, [map, userLocation, points, ready]);

	return null;
}

function LocateButton({ userLocation }: { userLocation: Coordinates | null }) {
	const map = useMap();

	function handleLocate() {
		if (userLocation) {
			map.flyTo([userLocation.latitude, userLocation.longitude], 15);
			return;
		}

		navigator.geolocation?.getCurrentPosition((position) => {
			map.flyTo([position.coords.latitude, position.coords.longitude], 15);
		});
	}

	return (
		<button
			type="button"
			onClick={handleLocate}
			aria-label="Centralizar na minha localização"
			className="absolute bottom-3 right-3 z-[1000] flex size-9 items-center justify-center rounded-full border border-[#e0e0e0] bg-white shadow-md"
		>
			<LocateFixed className="size-5 text-[#387ccd]" />
		</button>
	);
}

type MapPreviewProps = {
	points: IDonationPointResponse[];
	pointsReady: boolean;
	userLocation: Coordinates | null;
	userLocationReady: boolean;
	selectedId: string | null;
	onSelectPoint?: (id: string) => void;
};

export function MapPreview({
	points,
	pointsReady,
	userLocation,
	userLocationReady,
	selectedId,
	onSelectPoint,
}: MapPreviewProps) {
	const pointsWithLocation = points.filter(hasLocation);

	const center: [number, number] = userLocation
		? [userLocation.latitude, userLocation.longitude]
		: pointsWithLocation[0]
			? [pointsWithLocation[0].address.latitude, pointsWithLocation[0].address.longitude]
			: DEFAULT_CENTER;

	return (
		<div className="relative h-[225px] w-full overflow-hidden rounded-xl">
			<MapContainer center={center} zoom={13} className="size-full">
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<FitMapToData
					userLocation={userLocation}
					points={pointsWithLocation}
					ready={pointsReady && userLocationReady}
				/>

				{userLocation && (
					<Marker
						position={[userLocation.latitude, userLocation.longitude]}
						icon={userIcon}
					/>
				)}

				{pointsWithLocation.map((point) => (
					<Marker
						key={point.id_donation_point}
						position={[point.address.latitude, point.address.longitude]}
						icon={pointIcon(point.id_donation_point === selectedId)}
						eventHandlers={{
							click: () => onSelectPoint?.(point.id_donation_point),
						}}
					/>
				))}

				<LocateButton userLocation={userLocation} />
			</MapContainer>
		</div>
	);
}
