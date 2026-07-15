export function onlyDigits(value: string): string {
	return value.replace(/\D/g, "");
}

export function maskCpf(value: string): string {
	const digits = onlyDigits(value).slice(0, 11);
	return digits
		.replace(/^(\d{3})(\d)/, "$1.$2")
		.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
		.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

export function maskPhone(value: string): string {
	const digits = onlyDigits(value).slice(0, 11);
	if (digits.length === 0) return "";
	if (digits.length <= 2) return `(${digits}`;
	if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	if (digits.length <= 10) {
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
	}
	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function maskCep(value: string): string {
	const digits = onlyDigits(value).slice(0, 8);
	if (digits.length <= 5) return digits;
	return `${digits.slice(0, 5)}-${digits.slice(5)}`;
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

export function isValidDateBr(value: string): boolean {
	const digits = onlyDigits(value);
	if (digits.length !== 8) return false;
	const day = Number(digits.slice(0, 2));
	const month = Number(digits.slice(2, 4));
	const year = Number(digits.slice(4, 8));
	if (year < 1900 || month < 1 || month > 12) return false;
	const date = new Date(year, month - 1, day);
	return (
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day
	);
}

export function isValidCpf(value: string): boolean {
	const digits = onlyDigits(value);
	if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
	const checkDigit = (factor: number): number => {
		let total = 0;
		for (let index = 0; index < factor - 1; index++) {
			total += Number(digits[index]) * (factor - index);
		}
		const rest = (total * 10) % 11;
		return rest === 10 ? 0 : rest;
	};
	return (
		checkDigit(10) === Number(digits[9]) &&
		checkDigit(11) === Number(digits[10])
	);
}
