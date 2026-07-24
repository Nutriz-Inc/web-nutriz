import { Status } from "@/components/full/Status";
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
	const progress = (STEP_NUMBER[stepName] / NUMBER_OF_DONATION_STEPS) * 100;
	const formattedDate = datetime
		? formatCreatedAt(datetime)
		: "Sem data marcada";

	return (
		<div
			className={cn(
				"bg-white flex flex-col gap-4 p-5 rounded-[20px] w-full shadow-[0px_14px_18px_rgba(10,38,77,0.18)]",
				className,
			)}
		>
			<div className="flex gap-3 items-start">
				<div className="flex flex-col gap-0.5 flex-1 min-w-0">
					<p className="text-[11px] font-medium text-[#6b8faa] uppercase tracking-wide">
						Etapa atual
					</p>
					<p className="text-[14px] font-semibold text-[#0e2a45]">{stepName}</p>
					<p className="text-[18px] font-bold text-[#0e2a45]">
						{formattedDate}
					</p>
				</div>

				<Status status={status} />
			</div>

			<div className="h-px bg-[#e5ebf3]" />

			<div className="flex items-center gap-2">
				<span className="text-[12px] text-[#6b8faa] font-medium">
					Progresso
				</span>
				<div className="flex-1 h-[5px] bg-[#e5ebf3] rounded-full overflow-hidden">
					<div
						className="h-full bg-blue-500 rounded-full transition-all"
						style={{ width: `${progress}%` }}
					/>
				</div>
				<span className="text-[12px] font-semibold text-[#33536f]">
					{STEP_NUMBER[stepName]} / {NUMBER_OF_DONATION_STEPS}
				</span>
			</div>

			<div className="flex items-center justify-between">
				<button
					type="button"
					onClick={onConsult}
					className="border-[#e5ebf3] border-[1.5px] px-5 py-2 rounded-full text-[13px] font-semibold text-[#00458b] active:scale-[0.97] transition-transform"
				>
					Consultar
				</button>
			</div>
		</div>
	);
}
