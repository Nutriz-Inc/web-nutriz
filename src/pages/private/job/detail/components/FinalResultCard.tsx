import { Flag } from "lucide-react";
import { formatCreatedAt } from "@/utils/formatter";
import type { AppointmentFinalResult } from "../../types";

type FinalResultCardProps = {
	result: AppointmentFinalResult;
};

export function FinalResultCard({ result }: FinalResultCardProps) {
	return (
		<div className="flex flex-col gap-4 rounded-card-sm border border-line bg-white p-5">
			<div className="flex items-center gap-2">
				<Flag className="size-4 text-ink-3" />
				<span className="text-[12px] font-bold uppercase tracking-wide text-ink-2">
					Resultado final
				</span>
			</div>

			<div className="grid grid-cols-1 gap-4 border-t border-surface-3 pt-4 sm:grid-cols-2">
				<div className="flex flex-col gap-0.5">
					<span className="text-[12px] text-ink-3">Encerrado em</span>
					<span className="text-[14px] font-semibold text-ink-2">
						{result.endedAt ? formatCreatedAt(result.endedAt) : "—"}
					</span>
				</div>
				<div className="flex flex-col gap-0.5">
					<span className="text-[12px] text-ink-3">
						Responsável pelo encerramento
					</span>
					<span className="text-[14px] font-semibold text-ink-2">
						{result.responsible}
					</span>
				</div>
			</div>
		</div>
	);
}
