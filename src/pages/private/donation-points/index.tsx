import { LoaderCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { DonationPointCard } from "./components/DonationPointCard";
import { type FilterKey, FilterTabs } from "./components/FilterTabs";
import { MapPreview } from "./components/MapPreview";
import { useQueryDonationPoints } from "./hooks";

export function DonationPointsPage() {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [filter, setFilter] = useState<FilterKey>("all");
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const { coordinates, isResolved: isGeolocationResolved } = useGeolocation();

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedSearch(search), 400);

		return () => clearTimeout(timeout);
	}, [search]);

	const { data, isLoading } = useQueryDonationPoints({
		name: debouncedSearch || undefined,
		has_home: filter === "home" ? true : undefined,
		latitude: coordinates?.latitude,
		longitude: coordinates?.longitude,
	});

	const points = (data?.data ?? []).filter((point) =>
		filter === "open" ? !!point.opening_hours : true,
	);

	return (
		<div className="-m-5 flex flex-col bg-[#f7f7fa]">
			<div className="flex flex-col gap-3 px-4 pt-4">
				<div className="relative">
					<Search className="pointer-events-none absolute left-4 top-1/2 size-[15px] -translate-y-1/2 text-[#387ccd]" />
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Buscar ponto de coleta"
						className="h-[39px] w-full rounded-full bg-[#dbe7f6] pl-10 pr-4 text-[11px] text-[#387ccd] outline-none placeholder:text-[#387ccd]/70"
					/>
				</div>

				<FilterTabs value={filter} onChange={setFilter} />
			</div>

			<div className="px-4 pt-4">
				<MapPreview
					points={points}
					pointsReady={!isLoading}
					userLocation={coordinates}
					userLocationReady={isGeolocationResolved}
					selectedId={selectedId}
					onSelectPoint={(id) =>
						setSelectedId((current) => (current === id ? null : id))
					}
				/>
			</div>

			<div className="relative mt-4 flex-1 rounded-t-2xl border-t border-[#e0e0e0] bg-white pb-6 pt-3">
				<div className="mx-auto mb-3 h-1 w-9 rounded-full bg-[#e0e0e0]" />

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
								onSelect={() =>
									setSelectedId((current) =>
										current === point.id_donation_point
											? null
											: point.id_donation_point,
									)
								}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
