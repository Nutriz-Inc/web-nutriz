import { Calendar, MapPin, User } from "lucide-react";
import type { DonationStep } from "@/services/types/i-donation";
import { formatCreatedAt } from "@/utils/formatter";

type Props = {
	step: DonationStep;
	addressText?: string;
	nurseNames: string;
};

export function StepReadOnlyInfo({ step, addressText, nurseNames }: Props) {
	const hasNoInfo = !step.set_date && !addressText && !nurseNames;

	return (
		<div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:gap-7">
			{step.set_date && (
				<div className="flex items-center gap-2.5">
					<Calendar className="size-4 shrink-0 text-[#9ca3af]" />
					<span className="text-[13px] text-[#6b7280]">Data e horário:</span>
					<span className="text-[14px] font-semibold text-[#1f2a37]">
						{formatCreatedAt(step.set_date)}
					</span>
				</div>
			)}
			{addressText && (
				<div className="flex items-center gap-2.5">
					<MapPin className="size-4 shrink-0 text-[#9ca3af]" />
					<span className="text-[13px] text-[#6b7280]">Endereço:</span>
					<span className="text-[14px] font-semibold text-[#1f2a37]">
						{addressText}
					</span>
				</div>
			)}
			{nurseNames && (
				<div className="flex items-center gap-2.5">
					<User className="size-4 shrink-0 text-[#9ca3af]" />
					<span className="text-[13px] text-[#6b7280]">Enfermeiro:</span>
					<span className="text-[14px] font-semibold text-[#1f2a37]">
						{nurseNames}
					</span>
				</div>
			)}
			{hasNoInfo && (
				<p className="text-[13px] text-[#9ca3af]">
					Sem informações registradas nesta etapa.
				</p>
			)}
		</div>
	);
}
