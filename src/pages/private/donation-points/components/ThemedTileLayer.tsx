import { useState } from "react";
import { TileLayer } from "react-leaflet";

const ATRIBUICAO =
	'Tiles &copy; <a href="https://www.esri.com">Esri</a> &mdash; Esri, DeLorme, NAVTEQ';

const urlDoMapa = (variante: "Light" | "Dark") =>
	`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${variante}_Gray_Base/MapServer/tile/{z}/{y}/{x}`;

type ThemedTileLayerProps = {
	escuro: boolean;
	maxZoom: number;
	maxNativeZoom: number;
};

export function ThemedTileLayer({
	escuro,
	maxZoom,
	maxNativeZoom,
}: ThemedTileLayerProps) {
	const [escuroJaUsado, setEscuroJaUsado] = useState(escuro);

	if (escuro && !escuroJaUsado) {
		setEscuroJaUsado(true);
	}

	return (
		<>
			<TileLayer
				attribution={ATRIBUICAO}
				url={urlDoMapa("Light")}
				maxZoom={maxZoom}
				maxNativeZoom={maxNativeZoom}
				zIndex={1}
				noWrap
			/>
			{escuroJaUsado && (
				<TileLayer
					url={urlDoMapa("Dark")}
					maxZoom={maxZoom}
					maxNativeZoom={maxNativeZoom}
					opacity={escuro ? 1 : 0}
					zIndex={2}
					noWrap
				/>
			)}
		</>
	);
}
