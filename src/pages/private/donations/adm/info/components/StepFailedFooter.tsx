import { StatusBadge } from "@/components/full/StatusBadge";
import type { DonationStep } from "@/services/types/i-donation";
import { donationStepToken } from "@/utils/status";

type Props = {
	step: DonationStep;
};

export function StepFailedFooter({ step }: Props) {
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center gap-2">
				<span className="text-[13px] font-semibold text-ink-2">
					Status da etapa:
				</span>
				<StatusBadge
					token={donationStepToken(step.status)}
					gender="f"
					size="sm"
				/>
			</div>
			{step.description && (
				<p className="text-[13px] text-ink-2">Motivo: {step.description}</p>
			)}
		</div>
	);
}
