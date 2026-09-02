import { useEffect, useState } from "react";

export function useRouteTimer(dateStart?: string, dateEnd?: string): number {
	const inicio = dateStart ? new Date(dateStart).getTime() : null;
	const fim = dateEnd ? new Date(dateEnd).getTime() : null;

	const [agora, setAgora] = useState(() => Date.now());

	const emAndamento = inicio !== null && fim === null;

	useEffect(() => {
		if (!emAndamento) {
			return;
		}

		setAgora(Date.now());
		const relogio = window.setInterval(() => setAgora(Date.now()), 1000);

		return () => window.clearInterval(relogio);
	}, [emAndamento]);

	if (inicio === null) {
		return 0;
	}

	return Math.max((fim ?? agora) - inicio, 0);
}
