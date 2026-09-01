import { LoaderCircle } from "lucide-react";
import buscaPontosVazia from "@/assets/illustrations/busca-pontos-vazia.svg";
import pontosTopo from "@/assets/illustrations/pontos-topo.svg";
import { EmptyState } from "@/components/full/EmptyState";
import {
	type FilterChipOption,
	FilterChips,
} from "@/components/full/FilterChips";
import { RefreshableList } from "@/components/full/RefreshableList";
import { SearchBar } from "@/components/full/SearchBar";
import { Page } from "@/components/layout/Page";
import { ChangeLocationSheet } from "./components/ChangeLocationSheet";
import { DonationPointCard } from "./components/DonationPointCard";
import { DonationPointDetailSheet } from "./components/DonationPointDetailSheet";
import { MapPreview } from "./components/MapPreview";
import {
	type DonationPointsFilter,
	useDonationPointsSearch,
} from "./hooks/use-donation-points-search";

const FILTER_OPTIONS: FilterChipOption<DonationPointsFilter>[] = [
	{ key: "all", label: "Todos" },
	{ key: "home", label: "Coleta Domiciliar" },
];

export function DonationPointsPage() {
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
		isPlaceholderData,
		effectiveCoordinates,
		isLocationReady,
		refitVersion,
		isLocationSheetOpen,
		setIsLocationSheetOpen,
		applyZipCode,
		applyCurrentLocation,
	} = useDonationPointsSearch();

	return (
		<Page
			loading={isLoading}
			title="Pontos de Coleta"
			description="Encontre o ponto de coleta mais próximo de você."
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
		>
			<div className="-mx-4 -mt-4 -mb-16 sm:-mx-6 sm:-mt-6 flex flex-col bg-surface-2 lg:mx-auto lg:grid lg:h-[calc(100vh-69px)] lg:max-w-[1400px] lg:grid-cols-[420px_1fr] lg:grid-rows-[auto_1fr] lg:overflow-hidden lg:rounded-2xl">
				<div className="flex flex-col gap-3 px-4 pt-4 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-line lg:bg-surface-2 lg:px-5 lg:pb-4 lg:pt-5">
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
						userLocationReady={isLocationReady}
						refitVersion={refitVersion}
						selectedId={selectedId}
						onSelectPoint={(id) => setSelectedId(id)}
						onRequestChangeLocation={() => setIsLocationSheetOpen(true)}
					/>
				</div>

				<div className="relative mt-4 flex-1 rounded-t-2xl border-t border-line bg-surface-2 pb-6 pt-3 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:min-h-0 lg:overflow-y-auto lg:rounded-none lg:border-r lg:border-t-0 lg:pt-4">
					<div className="mx-auto mb-3 h-1 w-9 rounded-full bg-blue-tint-2 lg:hidden" />

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
						<RefreshableList updating={isPlaceholderData}>
							<div className="flex flex-col gap-3 px-4 lg:px-5">
								{points.map((point) => (
									<DonationPointCard
										key={point.id_donation_point}
										point={point}
										selected={point.id_donation_point === selectedId}
										onSelect={() => setSelectedId(point.id_donation_point)}
									/>
								))}

								<img
									src={pontosTopo}
									alt=""
									aria-hidden="true"
									data-so-tema-claro
									width={220}
									height={160}
									className="mx-auto mt-6 hidden h-28 w-auto select-none opacity-90 lg:block"
								/>
							</div>
						</RefreshableList>
					)}
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
			</div>
		</Page>
	);
}
