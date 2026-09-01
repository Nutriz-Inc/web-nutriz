import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import type { Coordinates } from "../components/FitMapView";
import { useQueryDonationPoints } from "./index";

export type DonationPointsFilter = "all" | "home";

type LocationOverride =
	| ({ kind: "coordinates" } & Coordinates)
	| {
			kind: "zipcode";
			zipcode: string;
			coordinates: Coordinates | null;
	  };

export function useDonationPointsSearch() {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [filter, setFilter] = useState<DonationPointsFilter>("all");
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [locationOverride, setLocationOverride] =
		useState<LocationOverride | null>(null);
	const [refitVersion, setRefitVersion] = useState(0);
	const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);

	const { coordinates, isResolved: isGeolocationResolved } = useGeolocation();

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedSearch(search), 400);

		return () => clearTimeout(timeout);
	}, [search]);

	const zipCodeSearch =
		locationOverride?.kind === "zipcode" ? locationOverride : null;
	const zipCodeOverride = zipCodeSearch?.zipcode;
	const coordinatesOverride =
		locationOverride?.kind === "coordinates" ? locationOverride : null;

	const effectiveCoordinates = zipCodeSearch
		? zipCodeSearch.coordinates
		: (coordinatesOverride ?? coordinates);

	const { data, isLoading, isPlaceholderData } = useQueryDonationPoints({
		name: debouncedSearch || undefined,
		has_home: filter === "home" ? true : undefined,
		zipcode: zipCodeOverride,
		latitude: zipCodeOverride ? undefined : effectiveCoordinates?.latitude,
		longitude: zipCodeOverride ? undefined : effectiveCoordinates?.longitude,
	});

	const points = data?.data ?? [];

	const selectedPoint =
		points.find((point) => point.id_donation_point === selectedId) ?? null;

	const closestPointId = points.reduce<string | null>((closestId, point) => {
		if (point.distance_from_you == null) return closestId;

		const closestPoint = points.find(
			(candidate) => candidate.id_donation_point === closestId,
		);

		if (
			!closestPoint ||
			point.distance_from_you < (closestPoint.distance_from_you ?? Infinity)
		) {
			return point.id_donation_point;
		}

		return closestId;
	}, null);

	function applyZipCode(zipcode: string, coords: Coordinates | null) {
		setLocationOverride({ kind: "zipcode", zipcode, coordinates: coords });
		setRefitVersion((version) => version + 1);
		setIsLocationSheetOpen(false);
	}

	function applyCurrentLocation(coords: Coordinates) {
		setLocationOverride({ kind: "coordinates", ...coords });
		setRefitVersion((version) => version + 1);
		setIsLocationSheetOpen(false);
	}

	return {
		search,
		setSearch,
		filter,
		setFilter,
		selectedId,
		setSelectedId,
		selectedPoint,
		closestPointId,
		points,
		isLoading,
		isPlaceholderData,
		effectiveCoordinates,
		isLocationReady: locationOverride !== null || isGeolocationResolved,
		refitVersion,
		isLocationSheetOpen,
		setIsLocationSheetOpen,
		applyZipCode,
		applyCurrentLocation,
	};
}
