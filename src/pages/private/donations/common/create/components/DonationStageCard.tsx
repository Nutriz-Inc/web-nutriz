import type { StepDefinition } from "../../info/constants";

type DonationStageCardProps = {
	step: StepDefinition;
};

/**
 * Uma das quatro etapas que a doacao percorre no sistema. Sao as mesmas de
 * `info/constants.ts` (a tela de acompanhamento), para a nutriz reconhecer os
 * nomes depois — nada aqui e inventado so para esta tela.
 */
export function DonationStageCard({ step }: DonationStageCardProps) {
	const Icon = step.icon;

	return (
		<article className="rounded-card relative flex h-full flex-col gap-3 overflow-hidden border border-line bg-surface p-5 shadow-soft">
			<span
				aria-hidden="true"
				className="pointer-events-none absolute -right-4 -top-6 font-display text-[72px] font-extrabold leading-none text-blue-tint select-none"
			>
				{step.order}
			</span>

			<span
				aria-hidden="true"
				className="relative flex size-11 items-center justify-center rounded-full bg-blue-tint text-blue-deep"
			>
				<Icon className="size-5" />
			</span>

			<div className="relative min-w-0">
				<h3 className="font-display text-[15px] font-bold text-ink">
					{step.name}
				</h3>
				<p className="mt-1.5 text-[13px] leading-[19px] text-ink-2">
					{step.description}
				</p>
			</div>
		</article>
	);
}
