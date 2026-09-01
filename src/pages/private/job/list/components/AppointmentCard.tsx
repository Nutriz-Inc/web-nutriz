import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppointmentStatusBadge } from "@/components/full/AppointmentStatusBadge";
import { getInitials } from "@/components/layout/utils";
import { cn } from "@/lib/utils";
import { EnumJobStatus } from "@/services/types/i-job";
import { formatDateTimeParts } from "@/utils/formatter";
import type { Appointment } from "../../types";
import { getReportHint } from "../utils";

type AppointmentCardProps = {
	appointment: Appointment;
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
	const navigate = useNavigate();
	const reduzirMovimento = useReducedMotion();

	const stepLabel =
		appointment.status === EnumJobStatus.Failed
			? "Interrompida na etapa"
			: "Etapa da doação";

	const reportHint = getReportHint(appointment);
	const schedule = appointment.dateSet
		? formatDateTimeParts(appointment.dateSet)
		: undefined;

	const fields = [
		{ label: stepLabel, value: appointment.stepName, wide: false },
		{ label: "Horário", value: schedule?.time ?? "—", wide: false },
		{ label: "Data", value: schedule?.date ?? "—", wide: false },
		{ label: "Local", value: appointment.locationName, wide: true },
	];

	return (
		<motion.button
			type="button"
			onClick={() => navigate(`/agendamentos/${appointment.id}`)}
			whileHover={reduzirMovimento ? undefined : { y: -3 }}
			whileTap={reduzirMovimento ? undefined : { scale: 0.99 }}
			transition={{ type: "spring", stiffness: 320, damping: 28 }}
			className="group flex h-full w-full flex-col rounded-card border border-line bg-surface text-left shadow-soft transition-[box-shadow,border-color] duration-300 hover:border-blue-tint-2 hover:shadow-lift"
		>
			<div className="flex items-start justify-between gap-3 px-5 pb-4 pt-5">
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

			<div className="mx-5 h-px bg-line" />

			<div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-4 px-5 py-4">
				{fields.map((field) => (
					<div
						key={field.label}
						className={cn(
							"flex min-w-0 flex-col gap-0.5",
							field.wide && "col-span-2",
						)}
					>
						<span className="text-[12px] text-ink-3">{field.label}</span>
						<span className="line-clamp-2 text-[14px] font-semibold text-ink">
							{field.value}
						</span>
					</div>
				))}
			</div>

			<div className="mx-5 h-px bg-line" />

			<div className="px-5 pb-5 pt-4">
				<span
					className={cn(
						"flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-[13px] font-semibold transition-colors duration-300",
						reportHint.highlighted
							? "bg-blue-bright-fill text-white group-hover:bg-blue-deep-fill"
							: "bg-surface-2 text-ink-3",
					)}
				>
					<FileText className="size-4 shrink-0" />
					{reportHint.text}
					<ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
				</span>
			</div>
		</motion.button>
	);
}
