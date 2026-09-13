let pendente = false;
const ouvintes = new Set<() => void>();

export function pedirRelatorio() {
	pendente = true;

	for (const ouvinte of ouvintes) {
		ouvinte();
	}
}

export function consumirPedidoDeRelatorio() {
	const havia = pendente;
	pendente = false;

	return havia;
}

export function subscribePedidoDeRelatorio(ouvinte: () => void) {
	ouvintes.add(ouvinte);

	return () => {
		ouvintes.delete(ouvinte);
	};
}
