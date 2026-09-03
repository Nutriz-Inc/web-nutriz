import { useEffect, useState } from "react";

const PREFIXO_ANCORA = "nutriz:rota-inicio-local:";

function lerAncora(chave: string): number | null {
	try {
		const salvo = window.localStorage.getItem(chave);
		if (!salvo) return null;

		const valor = Number(salvo);
		return Number.isFinite(valor) ? valor : null;
	} catch {
		return null;
	}
}

function gravarAncora(chave: string, valor: number) {
	try {
		window.localStorage.setItem(chave, String(valor));
	} catch {}
}

function ancoraLocal(inicio: number): number {
	const chave = `${PREFIXO_ANCORA}${inicio}`;
	const salvo = lerAncora(chave);

	if (salvo !== null) {
		return salvo;
	}

	const agora = Date.now();
	gravarAncora(chave, agora);

	return agora;
}

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

	if (fim !== null) {
		return Math.max(fim - inicio, 0);
	}

	const decorrido = agora - inicio;

	if (decorrido >= 0) {
		return decorrido;
	}

	return Math.max(agora - ancoraLocal(inicio), 0);
}
