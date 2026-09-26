import {
	formatCreatedAt,
	formatDateBR,
	formatMonthBR,
} from "@/utils/formatter";

const DATA_COM_HORA = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
const DATA_PURA = /^\d{4}-\d{2}-\d{2}$/;
const MES = /^\d{4}-\d{2}$/;

const numero = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });

export function formatarCelula(valor: unknown): string {
	if (valor === null || valor === undefined || valor === "") {
		return "—";
	}

	if (typeof valor === "boolean") {
		return valor ? "Sim" : "Não";
	}

	if (typeof valor === "number") {
		return numero.format(valor);
	}

	const texto = String(valor);

	if (DATA_COM_HORA.test(texto)) {
		return formatCreatedAt(texto);
	}

	if (DATA_PURA.test(texto)) {
		return formatDateBR(texto);
	}

	if (MES.test(texto)) {
		return formatMonthBR(texto);
	}

	return texto;
}
