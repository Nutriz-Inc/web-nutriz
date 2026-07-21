import { Flag } from "lucide-react";
import { formatAppointmentDateTime } from "../../format";
import { AppointmentStatusBadge } from "../../shared/AppointmentStatusBadge";
import type { AppointmentFinalResult } from "../../types";

type FinalResultCardProps = {
	result: AppointmentFinalResult;
};

export function FinalResultCard({ result }: FinalResultCardProps) {
	return (
		<div className="flex flex-col gap-4 rounded-2xl border border-[#e7ecf2] bg-white p-5">
			<div className="flex items-center gap-2">
				<Flag className="size-4 text-[#94a3b8]" />
				<span className="text-[12px] font-bold uppercase tracking-wide text-[#6b7280]">
					Resultado final
				</span>
			</div>

			<div className="flex flex-col gap-3 lg:flex-row lg:items-start">
				<AppointmentStatusBadge status={result.status} className="shrink-0" />
				<p className="text-[14px] leading-relaxed text-[#374151]">
					{result.description}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 border-t border-[#eef1f5] pt-4 sm:grid-cols-2">
				<div className="flex flex-col gap-0.5">
					<span className="text-[12px] text-[#9ca3af]">Encerrado em</span>
					<span className="text-[14px] font-semibold text-[#374151]">
						{formatAppointmentDateTime(result.endedAt)}
					</span>
				</div>
				<div className="flex flex-col gap-0.5">
					<span className="text-[12px] text-[#9ca3af]">
						Responsável pelo encerramento
					</span>
					<span className="text-[14px] font-semibold text-[#374151]">
						{result.responsible}
					</span>
				</div>
			</div>
		</div>
	);
}
