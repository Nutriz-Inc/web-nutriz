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
				"rounded-card-sm flex w-full flex-col gap-6 bg-card p-6 shadow-soft transition-shadow hover:shadow-lift sm:gap-7 sm:p-8 lg:p-10",
				className,
			)}
		>
			<p className="font-display text-xs font-bold uppercase tracking-[0.06em] text-blue-bright lg:text-center">
				Status da sua doação atual
			</p>

			{/*
			 * Mobile: lista vertical. sm: duas colunas. lg: trilha horizontal
			 * centralizada, com conectores ligando o centro de um passo ao proximo.
			 */}
			<ol className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-0">
				{STEP_DEFINITIONS.map((definition) => {
					const step = steps.find((s) => s.name === definition.name);
					const isDone = step?.status === EnumDonationStepStatus.Done;
					const isCurrent = !isDone && definition.order === firstPendingOrder;
					const isLast = definition.order === lastOrder;

					return (
						<li
							key={definition.name}
							aria-current={isCurrent ? "step" : undefined}
							className="relative flex items-center gap-4 lg:flex-col lg:items-center lg:gap-3.5 lg:text-center"
						>
							{!isLast && (
								<span
									aria-hidden="true"
									className={cn(
										"hidden lg:absolute lg:left-[calc(50%+1.875rem)] lg:right-[calc(-50%+1.875rem)] lg:top-5 lg:block lg:h-0.5 lg:-translate-y-1/2 lg:rounded-full",
										isDone
											? "bg-blue-deep"
											: isCurrent
												? "bg-gradient-to-r from-eva to-blue-tint-2"
												: "bg-blue-tint-2",
									)}
								/>
							)}

							{/*
							 * Mesma identidade da trilha dentro da doacao: concluida
							 * cheia com visto, atual com halo pulsando e futura com
							 * contorno tracejado. Ver DonationStepCard.
							 */}
							<span
								aria-hidden="true"
								className="relative flex shrink-0 items-center justify-center"
							>
								{isCurrent && (
									<>
										<span className="absolute inset-0 -m-0.5 rounded-full bg-eva/20 motion-safe:pulso-etapa" />
										<span className="absolute inset-0 -m-0.5 rounded-full bg-eva/10" />
									</>
								)}

								<span
									className={cn(
										"relative flex size-9 shrink-0 items-center justify-center rounded-full font-sans text-sm font-bold tabular-nums lg:size-10 lg:text-base",
										isDone && "bg-blue-deep text-white shadow-soft",
										isCurrent &&
											"bg-eva text-white shadow-soft ring-2 ring-eva/30",
										!isDone &&
											!isCurrent &&
											"border-[1.5px] border-dashed border-blue-tint-2 bg-white text-ink-3",
									)}
								>
									{isDone ? (
										<Check
											className="size-4 lg:size-[1.125rem]"
											strokeWidth={3}
										/>
									) : (
										definition.order
									)}
								</span>
							</span>

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
