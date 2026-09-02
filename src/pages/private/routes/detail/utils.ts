import axios from "axios";
import type { IRouteStop } from "@/services/types/i-route";
import { EnumRouteStatus } from "@/services/types/i-route";
import { ERRO_GENERICO, MENSAGENS_DE_ERRO } from "./constants";

export type EstadoDaParada = "concluida" | "atual" | "proxima";

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

export function indiceDaParadaAtual(stops: IRouteStop[]): number {
	return stops.findIndex((stop) => !stop.date_start);
}

export function estadoDaParada(
	stop: IRouteStop,
	indice: number,
	indiceAtual: number,
): EstadoDaParada {
	if (stop.date_start) {
		return "concluida";
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
