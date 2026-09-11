import { Badge } from "@/components/ui/badge";
import type { EnumDonationStepName } from "@/services/types/i-donation";
import { STEP_DISPLAY } from "@/utils/status";

type StepBadgeProps = {
	step: EnumDonationStepName | null;
	label?: string;
};

export function StepBadge({ step, label }: StepBadgeProps) {
	const display = step ? STEP_DISPLAY[step] : null;

	return (
		<Badge tone={display?.tone ?? "neutral"} dot size="lg">
			{label ?? display?.label ?? "Sem etapa"}
		</Badge>
	);
}
