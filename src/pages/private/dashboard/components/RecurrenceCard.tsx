import { RefreshCcw } from "lucide-react";
import { toPercent } from "../utils";
import { DashboardCardHeader } from "./DashboardCardHeader";

type RecurrenceCardProps = {
	rate: number;
};

export function RecurrenceCard({ rate }: RecurrenceCardProps) {
	const percent = toPercent(rate);

	return (
		<div className="flex w-full flex-col gap-[22px] rounded-card-sm border border-line bg-white p-5 lg:p-[26px]">
			<DashboardCardHeader
				icon={<RefreshCcw className="size-4 text-eva-deep" />}
				iconBg="bg-danger-tint"
				title="Taxa de Recorrência de Doadoras"
				subtitle="Doadoras que ajudaram mais de uma vez"
			/>

			<div className="flex flex-col gap-3">
				<p className="text-[28px] font-medium text-ink">{percent}%</p>

				<div className="h-8 w-full overflow-hidden rounded-md bg-ink-3/[0.13]">
					<div
						className="h-full rounded-md bg-eva/80"
						style={{ width: `${percent}%` }}
					/>
				</div>

				<div className="flex items-center justify-between text-[11px] text-ink-3">
					<span>0%</span>
					<span>50%</span>
					<span>100%</span>
				</div>
			</div>
		</div>
	);
}
