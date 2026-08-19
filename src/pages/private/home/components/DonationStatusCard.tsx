import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEP_DEFINITIONS } from "@/pages/private/donations/common/info/constants";
import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";

type Props = {
	steps: DonationStep[];
	className?: string;
};

export function DonationStatusCard({ steps, className }: Props) {
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

	const lastOrder = STEP_DEFINITIONS.length;

	return (
		<div
			className={cn(
				"rounded-organic-sm flex w-full flex-col gap-6 bg-card p-6 shadow-soft transition-shadow hover:shadow-lift sm:p-8",
				className,
			)}
		>
			<p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.22em] text-blue-bright">
				Status da sua doação atual
			</p>

			{/* Lista vertical no mobile; trilha horizontal a partir de lg. */}
			<ol className="grid gap-5 lg:grid-cols-4 lg:gap-0">
				{STEP_DEFINITIONS.map((definition) => {
					const step = steps.find((s) => s.name === definition.name);
					const isDone = step?.status === EnumDonationStepStatus.Done;
					const isCurrent = !isDone && definition.order === firstPendingOrder;
					const isLast = definition.order === lastOrder;

					return (
						<li
							key={definition.name}
							aria-current={isCurrent ? "step" : undefined}
							className="relative flex items-center gap-3.5 lg:flex-col lg:items-start lg:gap-3"
						>
							{!isLast && (
								<span
									aria-hidden="true"
									className={cn(
										"hidden lg:absolute lg:left-10 lg:right-3 lg:top-4 lg:block lg:h-0.5 lg:-translate-y-1/2 lg:rounded-full",
										isDone ? "bg-blue-deep" : "bg-blue-tint-2",
									)}
								/>
							)}

							<span
								aria-hidden="true"
								className={cn(
									"relative flex size-8 shrink-0 items-center justify-center rounded-full font-display text-[0.8125rem] font-bold",
									isDone && "bg-blue-deep text-white",
									isCurrent && "bg-eva text-white shadow-soft",
									!isDone && !isCurrent && "bg-surface-3 text-ink-2",
								)}
							>
								{isDone ? <Check className="size-4" /> : definition.order}
							</span>

							<p
								className={cn(
									"font-display text-[0.9375rem] lg:pr-4 lg:text-sm",
									isDone || isCurrent
										? "font-bold text-blue-deep"
										: "font-medium text-ink-2",
								)}
							>
								{definition.name}
								{isDone && <span className="sr-only"> — concluída</span>}
								{isCurrent && <span className="sr-only"> — etapa atual</span>}
							</p>
						</li>
					);
				})}
			</ol>

			<hr className="border-0 border-t border-blue-tint-2/60" />

			<p className="text-[0.8125rem] leading-relaxed text-ink-2">
				{currentStep?.description ??
					"Acompanhe por aqui as atualizações da sua doação."}
			</p>
		</div>
	);
}
