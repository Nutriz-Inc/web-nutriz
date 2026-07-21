import { Check } from "lucide-react";
import { Status } from "@/components/full/Status";
import type { DonationStep } from "@/services/types/i-donation";
import { formatDateBR } from "@/utils/formatter";

type Props = {
	step: DonationStep;
};

export function StepDoneFooter({ step }: Props) {
	return (
		<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
			<div className="flex items-center gap-2">
				<span className="text-[13px] font-semibold text-[#6b7280]">
					Status da etapa:
				</span>
				<Status status={step.status} dot />
			</div>
			{step.completed_at && (
				<div className="flex items-center gap-1.5 text-[#16614a]">
					<Check className="size-3.5" />
					<span className="text-[13px] font-semibold">
						Etapa finalizada em {formatDateBR(step.completed_at)}
					</span>
				</div>
			)}
		</div>
	);
}
