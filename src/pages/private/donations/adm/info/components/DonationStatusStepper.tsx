import { AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";
import { STEP_DEFINITIONS } from "../../../common/info/constants";
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
		<div className="flex flex-col gap-4 rounded-card-sm border border-line bg-surface p-6">
			<div className="flex flex-col gap-1">
				<p className="text-[16px] font-bold text-ink">Status da doação</p>
				<p className="text-[12px] text-ink-2">
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
										? "bg-danger text-white"
										: isDone
											? "bg-success text-white"
											: isCurrent
												? "bg-blue-tint text-teal"
												: "bg-surface-3 text-ink-3",
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
											? "font-bold text-danger"
											: isCurrent
												? "font-bold text-ink"
												: "font-semibold text-ink-2",
									)}
								>
									{definition.name}
								</p>
								<p
									className={cn(
										"text-[11px]",
										isFailed ? "text-danger" : "text-ink-3",
									)}
								>
									{subLabel}
								</p>
							</div>

							{isCurrent && !isFailed && (
								<span className="shrink-0 rounded-full bg-blue-tint px-2.5 py-1 text-[11px] font-semibold text-teal">
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
