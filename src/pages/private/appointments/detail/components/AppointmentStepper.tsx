import { Bookmark, Check, Lock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatAppointmentDate } from "../../format";
import type { AppointmentStepItem } from "../../types";

type AppointmentStepperProps = {
	steps: AppointmentStepItem[];
	ended: boolean;
};

function getSubLabel(step: AppointmentStepItem, ended: boolean): string {
	const date = step.date ? ` · ${formatAppointmentDate(step.date)}` : "";
	switch (step.state) {
		case "done":
			return `Concluída${date}`;
		case "failed":
			return `Não concluída${date}`;
		case "current":
			return "Etapa atual";
		default:
			return ended ? "Não realizada" : "Aguardando liberação";
	}
}

export function AppointmentStepper({ steps, ended }: AppointmentStepperProps) {
	return (
		<div className="flex flex-col gap-4 rounded-2xl border border-[#e7ecf2] bg-white p-5">
			<div className="flex items-center gap-2">
				<Bookmark className="size-4 text-[#94a3b8]" />
				<span className="text-[12px] font-bold uppercase tracking-wide text-[#6b7280]">
					Etapas da doação
				</span>
			</div>

			<div className="flex flex-col">
				{steps.map((step, index) => {
					const isDone = step.state === "done";
					const isFailed = step.state === "failed";
					const isCurrent = step.state === "current";

					return (
						<div key={step.name} className="flex items-center gap-3.5 py-2.5">
							<div
								className={cn(
									"flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold",
									isFailed
										? "bg-[#e5484d] text-white"
										: isDone
											? "bg-[#12a877] text-white"
											: isCurrent
												? "border-2 border-[#387ccd] bg-white"
												: "bg-[#eef2f7] text-[#9ca3af]",
								)}
							>
								{isFailed ? (
									<X className="size-3.5" />
								) : isDone ? (
									<Check className="size-3.5" />
								) : isCurrent ? (
									<span className="size-2 rounded-full bg-[#387ccd]" />
								) : (
									index + 1
								)}
							</div>

							<div className="flex min-w-0 flex-1 flex-col gap-px">
								<p
									className={cn(
										"text-[14px]",
										isFailed
											? "font-bold text-[#cf3030]"
											: isCurrent
												? "font-bold text-[#1f2a37]"
												: isDone
													? "font-semibold text-[#1f2a37]"
													: "font-semibold text-[#9ca3af]",
									)}
								>
									{step.name}
								</p>
								<p
									className={cn(
										"text-[11px]",
										isFailed ? "text-[#cf3030]" : "text-[#9ca3af]",
									)}
								>
									{getSubLabel(step, ended)}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex items-center gap-2 border-t border-[#eef1f5] pt-3.5">
				<Lock className="size-3.5 shrink-0 text-[#b0b8c4]" />
				<p className="text-[12px] text-[#9ca3af]">
					{ended
						? "Trilha encerrada — somente leitura."
						: "A próxima etapa só é liberada após a conclusão desta."}
				</p>
			</div>
		</div>
	);
}
