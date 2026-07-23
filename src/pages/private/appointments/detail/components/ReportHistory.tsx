import { FileText } from "lucide-react";
import type { AppointmentReport } from "../../types";
import { ReportHistoryItem } from "./ReportHistoryItem";

type ReportHistoryProps = {
	reports: AppointmentReport[];
};

export function ReportHistory({ reports }: ReportHistoryProps) {
	return (
		<div className="flex flex-col gap-4 rounded-2xl border border-[#e7ecf2] bg-white p-5">
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-2">
					<FileText className="size-4 text-[#94a3b8]" />
					<span className="text-[12px] font-bold uppercase tracking-wide text-[#6b7280]">
						Histórico de relatórios
					</span>
				</div>
				<p className="text-[13px] text-[#9ca3af]">
					Registro de cada etapa da doação, em ordem cronológica.
				</p>
			</div>

			{reports.length === 0 ? (
				<p className="rounded-xl border border-[#eef1f5] bg-[#f9fafc] p-4 text-[13px] text-[#9ca3af]">
					Nenhum relatório registrado ainda.
				</p>
			) : (
				<div className="flex flex-col gap-3">
					{reports.map((report) => (
						<ReportHistoryItem
							key={`${report.stepName}-${report.date}`}
							report={report}
						/>
					))}
				</div>
			)}
		</div>
	);
}
