import axios from "axios";
import type { IRouteStop } from "@/services/types/i-route";
import { EnumRouteStatus, EnumRouteStopStatus } from "@/services/types/i-route";
import { ERRO_GENERICO, MENSAGENS_DE_ERRO } from "./constants";

export type EstadoDaParada = "concluida" | "erro" | "atual" | "proxima";

export function ehRotaEncerrada(status: EnumRouteStatus): boolean {
	return (
		status === EnumRouteStatus.Done ||
		status === EnumRouteStatus.Canceled ||
		status === EnumRouteStatus.Error
	);
}

export function ehRotaAlteravel(status: EnumRouteStatus): boolean {
	return status !== EnumRouteStatus.Done && status !== EnumRouteStatus.Canceled;
}

export function ordenarParadas(stops: IRouteStop[]): IRouteStop[] {
	return [...stops].sort((a, b) => (a.stop_order ?? 0) - (b.stop_order ?? 0));
}

export function paradaMarcada(stop: IRouteStop): boolean {
	return Boolean(stop.date_start) || stop.status === EnumRouteStopStatus.Error;
}

export function paradasPendentes(stops: IRouteStop[]): number {
	return stops.filter((stop) => !paradaMarcada(stop)).length;
}

export function indiceDaParadaAtual(stops: IRouteStop[]): number {
	return stops.findIndex((stop) => !paradaMarcada(stop));
}

export function estadoDaParada(
	stop: IRouteStop,
	indice: number,
	indiceAtual: number,
): EstadoDaParada {
	if (stop.date_start) {
		return "concluida";
	}
	if (stop.status === EnumRouteStopStatus.Error) {
		return "erro";
	}
	return indice === indiceAtual ? "atual" : "proxima";
}

export function formatarCronometro(ms: number): string {
	const total = Math.max(Math.floor(ms / 1000), 0);
	const horas = Math.floor(total / 3600);
	const minutos = Math.floor((total % 3600) / 60);
	const segundos = total % 60;

	return [horas, minutos, segundos]
		.map((parte) => String(parte).padStart(2, "0"))
		.join(":");
}

export function formatarDuracaoCurta(ms: number): string {
	const totalMinutos = Math.max(Math.round(ms / 60000), 0);
	const horas = Math.floor(totalMinutos / 60);
	const minutos = totalMinutos % 60;

	if (horas === 0) {
		return `${minutos} min`;
	}
	if (minutos === 0) {
		return `${horas}h`;
	}
	return `${horas}h ${minutos}min`;
}

export function formatarEndereco(stop: IRouteStop): string {
	const address = stop.address;
	if (!address) {
		return "Endereço não informado";
	}

	const logradouro = [address.street, address.number ?? "s/n"]
		.filter(Boolean)
		.join(", ");
	const regiao = [address.city, address.state].filter(Boolean).join("/");

	return [logradouro, address.neighborhood, regiao].filter(Boolean).join(" · ");
}

export function partesDoEndereco(stop: IRouteStop): {
	linha: string;
	regiao: string;
} {
	const address = stop.address;

	if (!address) {
		return { linha: "Endereço não informado", regiao: "" };
	}

	const linha = [address.street, address.number ?? "s/n"]
		.filter(Boolean)
		.join(", ");
	const regiao = [
		address.neighborhood,
		[address.city, address.state].filter(Boolean).join("/"),
	]
		.filter(Boolean)
		.join(" · ");

	return { linha, regiao };
}

export function temCoordenadas(stop: IRouteStop): boolean {
	return stop.address?.latitude != null && stop.address?.longitude != null;
}

export function mensagemDeErro(erro: unknown): string {
	if (!axios.isAxiosError(erro)) {
		return ERRO_GENERICO;
	}

	const dados = erro.response?.data as
		| { code?: string; message?: string }
		| undefined;

	if (dados?.code && MENSAGENS_DE_ERRO[dados.code]) {
		return MENSAGENS_DE_ERRO[dados.code];
	}

	const bruto = JSON.stringify(dados ?? "");
	const codigo = Object.keys(MENSAGENS_DE_ERRO).find((chave) =>
		bruto.includes(chave),
	);

	return codigo ? MENSAGENS_DE_ERRO[codigo] : ERRO_GENERICO;
}

export function coordenadasDaParada(stop: IRouteStop): string | null {
	const latitude = stop.address?.latitude;
	const longitude = stop.address?.longitude;

	if (latitude == null || longitude == null) {
		return null;
	}

	return `${latitude},${longitude}`;
}

export function urlDoGoogleMaps(stops: IRouteStop[]): string | null {
	const pontos = stops
		.map(coordenadasDaParada)
		.filter((ponto): ponto is string => ponto !== null);

	if (pontos.length === 0) {
		return null;
	}

	const trajeto = pontos.join("/");

	return `https://www.google.com/maps/dir/${trajeto}/?travelmode=driving`;
}

const LIMITE_RELATO = 500;

export function acrescentarRelato(
	relatoAtual: string | undefined,
	novaEntrada: string,
): string {
	const quebra = String.fromCharCode(10);
	const entradas = [
		...(relatoAtual ? relatoAtual.split(quebra).filter(Boolean) : []),
		novaEntrada,
	];

	while (entradas.length > 1 && entradas.join(quebra).length > LIMITE_RELATO) {
		entradas.shift();
	}

	return entradas.join(quebra).slice(0, LIMITE_RELATO);
}

export function entradaDeImprevisto(
	numero: number,
	stop: IRouteStop,
	texto: string,
): string {
	const { linha } = partesDoEndereco(stop);

	return `Parada ${numero} (${linha}): ${texto.trim()}`;
}
