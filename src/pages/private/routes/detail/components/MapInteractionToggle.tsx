import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
	interativo: boolean;
};

export function MapInteractionToggle({ interativo }: Props) {
	const map = useMap();

	useEffect(() => {
		const manipuladores = [
			map.dragging,
			map.scrollWheelZoom,
			map.doubleClickZoom,
			map.touchZoom,
			map.boxZoom,
			map.keyboard,
		];

		for (const manipulador of manipuladores) {
			if (interativo) {
				manipulador.enable();
			} else {
				manipulador.disable();
			}
		}
	}, [map, interativo]);

	return null;
}
