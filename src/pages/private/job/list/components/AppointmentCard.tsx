import {
	Bookmark,
	Calendar,
	ChevronRight,
	FileText,
	MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getInitials } from "@/components/layout/utils";
import { cn } from "@/lib/utils";
import { EnumJobStatus } from "@/services/types/i-job";
import { formatCreatedAt } from "@/utils/formatter";
import { AppointmentInfoRow } from "../../../../../components/full/AppointmentInfoRow";
import { AppointmentStatusBadge } from "../../../../../components/full/AppointmentStatusBadge";
import { findStepDefinition } from "../../detail/utils";
import type { Appointment } from "../../types";
import { getReportHint } from "../utils";

type AppointmentCardProps = {
	appointment: Appointment;
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
	const navigate = useNavigate();

	const stepLabel =
		appointment.status === EnumJobStatus.Failed
			? "Interrompida na etapa"
			: "Etapa da doação";

	const reportHint = getReportHint(appointment);
	const StepIcon = findStepDefinition(appointment.stepName)?.icon ?? Bookmark;

	return (
		<button
			type="button"
			onClick={() => navigate(`/agendamentos/${appointment.id}`)}
			className="flex w-full flex-col gap-4 rounded-card-sm border border-line bg-white p-5 text-left transition-transform duration-200 hover:scale-[1.02] hover:shadow-soft"
		>
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-tint">
						<span className="text-[15px] font-bold text-blue-bright">
							{getInitials(appointment.donorName)}
						</span>
					</div>
					<div className="flex min-w-0 flex-col">
						<p className="truncate text-[16px] font-bold text-ink">
							{appointment.donorName}
						</p>
						<span className="text-[13px] text-ink-3">Doadora</span>
					</div>
				</div>
				<AppointmentStatusBadge
					status={appointment.status}
					className="shrink-0"
				/>
			</div>

			<div className="flex flex-col gap-3">
				<AppointmentInfoRow
					icon={<Calendar className="size-[18px] shrink-0 text-ink-3" />}
					label="Data do agendamento"
					value={
						appointment.dateSet ? formatCreatedAt(appointment.dateSet) : "—"
					}
				/>
				<AppointmentInfoRow
					icon={<MapPin className="size-[18px] shrink-0 text-ink-3" />}
					label="Local do agendamento"
					value={appointment.locationName}
				/>
				<AppointmentInfoRow
					icon={<StepIcon className="size-[18px] shrink-0 text-ink-3" />}
					label={stepLabel}
					value={appointment.stepName}
				/>
			</div>

			<div className="border-t border-surface-3 pt-3.5">
				<span
					className={cn(
						"flex items-center gap-2 text-[13px] font-semibold",
						reportHint.highlighted ? "text-blue-bright" : "text-ink-3",
					)}
				>
					<FileText className="size-4 shrink-0" />
					{reportHint.text}
					<ChevronRight className="ml-auto size-4 shrink-0" />
				</span>
			</div>
		</button>
	);
}
