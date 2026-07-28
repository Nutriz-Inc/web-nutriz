import { EnumDonationStepName } from "@/services/types/i-donation";
import type { Address } from "@/services/types/i-user";

export function formatFullAddress(address?: Address): string {
	if (!address) return "—";

	const street = [address.street, address.number].filter(Boolean).join(", ");
	const region = [address.city, address.state].filter(Boolean).join("/");
	const area = [address.neighborhood, region].filter(Boolean).join(", ");

	return [street, area].filter(Boolean).join(" — ") || "—";
}

export function formatJobLocation(address?: Address): string {
	if (!address) return "—";

	const street = [address.street, address.number ?? "s/n"]
		.filter(Boolean)
		.join(", ");
	const region = [address.city, address.state].filter(Boolean).join("/");

	return [street, address.neighborhood, region].filter(Boolean).join(" - ");
}

export function formatTimeOnPlatform(createdAt: string): string {
	const start = new Date(createdAt);
	const now = new Date();

	let months =
		(now.getFullYear() - start.getFullYear()) * 12 +
		(now.getMonth() - start.getMonth());
	if (now.getDate() < start.getDate()) months -= 1;

	if (months < 1) {
		const days = Math.max(
			1,
			Math.floor((now.getTime() - start.getTime()) / 86_400_000),
		);
		return `${days} ${days === 1 ? "dia" : "dias"}`;
	}

	const years = Math.floor(months / 12);
	const rest = months % 12;

	const parts: string[] = [];
	if (years > 0) parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
	if (rest > 0) parts.push(`${rest} ${rest === 1 ? "mês" : "meses"}`);

	return parts.join(" e ");
}

export function formatBabyAge(birthDate: string): string {
	const [year, month, day] = birthDate.slice(0, 10).split("-").map(Number);
	const now = new Date();

	let months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
	let days = now.getDate() - day;

	if (days < 0) {
		months -= 1;
		days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
	}

	if (months <= 0) return `${days} ${days === 1 ? "dia" : "dias"}`;

	const monthsLabel = `${months} ${months === 1 ? "mês" : "meses"}`;
	if (days === 0) return monthsLabel;

	return `${monthsLabel} e ${days} ${days === 1 ? "dia" : "dias"}`;
}

export function formatLiters(value?: number): string {
	if (value === undefined || value === null) return "—";

	return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} L`;
}

export function formatShortDateTime(iso: string): string {
	const date = new Date(iso);
	const dayMonth = date.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
	});
	const time = date.toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	return `${dayMonth} · ${time}`;
}

export function formatTimeHM(iso: string): string {
	return new Date(iso).toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}

export function toStepName(name: string): EnumDonationStepName | null {
	return (Object.values(EnumDonationStepName) as string[]).includes(name)
		? (name as EnumDonationStepName)
		: null;
}
