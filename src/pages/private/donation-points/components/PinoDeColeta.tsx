import { divIcon } from "leaflet";
import { useMemo } from "react";
import { Marker } from "react-leaflet";

export type FaseDoMapa = "aguardando" | "revelando" | "pronto";

type PinoDeColetaProps = {
	posicao: [number, number];
	selecionado: boolean;
	destaque: boolean;
	fase: FaseDoMapa;
	atraso: number;
	aoSelecionar: () => void;
};

export function PinoDeColeta({
	posicao,
	selecionado,
	destaque,
	fase,
	atraso,
	aoSelecionar,
}: PinoDeColetaProps) {
	const icone = useMemo(() => {
		const largura = selecionado ? 34 : 26;
		const altura = selecionado ? 46 : 35;
		const cor = selecionado ? "#e0457a" : "#d92b3f";
		const atributos = [
			`data-fase="${fase}"`,
			selecionado ? "data-selecionado" : "",
			destaque && fase === "pronto" ? "data-destaque" : "",
		].join(" ");

		return divIcon({
			className: "",
			iconSize: [largura, altura],
			iconAnchor: [largura / 2, altura],
			html: `<span class="pino-coleta" ${atributos} style="--atraso:${atraso}ms">
				<span class="pino-coleta-anel" aria-hidden="true"></span>
				<svg width="${largura}" height="${altura}" viewBox="0 0 26 35" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 2px 3px rgba(15,31,61,.35))">
					<path d="M13 0C5.82 0 0 5.82 0 13c0 9.75 13 22 13 22s13-12.25 13-22c0-7.18-5.82-13-13-13z" fill="${cor}"/>
					<path d="M11.4 7.6h3.2v3.2h3.2v3.2h-3.2v3.2h-3.2v-3.2H8.2v-3.2h3.2z" fill="#ffffff"/>
				</svg>
			</span>`,
		});
	}, [selecionado, destaque, fase, atraso]);

	return (
		<Marker
			position={posicao}
			icon={icone}
			eventHandlers={{ click: aoSelecionar }}
		/>
	);
}
