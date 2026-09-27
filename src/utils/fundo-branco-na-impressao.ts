export function fundoBrancoNaImpressao(): () => void {
	const raiz = document.documentElement;
	const anterior = raiz.style.backgroundColor;
	raiz.style.backgroundColor = "#ffffff";

	return () => {
		raiz.style.backgroundColor = anterior;
	};
}
