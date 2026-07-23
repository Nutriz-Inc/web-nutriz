import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEP_DEFINITIONS } from "@/pages/private/donations/common/info/constants";
import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";

type Props = {
	steps: DonationStep[];
};

export function DonationStatusCard({ steps }: Props) {
	const firstPendingOrder = STEP_DEFINITIONS.find((definition) => {
		const step = steps.find((s) => s.name === definition.name);
		return step?.status !== EnumDonationStepStatus.Done;
	})?.order;

	const currentStep = steps.find(
		(s) =>
			s.name ===
			STEP_DEFINITIONS.find(
				(definition) => definition.order === firstPendingOrder,
			)?.name,
	);

	return (
		<div className="bg-white flex flex-col gap-4 p-5 rounded-[20px] w-full shadow-[0px_10px_14px_rgba(10,38,77,0.05)] border border-[#e5ebf3] lg:gap-5 lg:rounded-3xl lg:p-7">
			<p className="text-[13px] text-[#6b8faa] lg:text-[14px]">
				Status da sua doação atual
			</p>

			<div className="flex flex-col gap-3.5 lg:gap-4">
				{STEP_DEFINITIONS.map((definition) => {
					const step = steps.find((s) => s.name === definition.name);
					const isDone = step?.status === EnumDonationStepStatus.Done;
					const isCurrent = !isDone && definition.order === firstPendingOrder;

					return (
						<div
							key={definition.name}
							className="flex items-center gap-3 lg:gap-4"
						>
							<span
								className={cn(
									"flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold lg:size-8 lg:text-[13px]",
									isDone
										? "bg-[#00458b] text-white"
										: isCurrent
											? "bg-[#0e9e94] text-white"
											: "bg-[#eef0f4] text-[#9aa3b8]",
								)}
							>
								{isDone ? (
									<Check className="size-3.5 lg:size-4" />
								) : (
									definition.order
								)}
							</span>
							<p
								className={cn(
									"text-[15px] lg:text-[17px]",
									isDone || isCurrent
										? "font-semibold text-[#0e2a45]"
										: "text-[#9aa3b8]",
								)}
							>
								{definition.name}
							</p>
						</div>
					);
				})}
			</div>

			<div className="h-px bg-[#e5ebf3]" />

			<p className="text-[13px] text-[#6b8faa] lg:text-[14px]">
				{currentStep?.description ??
					"Acompanhe por aqui as atualizações da sua doação."}
			</p>
		</div>
	);
}
