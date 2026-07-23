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
import { formatAppointmentDateTime } from "../../format";
import { AppointmentInfoRow } from "../../shared/AppointmentInfoRow";
import { AppointmentStatusBadge } from "../../shared/AppointmentStatusBadge";
import { findStepDefinition } from "../../steps";
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
			className="flex w-full flex-col gap-4 rounded-2xl border border-[#e7ecf2] bg-white p-5 text-left transition-shadow hover:shadow-[0_4px_16px_rgba(15,42,80,0.08)]"
		>
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e1f1fb]">
						<span className="text-[15px] font-bold text-[#4a77b0]">
							{getInitials(appointment.donorName)}
						</span>
					</div>
					<div className="flex min-w-0 flex-col">
						<p className="truncate text-[16px] font-bold text-[#1f2a37]">
							{appointment.donorName}
						</p>
						<span className="text-[13px] text-[#9ca3af]">Doadora</span>
					</div>
				</div>
				<AppointmentStatusBadge
					status={appointment.status}
					className="shrink-0"
				/>
			</div>

			<div className="flex flex-col gap-3">
				<AppointmentInfoRow
					icon={<Calendar className="size-[18px] shrink-0 text-[#94a3b8]" />}
					label="Data do agendamento"
					value={formatAppointmentDateTime(appointment.dateSet)}
				/>
				<AppointmentInfoRow
					icon={<MapPin className="size-[18px] shrink-0 text-[#94a3b8]" />}
					label="Local do agendamento"
					value={appointment.locationName}
				/>
				<AppointmentInfoRow
					icon={<StepIcon className="size-[18px] shrink-0 text-[#94a3b8]" />}
					label={stepLabel}
					value={appointment.stepName}
				/>
			</div>

			<div className="border-t border-[#eef1f5] pt-3.5">
				<span
					className={cn(
						"flex items-center gap-2 text-[13px] font-semibold",
						reportHint.highlighted ? "text-[#387ccd]" : "text-[#9ca3af]",
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
