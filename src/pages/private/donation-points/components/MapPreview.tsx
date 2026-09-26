import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";

import { useMemo } from "react";
import { MapContainer, Marker } from "react-leaflet";
import { MapResizeHandler } from "@/components/full/MapResizeHandler";
import { useAccessibility } from "@/context/accessibility-context";
import type { IDonationPointResponse } from "@/services/types/i-donation";
import { type Coordinates, FitMapView } from "./FitMapView";
import { LocateButton } from "./LocateButton";
import { type FaseDoMapa, PinoDeColeta } from "./PinoDeColeta";
import { ThemedTileLayer } from "./ThemedTileLayer";

const DEFAULT_CENTER: [number, number] = [-23.5505, -46.6333];

const LIMITES_DO_MUNDO: [[number, number], [number, number]] = [
	[-85, -180],
	[85, 180],
];

const ZOOM_MINIMO = 3;
const ZOOM_MAXIMO = 18;
const ZOOM_MAXIMO_COM_DADOS = 16;

const ATRASO_MINIMO = 180;
const ATRASO_MAXIMO = 1300;

function iconeDoUsuario(radar: boolean) {
	return divIcon({
		className: "",
		iconSize: [18, 18],
		iconAnchor: [9, 9],
		html: `
		<span class="relative flex size-[18px]">
			${radar ? '<span class="radar-onda" aria-hidden="true"></span><span class="radar-onda radar-onda--eco" aria-hidden="true"></span>' : ""}
			<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-bright-fill opacity-60"></span>
			<span class="relative inline-flex size-[18px] rounded-full border-2 border-white bg-blue-bright-fill"></span>
		</span>
	`,
	});
}

function distanciaRelativa(
	origem: [number, number],
	destino: [number, number],
) {
	const cosseno = Math.cos((origem[0] * Math.PI) / 180);
	return Math.hypot(destino[0] - origem[0], (destino[1] - origem[1]) * cosseno);
}

type MapPreviewProps = {
	points: IDonationPointResponse[];
	pointsReady: boolean;
	userLocation: Coordinates | null;
	userLocationReady: boolean;
	refitVersion: number;
	showLocateButton?: boolean;
	selectedId: string | null;
	onSelectPoint?: (id: string) => void;
	onRequestChangeLocation: () => void;
	fase?: FaseDoMapa;
	destaqueId?: string | null;
};

export function MapPreview({
	points,
	pointsReady,
	userLocation,
	userLocationReady,
	refitVersion,
	showLocateButton = true,
	selectedId,
	onSelectPoint,
	onRequestChangeLocation,
	fase = "pronto",
	destaqueId = null,
}: MapPreviewProps) {
	const { temaEfetivo } = useAccessibility();
	const escuro = temaEfetivo === "escuro";

	const primeiroComCoordenada = points.find(
		(point) =>
			point.address.latitude != null && point.address.longitude != null,
	);

	const center: [number, number] = userLocation
		? [userLocation.latitude, userLocation.longitude]
		: primeiroComCoordenada
			? [
					primeiroComCoordenada.address.latitude!,
					primeiroComCoordenada.address.longitude!,
				]
			: DEFAULT_CENTER;

	const comCoordenada = points.filter(
		(point) =>
			point.address.latitude != null && point.address.longitude != null,
	);

	const distancias = comCoordenada.map((point) =>
		distanciaRelativa(center, [
			point.address.latitude ?? 0,
			point.address.longitude ?? 0,
		]),
	);
	const menorDistancia = Math.min(...distancias.filter((d) => d > 0), 1);
	const alcance = menorDistancia * 4;

	const radar = fase === "revelando";
	const iconeUsuario = useMemo(() => iconeDoUsuario(radar), [radar]);

	return (
		<div className="flex h-full w-full flex-col gap-3 lg:mx-auto lg:max-w-[1200px]">
			{showLocateButton && <LocateButton onClick={onRequestChangeLocation} />}

			<div className="relative isolate h-[225px] w-full overflow-hidden rounded-xl lg:h-full lg:max-h-[900px] lg:rounded-2xl">
				<MapContainer
					center={center}
					zoom={13}
					minZoom={ZOOM_MINIMO}
					maxZoom={ZOOM_MAXIMO}
					maxBounds={LIMITES_DO_MUNDO}
					maxBoundsViscosity={1}
					className="size-full"
				>
					<ThemedTileLayer
						escuro={escuro}
						maxZoom={ZOOM_MAXIMO}
						maxNativeZoom={ZOOM_MAXIMO_COM_DADOS}
					/>

					<FitMapView
						userLocation={userLocation}
						points={points}
						ready={pointsReady && userLocationReady}
						refitVersion={refitVersion}
					/>

					<MapResizeHandler />

					{userLocation && (
						<Marker
							position={[userLocation.latitude, userLocation.longitude]}
							icon={iconeUsuario}
						/>
					)}

					{comCoordenada.map((point, indice) => {
						const proporcao = Math.min(1, distancias[indice] / alcance);

						return (
							<PinoDeColeta
								key={point.id_donation_point}
								posicao={[point.address.latitude!, point.address.longitude!]}
								selecionado={point.id_donation_point === selectedId}
								destaque={point.id_donation_point === destaqueId}
								fase={fase}
								atraso={Math.round(
									ATRASO_MINIMO +
										(ATRASO_MAXIMO - ATRASO_MINIMO) * proporcao ** 1.6,
								)}
								aoSelecionar={() => onSelectPoint?.(point.id_donation_point)}
							/>
						);
					})}
				</MapContainer>

				{radar && !userLocation ? (
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 z-[450] overflow-hidden"
					>
						<span className="radar-onda" />
						<span className="radar-onda radar-onda--eco" />
					</span>
				) : null}

				{!escuro && (
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 z-[400] bg-blue-tint-2/35 mix-blend-multiply"
					/>
				)}
			</div>
		</div>
	);
}
