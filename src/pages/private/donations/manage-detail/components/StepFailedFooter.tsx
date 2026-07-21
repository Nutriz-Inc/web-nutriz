import { Status } from "@/components/full/Status";
import type { DonationStep } from "@/services/types/i-donation";

type Props = {
	step: DonationStep;
};

export function StepFailedFooter({ step }: Props) {
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center gap-2">
				<span className="text-[13px] font-semibold text-[#6b7280]">
					Status da etapa:
				</span>
				<Status status={step.status} dot />
			</div>
			{step.description && (
				<p className="text-[13px] text-[#6b7280]">Motivo: {step.description}</p>
			)}
		</div>
	);
}
