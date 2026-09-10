export function onlyDigits(value: string): string {
	return value.replace(/\D/g, "");
}

export function formatZipCode(raw: string): string {
	const digits = raw.replace(/\D/g, "").slice(0, 8);

	if (digits.length <= 5) return digits;

	return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function formatPhoneNumber(raw: string) {
	const digits = raw.replace(/\D/g, "");

	const phone =
		digits.startsWith("55") && digits.length === 13 ? digits.slice(2) : digits;

	if (phone.length === 11) {
		return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
	}

	if (phone.length === 10) {
		return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
	}

	return raw;
}

export function maskPhoneNumber(raw: string): string {
	let digits = onlyDigits(raw);

	if (digits.startsWith("55") && digits.length > 11) {
		digits = digits.slice(2);
	}

	digits = digits.slice(0, 11);

	if (digits.length <= 2) return digits;

	if (digits.length <= 6) {
		return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	}

	if (digits.length <= 10) {
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
	}

	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function formatCep(value: string): string {
	return value
		.replace(/\D/g, "")
		.replace(/^(\d{5})(\d)/, "$1-$2")
		.slice(0, 9);
}

export function formatCpf(value: string): string {
	return value
		.replace(/\D/g, "")
		.slice(0, 11)
		.replace(/^(\d{3})(\d)/, "$1.$2")
		.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
		.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

export function maskDate(value: string): string {
	const digits = onlyDigits(value).slice(0, 8);
	if (digits.length <= 2) return digits;
	if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
	return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function dateBrToIso(value: string): string {
	const digits = onlyDigits(value);
	return `${digits.slice(4, 8)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`;
}

export function phoneToE164(value: string): string {
	return `+55${onlyDigits(value)}`;
}

export function formatMl(value?: number | null): string {
	if (value === undefined || value === null) return "—";

	return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} ml`;
}

// Campos de data pura (data de nascimento, data prevista) chegam como
// "2026-08-12" e precisam de UTC, senao o fuso do Brasil joga para o dia 11.
// Carimbos de tempo, ao contrario, sao lidos no fuso local -- e a data
// precisa acompanhar a hora, senao aparece o dia em UTC ao lado da hora local.
const OPCOES_DATA = {
	day: "2-digit",
	month: "short",
	year: "numeric",
} as const;

const dataPura = new Intl.DateTimeFormat("pt-BR", {
	...OPCOES_DATA,
	timeZone: "UTC",
});

const dataLocal = new Intl.DateTimeFormat("pt-BR", OPCOES_DATA);

const diaMesLocal = new Intl.DateTimeFormat("pt-BR", {
	day: "2-digit",
	month: "short",
});

const horaMinuto = new Intl.DateTimeFormat("pt-BR", {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
});

function montarData(formatador: Intl.DateTimeFormat, data: Date): string {
	return formatador
		.formatToParts(data)
		.filter(
			(parte) =>
				parte.type === "day" || parte.type === "month" || parte.type === "year",
		)
		.map((parte) =>
			parte.type === "month" ? parte.value.replace(".", "") : parte.value,
		)
		.join(" ");
}

export function formatDateBR(isoDate: string): string {
	return montarData(dataPura, new Date(isoDate));
}

export function formatTimeBR(valor: string | Date): string {
	const data = valor instanceof Date ? valor : new Date(valor);

	return horaMinuto.format(data).replace(":", "h");
}

export function formatCreatedAt(createdAt: string) {
	return `${montarData(dataLocal, new Date(createdAt))} · ${formatTimeBR(createdAt)}`;
}

export function formatShortDateTime(isoDate: string): string {
	return `${montarData(diaMesLocal, new Date(isoDate))} · ${formatTimeBR(isoDate)}`;
}

export function formatDateTimeParts(value: string): {
	date: string;
	time: string;
} {
	return {
		date: montarData(dataLocal, new Date(value)),
		time: formatTimeBR(value),
	};
}
