import { Lock } from "lucide-react";
import { StepTrail, type StepTrailItem } from "@/components/full/StepTrail";
import type { AppointmentStepItem } from "../../types";
import { getSubLabel } from "../utils";

type AppointmentStepperProps = {
	steps: AppointmentStepItem[];
	ended: boolean;
};

export function AppointmentStepper({ steps, ended }: AppointmentStepperProps) {
	const items: StepTrailItem[] = steps.map((step, index) => ({
		key: step.name,
		order: index + 1,
		label: step.name,
		subLabel: getSubLabel(step, ended),
		status:
			step.state === "failed"
				? "failed"
				: step.state === "done"
					? "done"
					: step.state === "current"
						? "current"
						: "waiting",
	}));

	return (
		<div className="flex flex-col gap-4 rounded-card-sm bg-surface p-5 shadow-soft">
			<p className="font-display text-xs font-bold uppercase tracking-[0.06em] text-blue-bright">
				Etapas da doação
			</p>

			<StepTrail items={items} />

			<div className="flex items-center gap-2 border-t border-line pt-3.5">
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
