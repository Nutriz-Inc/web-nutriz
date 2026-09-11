import { useEffect, useState } from "react";

export function useDebouncedValue<T>(valor: T, atrasoMs = 400): T {
	const [atrasado, setAtrasado] = useState(valor);

	useEffect(() => {
		const temporizador = window.setTimeout(() => setAtrasado(valor), atrasoMs);

		return () => window.clearTimeout(temporizador);
	}, [valor, atrasoMs]);

	return atrasado;
}
