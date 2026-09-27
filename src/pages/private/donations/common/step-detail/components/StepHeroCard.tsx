import type { LucideIcon } from "lucide-react";
import { History } from "lucide-react";
import { StatusBadge } from "@/components/full/StatusBadge";
import { cn } from "@/lib/utils";
import type { EnumDonationStepStatus } from "@/services/types/i-donation";
import { donationStepToken } from "@/utils/status";

type Props = {
	icon?: LucideIcon;
	eyebrow: string;
	title: string;
	description: string;
	status: EnumDonationStepStatus;
	order?: number;
	total?: number;
	onViewTimeline: () => void;
};

export function StepHeroCard({
	icon: Icon,
	eyebrow,
	title,
	description,
	status,
	order,
	total,
	onViewTimeline,
}: Props) {
	return (
		<section className="relative isolate flex flex-col gap-6 overflow-hidden rounded-card border border-line bg-surface p-6 shadow-soft sm:p-8">
			{Icon ? (
				<Icon
					aria-hidden="true"
					strokeWidth={1.1}
					className="pointer-events-none absolute -right-8 -bottom-10 -z-10 size-48 text-blue-tint lg:size-60"
				/>
			) : null}

			<div className="flex flex-wrap items-start justify-between gap-4">
				<div className="flex items-center gap-4">
					<span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-tint">
						{Icon && <Icon className="size-7 text-blue-deep" />}
					</span>
					<div className="flex flex-col gap-1.5">
						<p className="text-rotulo font-semibold uppercase tracking-[0.12em] text-ink-3">
							{eyebrow}
						</p>
						<StatusBadge
							token={donationStepToken(status)}
							gender="f"
							size="md"
							className="w-fit"
						/>
					</div>
				</div>

				<button
					type="button"
					onClick={onViewTimeline}
					className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-apoio font-semibold text-blue-deep transition-colors duration-150 hover:bg-blue-tint active:scale-[0.97]"
				>
					<History className="size-4" aria-hidden="true" />
					Ver timeline
				</button>
			</div>

			<div className="flex max-w-[36rem] flex-col gap-2">
				<h1 className="font-display text-titulo font-bold leading-tight tracking-tight text-blue-deep lg:text-pagina">
					{title}
				</h1>
				<p className="text-corpo text-ink-2">{description}</p>
			</div>

			{order && total ? (
				<ol
					aria-label={`Etapa ${order} de ${total}`}
					className="grid max-w-[28rem] gap-1.5"
					style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
				>
					{Array.from({ length: total }, (_, indice) => (
						<li
							// biome-ignore lint/suspicious/noArrayIndexKey: posicoes fixas da trilha
							key={indice}
							className={cn(
								"h-1.5 rounded-full",
								indice + 1 < order
									? "bg-blue-bright"
									: indice + 1 === order
										? "bg-blue-bright/45"
										: "bg-surface-3",
							)}
						/>
					))}
				</ol>
			) : null}
		</section>
	);
}
