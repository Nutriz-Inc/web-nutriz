import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DonationStep } from "@/services/types/i-donation";
import {
	ADMIN_STEP_DEFINITIONS,
	ADMIN_STEP_STATUS_LABEL,
	type AdminStepVisualStatus,
} from "../constants";

type Props = {
	steps: DonationStep[];
	getVisualStatus: (order: number) => AdminStepVisualStatus;
};

export function DonationStatusStepper({ steps, getVisualStatus }: Props) {
	return (
		<div className="flex flex-col gap-4 rounded-2xl border border-[#e7eaef] bg-white p-6">
			<div className="flex flex-col gap-1">
				<p className="text-[17px] font-bold text-[#1f2a37]">Status da doação</p>
				<p className="text-[12px] text-[#6b7280]">
					Etapa só inicia após a anterior ser concluída
				</p>
			</div>

			<div className="flex flex-col">
				{ADMIN_STEP_DEFINITIONS.map((definition) => {
					const step = steps.find((s) => s.name === definition.name);
					const visualStatus = getVisualStatus(definition.order);
					const isDone = visualStatus === "done";
					const isCurrent = visualStatus === "current";

					return (
						<div
							key={definition.name}
							className="flex items-center gap-3.5 py-2.5"
						>
							<div
								className={cn(
									"flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold",
									isDone
										? "bg-[#1b7f79] text-white"
										: isCurrent
											? "bg-[#e0f5fb] text-[#0e7490]"
											: "bg-[#eef2f7] text-[#9ca3af]",
								)}
							>
								{isDone ? <Check className="size-3.5" /> : definition.order}
							</div>

							<div className="flex min-w-0 flex-1 flex-col gap-px">
								<p
									className={cn(
										"text-[14px]",
										isCurrent
											? "font-bold text-[#1f2a37]"
											: "font-semibold text-[#6b7280]",
									)}
								>
									{definition.label}
								</p>
								<p className="text-[11px] text-[#9ca3af]">
									{isDone
										? "Concluído"
										: isCurrent
											? step
												? ADMIN_STEP_STATUS_LABEL[step.status]
												: "Aguardando agendamento"
											: "Bloqueada"}
								</p>
							</div>

							{isCurrent && (
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
