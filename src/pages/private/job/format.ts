import type { Address } from "@/services/types/i-user";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	timeZone: "UTC",
});

export function formatAppointmentDate(iso: string): string {
	if (!iso) return "—";
	return dateFormatter.format(new Date(iso));
}

export function formatAppointmentDateTime(iso: string): string {
	if (!iso) return "—";
	const date = new Date(iso);
	const hours = String(date.getUTCHours()).padStart(2, "0");
	const minutes = String(date.getUTCMinutes()).padStart(2, "0");
	return `${dateFormatter.format(date)} · ${hours}h${minutes}`;
}

export function formatAppointmentLocation(address?: Address): string {
	if (!address) return "—";

	const street = [address.street, address.number ?? "s/n"]
		.filter(Boolean)
		.join(", ");
	const region = [address.city, address.state].filter(Boolean).join("/");

	return [street, address.neighborhood, region].filter(Boolean).join(" - ");
}
