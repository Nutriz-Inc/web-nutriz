import { FileText } from "lucide-react";
import type { AppointmentReport } from "../../types";
import { ReportHistoryItem } from "./ReportHistoryItem";

type ReportHistoryProps = {
	reports: AppointmentReport[];
};

export function ReportHistory({ reports }: ReportHistoryProps) {
	return (
		<div className="flex flex-col gap-4 rounded-card-sm border border-line bg-white p-5">
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-2">
					<FileText className="size-4 text-ink-3" />
					<span className="text-[12px] font-bold uppercase tracking-wide text-ink-2">
						Histórico de relatórios
					</span>
				</div>
			</div>

			{reports.length === 0 ? (
				<p className="rounded-xl border border-surface-3 bg-surface-2 p-4 text-[13px] text-ink-3">
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
