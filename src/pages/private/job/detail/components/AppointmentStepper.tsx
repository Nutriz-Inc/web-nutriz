import { Bookmark, Check, Lock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppointmentStepItem } from "../../types";
import { getSubLabel } from "../utils";

type AppointmentStepperProps = {
	steps: AppointmentStepItem[];
	ended: boolean;
};

export function AppointmentStepper({ steps, ended }: AppointmentStepperProps) {
	return (
		<div className="flex flex-col gap-4 rounded-card-sm border border-line bg-white p-5">
			<div className="flex items-center gap-2">
				<Bookmark className="size-4 text-ink-3" />
				<span className="text-[12px] font-bold uppercase tracking-wide text-ink-2">
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
										? "bg-danger text-white"
										: isDone
											? "bg-teal text-white"
											: isCurrent
												? "border-2 border-blue-bright bg-white"
												: "bg-surface-3 text-ink-3",
								)}
							>
								{isFailed ? (
									<X className="size-3.5" />
								) : isDone ? (
									<Check className="size-3.5" />
								) : isCurrent ? (
									<span className="size-2 rounded-full bg-blue-bright" />
								) : (
									index + 1
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
												: isDone
													? "font-semibold text-ink"
													: "font-semibold text-ink-3",
									)}
								>
									{step.name}
								</p>
								<p
									className={cn(
										"text-[11px]",
										isFailed ? "text-danger" : "text-ink-3",
									)}
								>
									{getSubLabel(step, ended)}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex items-center gap-2 border-t border-surface-3 pt-3.5">
				<Lock className="size-3.5 shrink-0 text-ink-3" />
				<p className="text-[12px] text-ink-3">
					{ended
						? "Trilha encerrada — somente leitura."
						: "A próxima etapa só é liberada após a conclusão desta."}
				</p>
			</div>
		</div>
	);
}
