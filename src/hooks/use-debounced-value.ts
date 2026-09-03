import { useEffect, useState } from "react";

/**
 * Atrasa um valor que muda a cada tecla. Serve para campo digitado que entra em
 * `queryKey`: sem isso, "Sorocaba" dispara oito requisições, uma por letra.
 */
export function useDebouncedValue<T>(valor: T, atrasoMs = 400): T {
	const [atrasado, setAtrasado] = useState(valor);

	useEffect(() => {
		const temporizador = window.setTimeout(() => setAtrasado(valor), atrasoMs);

		return () => window.clearTimeout(temporizador);
	}, [valor, atrasoMs]);

	return atrasado;
}
