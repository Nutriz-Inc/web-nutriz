import { onlyDigits } from "@/utils/formatter";

export type GeoCoordinates = {
	latitude: number;
	longitude: number;
};

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

	const porCep = await buscaNominatim({ postalcode: digitos }, signal);

	if (porCep) return porCep;

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

export async function geocodeRegion(
	city?: string,
	neighborhood?: string,
	signal?: AbortSignal,
): Promise<GeoCoordinates | null> {
	if (!city && !neighborhood) {
		return null;
	}

	const params: Record<string, string> = {};

	if (city) params.city = city;
	if (neighborhood) params.suburb = neighborhood;

	return buscaNominatim(params, signal);
}
