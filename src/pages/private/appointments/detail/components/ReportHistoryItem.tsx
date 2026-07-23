import { Calendar, User } from "lucide-react";
import { formatAppointmentDate } from "../../format";
import { AppointmentStatusBadge } from "../../shared/AppointmentStatusBadge";
import type { AppointmentReport } from "../../types";

type ReportHistoryItemProps = {
	report: AppointmentReport;
};

export function ReportHistoryItem({ report }: ReportHistoryItemProps) {
	return (
		<div className="flex flex-col gap-2.5 rounded-xl border border-[#eef1f5] bg-[#f9fafc] p-4">
			<div className="flex items-start justify-between gap-3">
				<p className="text-[15px] font-bold text-[#1f2a37]">
					{report.stepName}
				</p>
				<AppointmentStatusBadge status={report.status} className="shrink-0" />
			</div>

			<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
				<span className="flex items-center gap-1.5 text-[12px] text-[#9ca3af]">
					<Calendar className="size-3.5 shrink-0" />
					{formatAppointmentDate(report.date)}
				</span>
				<span className="flex items-center gap-1.5 text-[12px] text-[#9ca3af]">
					<User className="size-3.5 shrink-0" />
					{report.responsible}
				</span>
			</div>

			<p className="text-[13px] leading-relaxed text-[#4b5563]">
				{report.text}
			</p>
		</div>
	);
}
