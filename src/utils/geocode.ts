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
	display_name?: string;
};

function normalizar(texto: string) {
	return texto
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.replace(/[^a-z0-9]+/g, " ")
		.trim();
}

function contemTodos(
	texto: string | undefined,
	termos: (string | undefined)[],
) {
	const alvo = normalizar(texto ?? "");
	return termos.every((termo) => !termo || alvo.includes(normalizar(termo)));
}

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
	aceitar?: (nome: string | undefined) => boolean,
): Promise<GeoCoordinates | null> {
	const query = new URLSearchParams({
		format: "jsonv2",
		limit: aceitar ? "5" : "1",
		countrycodes: "br",
		...params,
	});

	try {
		const resultados = await fetchJson<NominatimResult[]>(
			`https://nominatim.openstreetmap.org/search?${query.toString()}`,
			signal,
		);

		const primeiro = aceitar
			? resultados?.find((resultado) => aceitar(resultado.display_name))
			: resultados?.[0];

		return primeiro ? toCoordinates(primeiro.lat, primeiro.lon) : null;
	} catch {
		return null;
	}
}

type ViaCep = {
	erro?: boolean | string;
	logradouro?: string;
	bairro?: string;
	localidade?: string;
	uf?: string;
};

type EnderecoDoCep = {
	rua?: string;
	bairro?: string;
	cidade?: string;
	uf?: string;
	coordenadas: GeoCoordinates | null;
};

const coordenadasPorCep = new Map<string, GeoCoordinates | null>();

async function enderecoDoCep(
	digitos: string,
	signal?: AbortSignal,
): Promise<EnderecoDoCep | null> {
	try {
		const brasilApi = await fetchJson<BrasilApiCep>(
			`https://brasilapi.com.br/api/cep/v2/${digitos}`,
			signal,
		);
		if (brasilApi?.city) {
			return {
				rua: brasilApi.street,
				bairro: brasilApi.neighborhood,
				cidade: brasilApi.city,
				uf: brasilApi.state,
				coordenadas: toCoordinates(
					brasilApi.location?.coordinates?.latitude,
					brasilApi.location?.coordinates?.longitude,
				),
			};
		}
	} catch {}

	try {
		const viaCep = await fetchJson<ViaCep>(
			`https://viacep.com.br/ws/${digitos}/json/`,
			signal,
		);
		if (viaCep && !viaCep.erro && viaCep.localidade) {
			return {
				rua: viaCep.logradouro,
				bairro: viaCep.bairro,
				cidade: viaCep.localidade,
				uf: viaCep.uf,
				coordenadas: null,
			};
		}
	} catch {}

	return null;
}

export async function geocodeZipCode(
	cep: string,
	signal?: AbortSignal,
): Promise<GeoCoordinates | null> {
	const digitos = onlyDigits(cep);

	if (digitos.length !== 8) return null;

	if (coordenadasPorCep.has(digitos)) {
		return coordenadasPorCep.get(digitos) ?? null;
	}

	const endereco = await enderecoDoCep(digitos, signal);
	const cepFormatado = `${digitos.slice(0, 5)}-${digitos.slice(5)}`;

	const tentativas: {
		parametros: Record<string, string>;
		aceitar: (nome: string | undefined) => boolean;
	}[] = [];

	if (endereco?.rua && endereco.cidade) {
		const daRua = (nome: string | undefined) =>
			contemTodos(nome, [endereco.rua, endereco.cidade]);
		tentativas.push({
			parametros: {
				street: endereco.rua,
				city: endereco.cidade,
				...(endereco.uf ? { state: endereco.uf } : {}),
			},
			aceitar: daRua,
		});
		tentativas.push({
			parametros: {
				q: [endereco.rua, endereco.bairro, endereco.cidade, endereco.uf]
					.filter(Boolean)
					.join(", "),
			},
			aceitar: daRua,
		});
	}

	if (endereco?.bairro && endereco.cidade) {
		tentativas.push({
			parametros: {
				q: [endereco.bairro, endereco.cidade, endereco.uf]
					.filter(Boolean)
					.join(", "),
			},
			aceitar: (nome) => contemTodos(nome, [endereco.bairro, endereco.cidade]),
		});
	}

	tentativas.push({
		parametros: { postalcode: cepFormatado },
		aceitar: (nome) =>
			endereco?.cidade
				? contemTodos(nome, [endereco.cidade])
				: normalizar(nome ?? "").includes(digitos.slice(0, 5)),
	});

	let encontrado: GeoCoordinates | null = null;

	for (const { parametros, aceitar } of tentativas) {
		encontrado = await buscaNominatim(parametros, signal, aceitar);
		if (encontrado) break;
	}

	if (!encontrado) {
		encontrado =
			endereco?.coordenadas ??
			(endereco?.cidade
				? await buscaNominatim(
						{
							city: endereco.cidade,
							...(endereco.uf ? { state: endereco.uf } : {}),
						},
						signal,
					)
				: null);
	}

	if (!signal?.aborted) {
		coordenadasPorCep.set(digitos, encontrado);
	}

	return encontrado;
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

	const estruturada = await buscaNominatim(params, signal);

	if (estruturada) return estruturada;

	const livre = await buscaNominatim(
		{ q: [neighborhood, city, "Brasil"].filter(Boolean).join(", ") },
		signal,
	);

	if (livre) return livre;

	if (city && neighborhood) {
		return buscaNominatim({ city }, signal);
	}

	return null;
}
