import { evaApiUrl } from "@/config/env";
import type {
	ConsultasDeIndicadores,
	FiltroDeIndicadores,
} from "./types/i-analytics";

export class ErroDeIndicadores extends Error {
	constructor(readonly status: number) {
		super(
			status === 403
				? "Indicadores exclusivos da administração."
				: "Não foi possível carregar os indicadores agora.",
		);
	}
}

export async function buscarIndicador<C extends keyof ConsultasDeIndicadores>(
	consulta: C,
	filtro: FiltroDeIndicadores,
	token: string,
): Promise<ConsultasDeIndicadores[C]> {
	const parametros = new URLSearchParams();

	for (const [chave, valor] of Object.entries(filtro)) {
		if (valor) {
			parametros.set(chave, valor);
		}
	}

	const resposta = await fetch(
		`${evaApiUrl}/analytics/${consulta}?${parametros.toString()}`,
		{ headers: { Authorization: `Bearer ${token}` } },
	);

	if (!resposta.ok) {
		throw new ErroDeIndicadores(resposta.status);
	}

	return resposta.json();
}
