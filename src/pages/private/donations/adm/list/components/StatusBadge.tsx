/* eslint-disable react-refresh/only-export-components */
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { EnumDonationStepName } from "@/services/types/i-donation";

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

type StatusBadgeProps = {
	step: EnumDonationStepName | null;
	label?: string;
};

export function StatusBadge({ step, label }: StatusBadgeProps) {
	const display = step ? STEP_DISPLAY[step] : null;

	return (
		<Badge tone={display?.tone ?? "neutral"} dot size="lg">
			{label ?? display?.label ?? "Sem etapa"}
		</Badge>
	);
}
