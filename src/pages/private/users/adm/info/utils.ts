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
	const normalized = name.trim().toLowerCase();

	const exact = (Object.values(EnumDonationStepName) as string[]).find(
		(value) => value.toLowerCase() === normalized,
	);
	if (exact) return exact as EnumDonationStepName;

	// jobs antigos foram salvos com nomes curtos ("Exame", "Coleta"...)
	if (normalized.includes("exame")) return EnumDonationStepName.BloodTest;
	if (normalized.includes("kit")) return EnumDonationStepName.DeliverMilkingKit;
	if (normalized.includes("análise") || normalized.includes("analise"))
		return EnumDonationStepName.MilkAnalysis;
	if (normalized.includes("colet")) return EnumDonationStepName.CollectMilk;

	return null;
}
