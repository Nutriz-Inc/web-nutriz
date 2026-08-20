import { onlyDigits } from "@/utils/formatter";

export type GeoCoordinates = {
	latitude: number;
	longitude: number;
};

/**
 * Converte um CEP em coordenadas, no proprio navegador.
 *
 * Por que existe: a busca por CEP na tela de pontos de coleta mandava o CEP
 * para a API e mais nada — o mapa nao tinha para onde ir e continuava parado
 * em Sao Paulo, entao parecia que "nenhum CEP funciona". A chamada da API
 * segue exatamente igual (o parametro `zipcode` nao mudou); estas coordenadas
 * servem so para posicionar o mapa e o pino de "voce esta aqui".
 *
 * Sao duas fontes, em cascata, porque nenhuma sozinha cobre todo CEP:
 *
 * 1. BrasilAPI /cep/v2 — a mesma ja usada no cadastro. Quando o provedor que
 *    responde e o open-cep, vem `location.coordinates`; nos outros provedores
 *    vem so o endereco, sem coordenada.
 * 2. Nominatim (OpenStreetMap) — busca pelo CEP e, se preciso, pelo endereco
 *    devolvido no passo 1. Cobre os casos em que a BrasilAPI responde sem
 *    coordenada ou nao responde.
 */

type BrasilApiCep = {
	street?: string;
	neighborhood?: string;
	city?: string;
	state?: string;
	location?: {
		coordinates?: {
			latitude?: string | number;
			longitude?: string | number;
		};
	};
};

type NominatimResult = {
	lat?: string;
	lon?: string;
};

function toCoordinates(
	latitude: unknown,
	longitude: unknown,
): GeoCoordinates | null {
	const lat = Number(latitude);
	const lon = Number(longitude);

	if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
	if (lat === 0 && lon === 0) return null;

	return { latitude: lat, longitude: lon };
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
	const response = await fetch(url, { signal, headers: { Accept: "*/*" } });

	if (!response.ok) throw new Error(`request_failed_${response.status}`);

	return (await response.json()) as T;
}

async function buscaNominatim(
	params: Record<string, string>,
	signal?: AbortSignal,
): Promise<GeoCoordinates | null> {
	const query = new URLSearchParams({
		format: "jsonv2",
		limit: "1",
		countrycodes: "br",
		...params,
	});

	try {
		const resultados = await fetchJson<NominatimResult[]>(
			`https://nominatim.openstreetmap.org/search?${query.toString()}`,
			signal,
		);

		const primeiro = resultados?.[0];

		return primeiro ? toCoordinates(primeiro.lat, primeiro.lon) : null;
	} catch {
		return null;
	}
}

export async function geocodeZipCode(
	cep: string,
	signal?: AbortSignal,
): Promise<GeoCoordinates | null> {
	const digitos = onlyDigits(cep);

	if (digitos.length !== 8) return null;

	let endereco: BrasilApiCep | null = null;

	try {
		endereco = await fetchJson<BrasilApiCep>(
			`https://brasilapi.com.br/api/cep/v2/${digitos}`,
			signal,
		);
	} catch {
		endereco = null;
	}

	const doCep = toCoordinates(
		endereco?.location?.coordinates?.latitude,
		endereco?.location?.coordinates?.longitude,
	);

	if (doCep) return doCep;

	// Sem coordenada na BrasilAPI: o OpenStreetMap resolve pelo proprio CEP...
	const porCep = await buscaNominatim({ postalcode: digitos }, signal);

	if (porCep) return porCep;

	// ...e, em ultimo caso, pelo endereco que a BrasilAPI devolveu.
	if (endereco?.city) {
		const partes = [
			endereco.street,
			endereco.neighborhood,
			endereco.city,
			endereco.state,
		].filter(Boolean);

		return buscaNominatim({ q: partes.join(", ") }, signal);
	}

	return null;
}
