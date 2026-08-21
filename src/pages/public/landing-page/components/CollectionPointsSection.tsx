import { LoaderCircle } from "lucide-react";
import buscaPontosVazia from "@/assets/illustrations/busca-pontos-vazia.svg";
import { EmptyState } from "@/components/full/EmptyState";
import {
	type FilterChipOption,
	FilterChips,
} from "@/components/full/FilterChips";
import { SearchBar } from "@/components/full/SearchBar";
import { ChangeLocationSheet } from "@/pages/private/donation-points/components/ChangeLocationSheet";
import { DonationPointCard } from "@/pages/private/donation-points/components/DonationPointCard";
import { DonationPointDetailSheet } from "@/pages/private/donation-points/components/DonationPointDetailSheet";
import { MapPreview } from "@/pages/private/donation-points/components/MapPreview";
import {
	type DonationPointsFilter,
	useDonationPointsSearch,
} from "@/pages/private/donation-points/hooks/use-donation-points-search";
import { LandingSection } from "./LandingSection";

const FILTER_OPTIONS: FilterChipOption<DonationPointsFilter>[] = [
	{ key: "all", label: "Todos" },
	{ key: "home", label: "Coleta Domiciliar" },
];

export function CollectionPointsSection() {
	// Mesma logica da tela logada de pontos de coleta, num hook so: antes eram
	// duas copias, e a correcao da busca por CEP tinha ficado so na de la.
	const {
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
		effectiveCoordinates,
		isLocationReady,
		refitVersion,
		isLocationSheetOpen,
		setIsLocationSheetOpen,
		applyZipCode,
		applyCurrentLocation,
	} = useDonationPointsSearch();

	return (
		<LandingSection
			id="pontos-de-coleta"
			label="Pontos de coleta"
			title="Encontre um banco de leite perto de você"
			tone="blue"
			align="center"
			description="Busque pelo CEP ou use sua localização — a rota até o ponto mais próximo abre no mapa."
			surfaceClassName="bg-surface"
		>
			<div className="rounded-card overflow-hidden border border-line bg-surface-2 shadow-soft">
				<div className="flex flex-col gap-3 p-4 lg:p-5">
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

				<div className="grid lg:h-[520px] lg:grid-cols-[1fr_400px]">
					<div className="px-4 pb-4 lg:h-full lg:p-6 lg:pt-0">
						<MapPreview
							points={points}
							pointsReady={!isLoading}
							userLocation={effectiveCoordinates}
							userLocationReady={isLocationReady}
							refitVersion={refitVersion}
							selectedId={selectedId}
							onSelectPoint={(id) => setSelectedId(id)}
							onRequestChangeLocation={() => setIsLocationSheetOpen(true)}
							locateAlign="start"
						/>
					</div>

					<div className="flex max-h-[380px] flex-col gap-3 overflow-y-auto px-4 pb-4 lg:h-full lg:max-h-none lg:border-l lg:border-line lg:p-4">
						{isLoading ? (
							<div className="flex justify-center py-8">
								<LoaderCircle className="size-5 animate-spin text-blue-bright" />
							</div>
						) : points.length === 0 ? (
							<EmptyState
								size="sm"
								illustration={buscaPontosVazia}
								title="Nenhum ponto de coleta encontrado"
								description="Tente outro endereço ou amplie a busca."
							/>
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
				onApplyZipCode={applyZipCode}
				onApplyCurrentLocation={applyCurrentLocation}
			/>

			<DonationPointDetailSheet
				point={selectedPoint}
				open={selectedId !== null}
				isClosest={selectedId !== null && selectedId === closestPointId}
				origin={effectiveCoordinates}
				onOpenChange={(open) => !open && setSelectedId(null)}
			/>
		</LandingSection>
	);
}
