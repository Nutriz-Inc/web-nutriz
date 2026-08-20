import { Calendar, User } from "lucide-react";
import { formatDateBR } from "@/utils/formatter";
import { AppointmentStatusBadge } from "../../../../../components/full/AppointmentStatusBadge";
import type { AppointmentReport } from "../../types";

type ReportHistoryItemProps = {
	report: AppointmentReport;
};

export function ReportHistoryItem({ report }: ReportHistoryItemProps) {
	return (
		<div className="flex flex-col gap-2.5 rounded-xl border border-surface-3 bg-surface-2 p-4">
			<div className="flex items-start justify-between gap-3">
				<p className="text-[15px] font-bold text-ink">{report.stepName}</p>
				<AppointmentStatusBadge status={report.status} className="shrink-0" />
			</div>

			<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
				<span className="flex items-center gap-1.5 text-[12px] text-ink-3">
					<Calendar className="size-3.5 shrink-0" />
					{formatDateBR(report.date)}
				</span>
				<span className="flex items-center gap-1.5 text-[12px] text-ink-3">
					<User className="size-3.5 shrink-0" />
					{report.responsible}
				</span>
			</div>

			<p className="text-[13px] leading-relaxed text-ink-2">{report.text}</p>
		</div>
	);
}
