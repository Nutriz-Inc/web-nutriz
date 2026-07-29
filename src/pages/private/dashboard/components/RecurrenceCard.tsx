import { RefreshCcw } from "lucide-react";
import { DashboardCardHeader } from "./DashboardCardHeader";
import { toPercent } from "../utils";

type RecurrenceCardProps = {
	rate: number;
};

export function RecurrenceCard({ rate }: RecurrenceCardProps) {
	const percent = toPercent(rate);

	return (
		<div className="flex w-full flex-col gap-[22px] rounded-[18px] border border-[#e5e7eb] bg-white p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<RefreshCcw className="size-4 text-[#f2579f]" />}
				iconBg="bg-[#fdebf3]"
				title="Taxa de Recorrência de Doadoras"
				subtitle="Doadoras que ajudaram mais de uma vez"
			/>

			<div className="flex flex-col gap-3">
				<p className="text-[28px] font-medium text-[#111827]">{percent}%</p>

				<div className="h-8 w-full overflow-hidden rounded-[6px] bg-[#9ca3af]/[0.13]">
					<div
						className="h-full rounded-[6px] bg-[#f2579f]/80"
						style={{ width: `${percent}%` }}
					/>
				</div>

				<div className="flex items-center justify-between text-[11px] text-[#9ca3af]">
					<span>0%</span>
					<span>50%</span>
					<span>100%</span>
				</div>
			</div>
		</div>
	);
}
