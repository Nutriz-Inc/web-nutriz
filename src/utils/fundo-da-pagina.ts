const ALFA = /(?:rgba\([^)]*,\s*|\/\s*)([\d.]+)(%?)\s*\)$/;

function opaca(cor: string) {
	if (cor === "transparent") {
		return false;
	}

	const alfa = cor.match(ALFA);
	if (!alfa) {
		return true;
	}

	const valor = Number(alfa[1]) / (alfa[2] ? 100 : 1);
	return valor >= 0.99;
}

export function elementoNaBaseDaTela(): Element | null {
	return document.elementFromPoint(
		window.innerWidth / 2,
		window.innerHeight - 2,
	);
}

export function corDeFundoVisivel(inicio: Element | null): string | null {
	let elemento = inicio;

	while (elemento && elemento !== document.documentElement) {
		const cor = getComputedStyle(elemento).backgroundColor;
		if (opaca(cor)) {
			return cor;
		}
		elemento = elemento.parentElement;
	}

	return null;
}

export function pintarFundoDaPagina(cor: string) {
	document.documentElement.style.backgroundColor = cor;
	document.body.style.backgroundColor = cor;
}
