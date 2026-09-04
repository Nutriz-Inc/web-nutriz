import { Badge } from "@/components/ui/badge";
import { StepDot } from "@/components/ui/step-dot";
import { cn } from "@/lib/utils";
import {
	BADGE_LABEL,
	BADGE_TONE,
	getStepDefinitions,
	type StepVisualStatus,
} from "@/pages/private/donations/common/info/constants";
import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";

type Props = {
	steps: DonationStep[];
	isRecurrent?: boolean;
	className?: string;
};

export function DonationStatusCard({ steps, isRecurrent, className }: Props) {
	const stepDefinitions = getStepDefinitions(isRecurrent);

	const firstPendingOrder = stepDefinitions.find((definition) => {
		const step = steps.find((s) => s.name === definition.name);
		return step?.status !== EnumDonationStepStatus.Done;
	})?.order;

	const currentStep = steps.find(
		(s) =>
			s.name ===
			stepDefinitions.find(
				(definition) => definition.order === firstPendingOrder,
			)?.name,
	);

	const lastOrder = stepDefinitions.length;

	return (
		<div
			className={cn(
				"rounded-card-sm flex w-full flex-col gap-6 bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-nudge sm:gap-7 sm:p-8 lg:p-10",
				className,
			)}
		>
			<p className="font-display text-xs font-bold uppercase tracking-[0.06em] text-blue-bright lg:text-center">
				Status da sua doação atual
			</p>

			<ol
				className={cn(
					"grid gap-0",
					lastOrder === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4",
				)}
			>
				{stepDefinitions.map((definition) => {
					const step = steps.find((s) => s.name === definition.name);
					const isDone = step?.status === EnumDonationStepStatus.Done;
					const isCurrent = !isDone && definition.order === firstPendingOrder;
					const isLast = definition.order === lastOrder;

					const visualStatus: StepVisualStatus = isDone
						? "done"
						: isCurrent
							? "current"
							: "waiting";

					return (
						<li
							key={definition.name}
							aria-current={isCurrent ? "step" : undefined}
							className="relative flex items-stretch gap-4 lg:flex-col lg:items-center lg:gap-3.5 lg:text-center"
						>
							{!isLast && (
								<span
									aria-hidden="true"
									className={cn(
										"hidden lg:absolute lg:left-[calc(50%+1.875rem)] lg:right-[calc(-50%+1.875rem)] lg:top-5 lg:block lg:-translate-y-1/2",
										isDone
											? "lg:h-0.5 lg:rounded-full lg:bg-blue-bright-fill"
											: "lg:h-0 lg:border-t-2 lg:border-dashed lg:border-blue-tint-2",
									)}
								/>
							)}

							<div className="flex flex-col items-center lg:contents">
								<StepDot
									status={visualStatus}
									order={definition.order}
									className="size-9 text-sm lg:size-10 lg:text-base"
									iconClassName="size-4 lg:size-[1.125rem]"
								/>

								{!isLast && (
									<span
										aria-hidden="true"
										className={cn(
											"my-1.5 flex-1 lg:hidden",
											isDone
												? "w-0.5 rounded-full bg-blue-bright-fill"
												: "w-0 border-l-2 border-dashed border-blue-tint-2",
										)}
									/>
								)}
							</div>

							<div className="flex min-w-0 flex-col items-start gap-2 pb-6 lg:items-center lg:pb-0">
								<p
									className={cn(
										"font-display text-base leading-snug lg:text-[1.0625rem]",
										isDone || isCurrent
											? "font-bold text-blue-deep"
											: "font-medium text-ink-2",
									)}
								>
									{definition.name}
									{isDone && <span className="sr-only"> — concluída</span>}
									{isCurrent && <span className="sr-only"> — etapa atual</span>}
								</p>

								<Badge
									tone={BADGE_TONE[visualStatus]}
									size="sm"
									caps
									dot={isCurrent}
									className="px-2 py-0.5 text-[10px]"
								>
									{BADGE_LABEL[visualStatus]}
								</Badge>
							</div>
						</li>
					);
				})}
			</ol>

			<hr className="border-0 border-t border-blue-tint-2/60" />

			<p className="text-sm leading-relaxed text-ink-2 lg:text-center lg:text-[0.9375rem]">
				{currentStep?.description ??
					"Acompanhe por aqui as atualizações da sua doação."}
			</p>
		</div>
	);
}
