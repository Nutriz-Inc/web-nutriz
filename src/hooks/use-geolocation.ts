import { useEffect, useState } from "react";

type Coordinates = {
	latitude: number;
	longitude: number;
};

export function useGeolocation() {
	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
	const [isResolved, setIsResolved] = useState(false);

	useEffect(() => {
		if (!navigator.geolocation) {
			setIsResolved(true);
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCoordinates({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				setIsResolved(true);
			},
			() => {
				setCoordinates(null);
				setIsResolved(true);
			},
		);
	}, []);

	return { coordinates, isResolved };
}
