import { Bookmark, Calendar, Mail, MapPin, Phone } from "lucide-react";
import { getInitials } from "@/components/layout/utils";
import { formatCreatedAt, formatPhoneNumber } from "@/utils/formatter";
import { AppointmentInfoRow } from "../../../../../components/full/AppointmentInfoRow";
import { AppointmentStatusBadge } from "../../../../../components/full/AppointmentStatusBadge";
import type { AppointmentDetail } from "../../types";
import { getStepLabel } from "../utils";

type AppointmentSummaryCardProps = {
	appointment: AppointmentDetail;
};

export function AppointmentSummaryCard({
	appointment,
}: AppointmentSummaryCardProps) {
	return (
		<div className="flex flex-col gap-4 rounded-card-sm border border-line bg-surface p-5">
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-tint">
						<span className="text-[15px] font-bold text-blue-bright">
							{getInitials(appointment.donorName)}
						</span>
					</div>
					<div className="flex min-w-0 flex-col">
						<p className="text-[16px] font-bold leading-tight text-ink">
							{appointment.donorName}
						</p>
						<span className="text-[13px] text-ink-3">Doadora</span>
					</div>
				</div>
				<AppointmentStatusBadge
					status={appointment.status}
					className="mt-0.5 shrink-0"
				/>
			</div>

			{(appointment.donorPhone || appointment.donorEmail) && (
				<div className="flex flex-col gap-3 border-t border-surface-3 pt-4">
					{appointment.donorPhone && (
						<AppointmentInfoRow
							icon={<Phone className="size-[18px] shrink-0 text-ink-3" />}
							label="Telefone"
							value={formatPhoneNumber(appointment.donorPhone)}
						/>
					)}
					{appointment.donorEmail && (
						<AppointmentInfoRow
							icon={<Mail className="size-[18px] shrink-0 text-ink-3" />}
							label="E-mail"
							value={appointment.donorEmail}
						/>
					)}
				</div>
			)}

			<div className="flex flex-col gap-3 border-t border-surface-3 pt-4">
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
					icon={<Bookmark className="size-[18px] shrink-0 text-ink-3" />}
					label={getStepLabel(appointment)}
					value={appointment.stepName}
				/>
			</div>
		</div>
	);
}
