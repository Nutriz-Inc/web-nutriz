import { motion } from "framer-motion";
import { LoaderCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { ChangeLocationSheet } from "@/pages/private/donation-points/components/ChangeLocationSheet";
import { DonationPointCard } from "@/pages/private/donation-points/components/DonationPointCard";
import { DonationPointDetailSheet } from "@/pages/private/donation-points/components/DonationPointDetailSheet";
import {
	type FilterKey,
	FilterTabs,
} from "@/pages/private/donation-points/components/FilterTabs";
import type { Coordinates } from "@/pages/private/donation-points/components/FitMapView";
import { MapPreview } from "@/pages/private/donation-points/components/MapPreview";
import { useQueryDonationPoints } from "@/pages/private/donation-points/hooks";
import { useReveal } from "../hooks/use-reveal";
import { SectionLabel } from "./SectionLabel";

type LocationOverride =
	| ({ kind: "coordinates" } & Coordinates)
	| { kind: "zipcode"; zipcode: string };

export function CollectionPointsSection() {
	const headerReveal = useReveal();

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
		<section
			id="pontos-de-coleta"
			className="scroll-mt-20 bg-white py-20 lg:py-24"
		>
			<div className="mx-auto w-full max-w-[1200px] px-5 lg:px-8">
				<motion.div
					{...headerReveal}
					className="flex flex-col items-center gap-3 text-center"
				>
					<SectionLabel color="#387ccd">PONTOS DE COLETA</SectionLabel>
					<h2 className="max-w-2xl text-[30px] font-extrabold tracking-tight text-[#12294d] lg:text-[38px]">
						Encontre um banco de leite perto de você
					</h2>
				</motion.div>

				<div className="mt-10 overflow-hidden rounded-3xl border border-[#e5ebf3] bg-[#f7f7fa] shadow-[0px_10px_14px_rgba(10,38,77,0.05)]">
					<div className="flex flex-col gap-3 p-4 lg:p-5">
						<div className="relative">
							<Search className="pointer-events-none absolute left-4 top-1/2 size-[15px] -translate-y-1/2 text-[#387ccd]" />
							<input
								value={search}
								onChange={(event) => setSearch(event.target.value)}
								placeholder="Buscar ponto de coleta"
								className="h-[42px] w-full rounded-full bg-[#dbe7f6] pl-10 pr-4 text-[13px] text-[#387ccd] outline-none placeholder:text-[#387ccd]/70"
							/>
						</div>

						<FilterTabs value={filter} onChange={setFilter} />
					</div>

					<div className="grid lg:h-[520px] lg:grid-cols-[1fr_400px]">
						<div className="relative order-1 h-[300px] p-4 pt-0 lg:h-full lg:p-6 lg:pt-0">
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

						<div className="order-2 flex flex-col gap-3 px-4 pb-4 lg:h-full lg:overflow-y-auto lg:border-l lg:border-[#e0e0e0] lg:p-4">
							{isLoading ? (
								<div className="flex justify-center py-8">
									<LoaderCircle className="size-5 animate-spin text-[#387ccd]" />
								</div>
							) : points.length === 0 ? (
								<p className="px-4 py-8 text-center text-sm text-[#888]">
									Nenhum ponto de coleta encontrado.
								</p>
							) : (
								points.map((point) => (
									<DonationPointCard
										key={point.id_donation_point}
										point={point}
										selected={point.id_donation_point === selectedId}
										onSelect={() => setSelectedId(point.id_donation_point)}
									/>
								))
							)}
						</div>
					</div>
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
		</section>
	);
}
