import { useEffect, useState } from "react";

const PROPRIEDADE = "--barra-inferior";

export function useBarraInferior() {
	const [elemento, setElemento] = useState<HTMLElement | null>(null);

	useEffect(() => {
		if (!elemento) return;

		const raiz = document.documentElement;

		const publicar = () => {
			const posicao = getComputedStyle(elemento).position;
			const flutua = posicao === "fixed" || posicao === "sticky";
			const altura = flutua ? elemento.getBoundingClientRect().height : 0;
			raiz.style.setProperty(PROPRIEDADE, `${Math.round(altura)}px`);
		};

		publicar();
		const observador = new ResizeObserver(publicar);
		observador.observe(elemento);
		window.addEventListener("resize", publicar);

		return () => {
			observador.disconnect();
			window.removeEventListener("resize", publicar);
			raiz.style.removeProperty(PROPRIEDADE);
		};
	}, [elemento]);

	return setElemento;
}
