import { Bookmark, Calendar, MapPin } from "lucide-react";
import { getInitials } from "@/components/layout/utils";
import { EnumDonationStepStatus } from "@/services/types/i-donation";
import { formatAppointmentDateTime } from "../../format";
import { AppointmentInfoRow } from "../../shared/AppointmentInfoRow";
import { AppointmentStatusBadge } from "../../shared/AppointmentStatusBadge";
import type { AppointmentDetail } from "../../types";

type AppointmentSummaryCardProps = {
	appointment: AppointmentDetail;
};

function getStepLabel(appointment: AppointmentDetail): string {
	if (appointment.status === EnumDonationStepStatus.Failed) {
		return "Interrompida na etapa";
	}
	if (appointment.status === EnumDonationStepStatus.Done) {
		return "Etapa final da doação";
	}
	return "Etapa atual da doação";
}

export function AppointmentSummaryCard({
	appointment,
}: AppointmentSummaryCardProps) {
	return (
		<div className="flex flex-col gap-4 rounded-2xl border border-[#e7ecf2] bg-white p-5">
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e1f1fb]">
						<span className="text-[15px] font-bold text-[#4a77b0]">
							{getInitials(appointment.donorName)}
						</span>
					</div>
					<div className="flex min-w-0 flex-col">
						<p className="text-[16px] font-bold leading-tight text-[#1f2a37]">
							{appointment.donorName}
						</p>
						<span className="text-[13px] text-[#9ca3af]">Doadora</span>
					</div>
				</div>
				<AppointmentStatusBadge
					status={appointment.status}
					className="mt-0.5 shrink-0"
				/>
			</div>

			<div className="flex flex-col gap-3 border-t border-[#eef1f5] pt-4">
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
					icon={<Bookmark className="size-[18px] shrink-0 text-[#94a3b8]" />}
					label={getStepLabel(appointment)}
					value={appointment.stepName}
				/>
			</div>
		</div>
	);
}
