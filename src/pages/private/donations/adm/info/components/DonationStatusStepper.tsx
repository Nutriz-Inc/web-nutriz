import { StepTrail, type StepTrailItem } from "@/components/full/StepTrail";
import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";
import type { StepDefinition } from "../../../common/info/constants";
import {
	ADMIN_STEP_STATUS_LABEL,
	type AdminStepVisualStatus,
} from "../constants";

type Props = {
	steps: DonationStep[];
	definitions: StepDefinition[];
	getVisualStatus: (order: number) => AdminStepVisualStatus;
};

export function DonationStatusStepper({
	steps,
	definitions,
	getVisualStatus,
}: Props) {
	const hasFailedStep = steps.some(
		(s) => s.status === EnumDonationStepStatus.Failed,
	);

	const items: StepTrailItem[] = definitions.map((definition) => {
		const step = steps.find((s) => s.name === definition.name);
		const visualStatus = getVisualStatus(definition.order);
		const isCurrent = visualStatus === "current";
		const isFailed = step?.status === EnumDonationStepStatus.Failed;

		const subLabel = step
			? ADMIN_STEP_STATUS_LABEL[step.status]
			: isCurrent
				? "Aguardando agendamento"
				: hasFailedStep
					? "Encerrada"
					: "Bloqueada";

		return {
			key: definition.name,
			order: definition.order,
			label: definition.name,
			subLabel,
			status: isFailed
				? "failed"
				: visualStatus === "done"
					? "done"
					: isCurrent
						? "current"
						: "waiting",
			trailingSlot:
				isCurrent && !isFailed ? (
					<span className="shrink-0 rounded-full bg-blue-tint px-2.5 py-1 text-rotulo font-semibold text-blue-deep">
						Atual
					</span>
				) : undefined,
		};
	});

	return (
		<div className="flex flex-col gap-4 rounded-card-sm border border-line bg-surface p-6">
			<div className="flex flex-col gap-1">
				<p className="font-display text-rotulo font-bold uppercase tracking-[0.06em] text-blue-bright">
					Status da doação
				</p>
				<p className="text-rotulo text-ink-2">
					Etapa só inicia após a anterior ser concluída
				</p>
			</div>

			<StepTrail items={items} />
		</div>
	);
}
