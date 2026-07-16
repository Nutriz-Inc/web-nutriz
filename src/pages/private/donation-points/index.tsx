import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
	type FilterChipOption,
	FilterChips,
} from "@/components/full/FilterChips";
import { SearchBar } from "@/components/full/SearchBar";
import { Page } from "@/components/layout/Page";
import { useGeolocation } from "@/hooks/use-geolocation";
import { ChangeLocationSheet } from "./components/ChangeLocationSheet";
import { DonationPointCard } from "./components/DonationPointCard";
import { DonationPointDetailSheet } from "./components/DonationPointDetailSheet";
import type { Coordinates } from "./components/FitMapView";
import { MapPreview } from "./components/MapPreview";
import { useQueryDonationPoints } from "./hooks";

type LocationOverride =
	| ({ kind: "coordinates" } & Coordinates)
	| { kind: "zipcode"; zipcode: string };

type FilterKey = "all" | "home";

const FILTER_OPTIONS: FilterChipOption<FilterKey>[] = [
	{ key: "all", label: "Todos" },
	{ key: "home", label: "Coleta Domiciliar" },
];

export function DonationPointsPage() {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [filter, setFilter] = useState<FilterKey>("all");
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

	const zipCodeOverride =
		locationOverride?.kind === "zipcode" ? locationOverride.zipcode : undefined;
	const coordinatesOverride =
		locationOverride?.kind === "coordinates" ? locationOverride : null;
	const effectiveCoordinates = zipCodeOverride
		? null
		: (coordinatesOverride ?? coordinates);

	const { data, isLoading } = useQueryDonationPoints({
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

	function handleApplyZipCode(zipcode: string) {
		setLocationOverride({ kind: "zipcode", zipcode });
		setRefitVersion((version) => version + 1);
		setIsLocationSheetOpen(false);
	}

	function handleApplyCurrentLocation(coords: Coordinates) {
		setLocationOverride({ kind: "coordinates", ...coords });
		setRefitVersion((version) => version + 1);
		setIsLocationSheetOpen(false);
	}

	return (
		<Page
			loading={isLoading}
			title="Pontos de Coleta"
			description="Encontre o ponto de coleta mais próximo de você."
		>
			<div className="-m-5 flex flex-col bg-[#f7f7fa] lg:grid lg:h-[calc(100vh-69px)] lg:grid-cols-[420px_1fr] lg:grid-rows-[auto_1fr] lg:overflow-hidden">
				<div className="flex flex-col gap-3 px-4 pt-4 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-[#e0e0e0] lg:bg-[#f7f7fa]lg:px-5 lg:pb-4 lg:pt-5">
					<SearchBar
						value={search}
						onChange={setSearch}
						placeholder="Buscar ponto de coleta"
					/>

					<div className="flex gap-2 overflow-x-auto pb-1">
						<FilterChips
							options={FILTER_OPTIONS}
							value={filter}
							onChange={setFilter}
						/>
					</div>
				</div>

				<div className="px-4 pt-4 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:h-full lg:overflow-hidden lg:p-6">
					<MapPreview
						points={points}
						pointsReady={!isLoading}
						userLocation={effectiveCoordinates}
						userLocationReady={
							locationOverride !== null || isGeolocationResolved
						}
						refitVersion={refitVersion}
						selectedId={selectedId}
						onSelectPoint={(id) => setSelectedId(id)}
						onRequestChangeLocation={() => setIsLocationSheetOpen(true)}
					/>
				</div>

				<div className="relative mt-4 flex-1 rounded-t-2xl border-t border-[#e0e0e0] bg-[#f7f7fa] pb-6 pt-3 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:min-h-0 lg:overflow-y-auto lg:rounded-none lg:border-r lg:border-t-0 lg:pt-4">
					<div className="mx-auto mb-3 h-1 w-9 rounded-full bg-[#e0e0e0] lg:hidden" />

					{isLoading ? (
						<div className="flex justify-center py-8">
							<LoaderCircle className="size-5 animate-spin text-[#387ccd]" />
						</div>
					) : points.length === 0 ? (
						<p className="px-4 py-8 text-center text-sm text-[#888]">
							Nenhum ponto de coleta encontrado.
						</p>
					) : (
						<div className="flex flex-col gap-3 px-4">
							{points.map((point) => (
								<DonationPointCard
									key={point.id_donation_point}
									point={point}
									selected={point.id_donation_point === selectedId}
									onSelect={() => setSelectedId(point.id_donation_point)}
								/>
							))}
						</div>
					)}
				</div>

				<ChangeLocationSheet
					open={isLocationSheetOpen}
					onOpenChange={setIsLocationSheetOpen}
					onApplyZipCode={handleApplyZipCode}
					onApplyCurrentLocation={handleApplyCurrentLocation}
				/>

				<DonationPointDetailSheet
					point={selectedPoint}
					open={selectedId !== null}
					isClosest={selectedId !== null && selectedId === closestPointId}
					onOpenChange={(open) => !open && setSelectedId(null)}
				/>
			</div>
		</Page>
	);
}
