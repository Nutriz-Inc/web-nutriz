import { AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";
import { STEP_DEFINITIONS } from "../../info/constants";
import {
	ADMIN_STEP_STATUS_LABEL,
	type AdminStepVisualStatus,
} from "../constants";

type Props = {
	steps: DonationStep[];
	getVisualStatus: (order: number) => AdminStepVisualStatus;
};

export function DonationStatusStepper({ steps, getVisualStatus }: Props) {
	const hasFailedStep = steps.some(
		(s) => s.status === EnumDonationStepStatus.Failed,
	);

	return (
		<div className="flex flex-col gap-4 rounded-2xl border border-[#e7eaef] bg-white p-6">
			<div className="flex flex-col gap-1">
				<p className="text-[17px] font-bold text-[#1f2a37]">Status da doação</p>
				<p className="text-[12px] text-[#6b7280]">
					Etapa só inicia após a anterior ser concluída
				</p>
			</div>

			<div className="flex flex-col">
				{STEP_DEFINITIONS.map((definition) => {
					const step = steps.find((s) => s.name === definition.name);
					const visualStatus = getVisualStatus(definition.order);
					const isDone = visualStatus === "done";
					const isCurrent = visualStatus === "current";
					const isFailed = step?.status === EnumDonationStepStatus.Failed;
					const subLabel = step
						? ADMIN_STEP_STATUS_LABEL[step.status]
						: isCurrent
							? "Aguardando agendamento"
							: hasFailedStep
								? "Encerrada"
								: "Bloqueada";

					return (
						<div
							key={definition.name}
							className="flex items-center gap-3.5 py-2.5"
						>
							<div
								className={cn(
									"flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold",
									isFailed
										? "bg-[#a32d2d] text-white"
										: isDone
											? "bg-[#1b7f79] text-white"
											: isCurrent
												? "bg-[#e0f5fb] text-[#0e7490]"
												: "bg-[#eef2f7] text-[#9ca3af]",
								)}
							>
								{isFailed ? (
									<AlertTriangle className="size-3.5" />
								) : isDone ? (
									<Check className="size-3.5" />
								) : (
									definition.order
								)}
							</div>

							<div className="flex min-w-0 flex-1 flex-col gap-px">
								<p
									className={cn(
										"text-[14px]",
										isFailed
											? "font-bold text-[#a32d2d]"
											: isCurrent
												? "font-bold text-[#1f2a37]"
												: "font-semibold text-[#6b7280]",
									)}
								>
									{definition.name}
								</p>
								<p
									className={cn(
										"text-[11px]",
										isFailed ? "text-[#a32d2d]" : "text-[#9ca3af]",
									)}
								>
									{subLabel}
								</p>
							</div>

							{isCurrent && !isFailed && (
								<span className="shrink-0 rounded-full bg-[#e0f5fb] px-2.5 py-1 text-[11px] font-semibold text-[#0e7490]">
									Atual
								</span>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
