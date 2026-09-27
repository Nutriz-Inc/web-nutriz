import { Badge } from "@/components/ui/badge";
import type { EnumDonationStepName } from "@/services/types/i-donation";
import { STEP_DISPLAY } from "@/utils/status";

type StepBadgeProps = {
	step: EnumDonationStepName | null;
	label?: string;
	size?: "sm" | "md" | "lg";
};

export function StepBadge({ step, label, size = "lg" }: StepBadgeProps) {
	const display = step ? STEP_DISPLAY[step] : null;

	return (
		<Badge tone={display?.tone ?? "neutral"} dot size={size}>
			{label ?? display?.label ?? "Sem etapa"}
		</Badge>
	);
}
