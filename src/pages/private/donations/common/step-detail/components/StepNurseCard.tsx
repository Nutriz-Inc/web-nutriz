import { UserRound } from "lucide-react";
import { AppointmentStatusBadge } from "@/components/full/AppointmentStatusBadge";
import type { EnumJobStatus } from "@/services/types/i-job";

type Props = {
	nurseName: string;
	status: EnumJobStatus;
};

export function StepNurseCard({ nurseName, status }: Props) {
	return (
		<div className="flex items-center justify-between gap-3 rounded-card-sm border border-line bg-surface px-[18px] py-5 shadow-soft">
			<div className="flex min-w-0 items-center gap-3">
				<div className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-canvas">
					<UserRound className="size-[18px] text-blue-deep" />
				</div>
				<div className="flex min-w-0 flex-col gap-0.5">
					<span className="text-[11px] text-ink-3">Enfermeiro responsável</span>
					<span className="truncate text-[14px] font-semibold text-ink">
						{nurseName}
					</span>
				</div>
			</div>
			<AppointmentStatusBadge status={status} className="shrink-0" />
		</div>
	);
}
