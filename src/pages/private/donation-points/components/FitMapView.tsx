import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import type { IDonationPointResponse } from "@/services/types/i-donation";

export type Coordinates = {
	latitude: number;
	longitude: number;
};

export function FitMapView({
	userLocation,
	points,
	ready,
	refitVersion,
}: {
	userLocation: Coordinates | null;
	points: IDonationPointResponse[];
	ready: boolean;
	refitVersion: number;
}) {
	const map = useMap();
	const hasFitted = useRef(false);
	const previousRefitVersion = useRef(refitVersion);

	useEffect(() => {
		const isInitialFit = !hasFitted.current;

		if (isInitialFit) {
			if (!ready) return;
		} else if (refitVersion === previousRefitVersion.current) {
			return;
		}

		hasFitted.current = true;
		previousRefitVersion.current = refitVersion;

		const coords: [number, number][] = points.map((point) => [
			point.address.latitude!,
			point.address.longitude!,
		]);

		if (userLocation) {
			coords.push([userLocation.latitude, userLocation.longitude]);
		}

		if (coords.length === 0) return;

		if (coords.length === 1) {
			map.setView(coords[0], 15);
			return;
		}

		map.fitBounds(coords, { padding: [36, 36], maxZoom: 15 });
	}, [map, userLocation, points, ready, refitVersion]);

	return null;
}
