import { UserRound } from "lucide-react";
import { AppointmentStatusBadge } from "@/components/full/AppointmentStatusBadge";
import type { EnumJobStatus } from "@/services/types/i-job";

type Props = {
	nurseName: string;
	status: EnumJobStatus;
};

export function StepNurseCard({ nurseName, status }: Props) {
	return (
		<div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e3eaf2] bg-white px-[18px] py-5 shadow-[0px_6px_10px_rgba(15,26,51,0.06)]">
			<div className="flex min-w-0 items-center gap-3">
				<div className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#eaf3fc]">
					<UserRound className="size-[18px] text-[#00458b]" />
				</div>
				<div className="flex min-w-0 flex-col gap-0.5">
					<span className="text-[11px] text-[#7a8aa0]">
						Enfermeiro responsável
					</span>
					<span className="truncate text-[14px] font-semibold text-[#1b2a41]">
						{nurseName}
					</span>
				</div>
			</div>
			<AppointmentStatusBadge status={status} className="shrink-0" />
		</div>
	);
}
