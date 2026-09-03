import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

type Props = {
	posicoes: [number, number][];
};

export function FitRouteBounds({ posicoes }: Props) {
	const map = useMap();
	const assinaturaAnterior = useRef("");

	useEffect(() => {
		if (posicoes.length === 0) {
			return;
		}

		const assinatura = JSON.stringify(posicoes);
		if (assinatura === assinaturaAnterior.current) {
			return;
		}
		assinaturaAnterior.current = assinatura;

		if (posicoes.length === 1) {
			map.setView(posicoes[0], 15);
			return;
		}

		map.fitBounds(posicoes, { padding: [40, 40], maxZoom: 15 });
	}, [map, posicoes]);

	return null;
}
