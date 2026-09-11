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

export function toStepName(name: string): EnumDonationStepName | null {
	const normalized = name.trim().toLowerCase();

	const exact = (Object.values(EnumDonationStepName) as string[]).find(
		(value) => value.toLowerCase() === normalized,
	);
	if (exact) return exact as EnumDonationStepName;

	if (normalized.includes("exame")) return EnumDonationStepName.BloodTest;
	if (normalized.includes("kit")) return EnumDonationStepName.DeliverMilkingKit;
	if (normalized.includes("análise") || normalized.includes("analise"))
		return EnumDonationStepName.MilkAnalysis;
	if (normalized.includes("colet")) return EnumDonationStepName.CollectMilk;

	return null;
}
