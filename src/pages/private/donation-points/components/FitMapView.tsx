import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import type { IDonationPointResponse } from "@/services/types/i-donation";

export type Coordinates = {
	latitude: number;
	longitude: number;
};

/** Distancia aproximada em km, so para escolher o ponto mais proximo. */
function distanciaKm(a: Coordinates, b: [number, number]): number {
	const dLat = a.latitude - b[0];
	const dLon = (a.longitude - b[1]) * Math.cos((a.latitude * Math.PI) / 180);

	return Math.hypot(dLat, dLon) * 111;
}

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

		const coords: [number, number][] = points
			.filter(
				(point) =>
					point.address.latitude != null && point.address.longitude != null,
			)
			.map((point) => [point.address.latitude!, point.address.longitude!]);

		// Com uma localizacao (CEP buscado ou GPS), o enquadramento e ela mais o
		// ponto de coleta mais proximo. Antes o mapa abria todos os pontos do
		// pais de uma vez, entao trocar o CEP quase nao mexia na imagem — parecia
		// que a busca nao tinha funcionado.
		if (userLocation) {
			const origem: [number, number] = [
				userLocation.latitude,
				userLocation.longitude,
			];

			const maisProximo = coords.reduce<[number, number] | null>(
				(melhor, atual) =>
					!melhor ||
					distanciaKm(userLocation, atual) < distanciaKm(userLocation, melhor)
						? atual
						: melhor,
				null,
			);

			if (!maisProximo) {
				map.setView(origem, 14);
				return;
			}

			map.fitBounds([origem, maisProximo], {
				padding: [48, 48],
				maxZoom: 15,
			});
			return;
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
