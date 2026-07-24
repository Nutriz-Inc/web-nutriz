import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function MapResizeHandler() {
	const map = useMap();

	useEffect(() => {
		const container = map.getContainer();
		const resizeObserver = new ResizeObserver(() => {
			map.invalidateSize();
		});

		resizeObserver.observe(container);

		return () => resizeObserver.disconnect();
	}, [map]);

	return null;
}
