import { Status } from "@/components/full/Status";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	type EnumDonationStepName,
	type EnumDonationStepStatus,
	NUMBER_OF_DONATION_STEPS,
} from "@/services/types/i-donation";
import { STEP_NUMBER } from "@/utils/constants";
import { formatCreatedAt } from "@/utils/formatter";

interface Props {
	stepName: EnumDonationStepName;
	datetime?: string;
	status: EnumDonationStepStatus;
	onConsult: () => void;
	className?: string;
}

export function NextDonationStep({
	stepName,
	datetime,
	status,
	onConsult,
	className,
}: Props) {
	const stepNumber = STEP_NUMBER[stepName];
	const progress = (stepNumber / NUMBER_OF_DONATION_STEPS) * 100;
	const formattedDate = datetime
		? formatCreatedAt(datetime)
		: "Sem data marcada";

	return (
		<div
			className={cn(
				"rounded-card-sm flex w-full flex-col gap-5 bg-card p-6 shadow-soft transition-shadow hover:shadow-lift sm:p-7",
				className,
			)}
		>
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 flex-col gap-1">
					<p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.06em] text-blue-bright">
						Etapa atual
					</p>
					<p className="text-sm text-ink-2">{stepName}</p>
					<p className="mt-1 font-display text-xl font-extrabold tracking-tight text-blue-deep">
						{formattedDate}
					</p>
				</div>

				<Status status={status} />
			</div>

			<div className="flex items-center gap-3">
				<span className="text-xs font-medium text-ink-2">Progresso</span>
				<div
					role="progressbar"
					aria-label="Progresso da doação"
					aria-valuenow={stepNumber}
					aria-valuemin={0}
					aria-valuemax={NUMBER_OF_DONATION_STEPS}
					className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3"
				>
					<div
						className="h-full rounded-full bg-blue-bright transition-all"
						style={{ width: `${progress}%` }}
					/>
				</div>
				<span className="font-sans text-xs font-bold tabular-nums text-blue-deep">
					{stepNumber} / {NUMBER_OF_DONATION_STEPS}
				</span>
			</div>

			<Button
				type="button"
				variant="outline"
				size="pill"
				onClick={onConsult}
				className="w-fit border-blue-tint-2 font-semibold text-blue-deep hover:bg-blue-tint hover:text-blue-deep"
			>
				Consultar
			</Button>
		</div>
	);
}
