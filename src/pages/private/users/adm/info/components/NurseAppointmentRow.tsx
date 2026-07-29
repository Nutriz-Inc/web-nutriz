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
		if (!job.id_donation) return;

		navigate(`/gestao-doacoes/${job.id_donation}`, {
			state: { backTo: location.pathname },
		});
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={!job.id_donation}
			className={`flex w-full flex-col gap-2.5 p-4 text-left transition-colors enabled:hover:bg-[#f8fafc] lg:grid ${APPOINTMENTS_GRID_COLS} lg:items-center lg:gap-3 lg:px-4 lg:py-3`}
		>
			<div className="flex items-center justify-between lg:contents">
				<div className="flex items-center gap-3">
					<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e1f1fb]">
						<span className="text-[12px] font-bold text-[#00458b]">
							{getInitials(donorName)}
						</span>
					</div>
					<span className="min-w-0 truncate text-[14px] font-semibold text-[#1f2a37]">
						{donorName}
					</span>
				</div>
				{job.id_donation && (
					<ChevronRight className="size-4 text-[#9ca3af] lg:hidden" />
				)}
			</div>
			<StatusBadge step={stepName} label={stepName ?? job.name} />
			<span className="text-[14px] text-[#6b7280]">
				<span className="lg:hidden">Data: </span>
				{job.date_set ? formatDateBR(job.date_set) : "—"}
			</span>
			<span className="text-[14px] text-[#6b7280]">
				<span className="lg:hidden">Horário: </span>
				{job.date_set ? formatTimeHM(job.date_set) : "—"}
			</span>
			<span className="min-w-0 text-[14px] text-[#6b7280] lg:truncate">
				<span className="lg:hidden">Local: </span>
				{formatJobLocation(job.address)}
			</span>
			<AppointmentStatusBadge status={job.status} />
			{job.id_donation ? (
				<ChevronRight className="hidden size-4 text-[#9ca3af] lg:block" />
			) : (
				<span className="hidden lg:block" />
			)}
		</button>
	);
}
