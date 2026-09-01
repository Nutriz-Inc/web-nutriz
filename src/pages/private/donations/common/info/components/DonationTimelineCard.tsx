import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";
import { STEP_DEFINITIONS, type StepVisualStatus } from "../constants";
import { DonationStepCard } from "./DonationStepCard";

type Props = {
	steps: DonationStep[];
	highlightedSteps: ReadonlySet<string>;
	onSelectStep: (idDonationStep: string) => void;
};

export function DonationTimelineCard({
	steps,
	highlightedSteps,
	onSelectStep,
}: Props) {
	const total = STEP_DEFINITIONS.length;

	const firstPendingOrder = STEP_DEFINITIONS.find((definition) => {
		const step = steps.find((s) => s.name === definition.name);
		return step?.status !== EnumDonationStepStatus.Done;
	})?.order;

	return (
		<section className="flex w-full flex-col gap-4 rounded-2xl bg-surface p-4 shadow-soft lg:gap-6 lg:rounded-3xl lg:p-8">
			<div className="flex items-center justify-between gap-3">
				<h2 className="font-display text-xs font-bold uppercase tracking-[0.06em] text-blue-bright lg:text-[13px]">
					Etapas da doação
				</h2>
				<span className="shrink-0 rounded-full bg-surface-3 px-2.5 py-0.5 text-[11px] font-bold text-ink-2 lg:text-[12px]">
					{total} etapas
				</span>
			</div>

			<div className="h-px bg-blue-tint" />

			<div className="flex flex-col">
				{STEP_DEFINITIONS.map((definition, index) => {
					const step = steps.find((s) => s.name === definition.name);

					const visualStatus: StepVisualStatus =
						step?.status === EnumDonationStepStatus.Done
							? "done"
							: definition.order === firstPendingOrder
								? "current"
								: "waiting";

					return (
						<DonationStepCard
							key={definition.name}
							order={definition.order}
							title={step?.name || definition.name}
							description={definition.description}
							setDate={step?.set_date}
							completedAt={step?.completed_at}
							icon={definition.icon}
							visualStatus={visualStatus}
							isLast={index === total - 1}
							justChanged={
								step ? highlightedSteps.has(step.id_donation_step) : false
							}
							onClick={
								step ? () => onSelectStep(step.id_donation_step) : undefined
							}
						/>
					);
				})}
			</div>
		</section>
	);
}
