export function formatZipCode(raw: string): string {
	const digits = raw.replace(/\D/g, "").slice(0, 8);

	if (digits.length <= 5) return digits;

	return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function formatPhoneNumber(raw: string) {
	const digits = raw.replace(/\D/g, "");

	if (digits.length === 11) {
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
	}

	if (digits.length === 10) {
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
	}

	return raw;
}

export function formatCep(value: string): string {
	return value
		.replace(/\D/g, "")
		.replace(/^(\d{5})(\d)/, "$1-$2")
		.slice(0, 9);
}

export function formatDateBR(isoDate: string): string {
	return new Date(isoDate).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}
