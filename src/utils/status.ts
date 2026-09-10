import type { LucideIcon } from "lucide-react";
import {
	Ban,
	Check,
	CircleAlert,
	CircleDotDashed,
	Clock,
	Search,
	TriangleAlert,
	X,
} from "lucide-react";

import type { BadgeTone } from "@/components/ui/badge";
import {
	EnumDonationStepName,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";
import { EnumJobStatus } from "@/services/types/i-job";
import { EnumRouteStatus } from "@/services/types/i-route";

export type StatusToken =
	| "pending"
	| "review"
	| "in_progress"
	| "done"
	| "warn"
	| "failed"
	| "error"
	| "canceled";

export type StatusGender = "m" | "f";

type StatusEntry = {
	label: string | Record<StatusGender, string>;
	tone: BadgeTone;
	icon: LucideIcon;
};

export const STATUS_VOCABULARY: Record<StatusToken, StatusEntry> = {
	pending: { label: "Pendente", tone: "warning", icon: Clock },
	review: { label: "Em análise", tone: "info", icon: Search },
	in_progress: { label: "Em andamento", tone: "brand", icon: CircleDotDashed },
	done: {
		label: { m: "Concluído", f: "Concluída" },
		tone: "success",
		icon: Check,
	},
	warn: { label: "Atenção", tone: "orange", icon: TriangleAlert },
	failed: {
		label: { m: "Reprovado", f: "Reprovada" },
		tone: "error",
		icon: X,
	},
	error: { label: "Com erro", tone: "error", icon: CircleAlert },
	canceled: {
		label: { m: "Cancelado", f: "Cancelada" },
		tone: "neutral",
		icon: Ban,
	},
};

export function getStatusLabel(
	token: StatusToken,
	gender: StatusGender = "m",
): string {
	const { label } = STATUS_VOCABULARY[token];

	return typeof label === "string" ? label : label[gender];
}

const DONATION_STEP_TOKEN: Record<EnumDonationStepStatus, StatusToken> = {
	[EnumDonationStepStatus.Pending]: "pending",
	[EnumDonationStepStatus.Review]: "review",
	[EnumDonationStepStatus.Done]: "done",
	[EnumDonationStepStatus.Warn]: "warn",
	[EnumDonationStepStatus.Failed]: "failed",
};

const JOB_TOKEN: Record<EnumJobStatus, StatusToken> = {
	[EnumJobStatus.Pending]: "pending",
	[EnumJobStatus.Done]: "done",
	[EnumJobStatus.Failed]: "failed",
};

const ROUTE_TOKEN: Record<EnumRouteStatus, StatusToken> = {
	[EnumRouteStatus.Pending]: "pending",
	[EnumRouteStatus.InProgress]: "in_progress",
	[EnumRouteStatus.Done]: "done",
	[EnumRouteStatus.Error]: "error",
	[EnumRouteStatus.Canceled]: "canceled",
};

export function donationStepToken(status: EnumDonationStepStatus): StatusToken {
	return DONATION_STEP_TOKEN[status] ?? "pending";
}

export function jobToken(status: EnumJobStatus): StatusToken {
	return JOB_TOKEN[status] ?? "pending";
}

export function routeToken(status: EnumRouteStatus): StatusToken {
	return ROUTE_TOKEN[status] ?? "pending";
}

export function donationToken(
	isActive: boolean,
	hasError: boolean,
): StatusToken {
	if (hasError) return "error";

	return isActive ? "in_progress" : "done";
}

export const STEP_DISPLAY: Record<
	EnumDonationStepName,
	{ label: string; tone: BadgeTone }
> = {
	[EnumDonationStepName.BloodTest]: { label: "Exames", tone: "pink" },
	[EnumDonationStepName.CollectMilk]: { label: "Coleta", tone: "brand" },
	[EnumDonationStepName.DeliverMilkingKit]: {
		label: "Entrega do Kit",
		tone: "teal",
	},
	[EnumDonationStepName.MilkAnalysis]: { label: "Análise", tone: "magenta" },
};
