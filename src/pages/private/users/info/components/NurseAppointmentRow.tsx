import { ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppointmentStatusBadge } from "@/components/full/AppointmentStatusBadge";
import { getInitials } from "@/components/layout/utils";
import { StatusBadge } from "@/pages/private/donations/adm/list/components/StatusBadge";
import type { IJobResponse } from "@/services/types/i-job";
import { formatDateBR } from "@/utils/formatter";
import { APPOINTMENTS_GRID_COLS } from "../constants";
import { formatJobLocation, formatTimeHM, toStepName } from "../utils";

type NurseAppointmentRowProps = {
	job: IJobResponse;
};

export function NurseAppointmentRow({ job }: NurseAppointmentRowProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const donorName = job.user_common_name ?? "—";
	const stepName = toStepName(job.name);

	function handleClick() {
		navigate(`/gestao-agendamentos/${job.id_job}`, {
			state: { backTo: location.pathname },
		});
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`flex w-full flex-col gap-2.5 p-4 text-left transition-colors hover:bg-surface-2 lg:grid ${APPOINTMENTS_GRID_COLS} lg:items-center lg:gap-3 lg:px-4 lg:py-3`}
		>
			<div className="flex items-center justify-between lg:contents">
				<div className="flex items-center gap-3">
					<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-tint">
						<span className="text-[12px] font-bold text-blue-deep">
							{getInitials(donorName)}
						</span>
					</div>
					<span className="min-w-0 truncate text-[14px] font-semibold text-ink">
						{donorName}
					</span>
				</div>
				<ChevronRight className="size-4 text-ink-3 lg:hidden" />
			</div>
			<StatusBadge step={stepName} label={stepName ?? job.name} />
			<span className="text-[14px] text-ink-2">
				<span className="lg:hidden">Data: </span>
				{job.date_set ? formatDateBR(job.date_set) : "—"}
			</span>
			<span className="text-[14px] text-ink-2">
				<span className="lg:hidden">Horário: </span>
				{job.date_set ? formatTimeHM(job.date_set) : "—"}
			</span>
			<span className="min-w-0 text-[14px] text-ink-2 lg:truncate">
				<span className="lg:hidden">Local: </span>
				{formatJobLocation(job.address)}
			</span>
			<AppointmentStatusBadge status={job.status} />
			<ChevronRight className="hidden size-4 text-ink-3 lg:block" />
		</button>
	);
}
