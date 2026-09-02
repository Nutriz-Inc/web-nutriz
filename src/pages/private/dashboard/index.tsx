import { AlertTriangle, Clock } from "lucide-react";
import { useState } from "react";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { ActiveDonationsByStepCard } from "./components/ActiveDonationsByStepCard";
import { BottlesCard } from "./components/BottlesCard";
import { MilkCollectedCard } from "./components/MilkCollectedCard";
import { PeriodFilter } from "./components/PeriodFilter";
import { RecurrenceCard } from "./components/RecurrenceCard";
import { RouteStatsCard } from "./components/RouteStatsCard";
import { SatisfactionCard } from "./components/SatisfactionCard";
import { StatCard } from "./components/StatCard";
import type { PeriodPreset } from "./constants";
import { useQueryAdmDashboard } from "./hooks";
import { formatOptionalDecimal, getPeriodPresetRange } from "./utils";

export function AdmDashboardPage() {
	const { auth } = useAuth();

	const [preset, setPreset] = useState<PeriodPreset>("month");
	const [customStart, setCustomStart] = useState("");
	const [customEnd, setCustomEnd] = useState("");
	const [appliedCustomRange, setAppliedCustomRange] = useState<{
		start_date: string;
		end_date: string;
	} | null>(null);

	function handlePresetChange(next: PeriodPreset) {
		setPreset(next);
		if (next !== "custom") setAppliedCustomRange(null);
	}

	function handleApplyCustom() {
		if (customStart && customEnd) {
			setAppliedCustomRange({ start_date: customStart, end_date: customEnd });
		}
	}

	const requestParams =
		preset === "custom"
			? (appliedCustomRange ?? {})
			: getPeriodPresetRange(preset);

	const { dashboardQuery } = useQueryAdmDashboard(requestParams);
	const data = dashboardQuery.data;

	return (
		<Page
			title="Dashboard"
			description="Indicadores consolidados de todas as doadoras · atualizado em tempo real"
			loading={dashboardQuery.isLoading}
			hasPermission={auth?.type === EnumUserType.Admin}
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
		>
			<div className="flex flex-col gap-6 lg:mx-auto lg:w-full lg:max-w-[1400px]">
				<PeriodFilter
					preset={preset}
					onPresetChange={handlePresetChange}
					customStart={customStart}
					customEnd={customEnd}
					onCustomStartChange={setCustomStart}
					onCustomEndChange={setCustomEnd}
					onApplyCustom={handleApplyCustom}
				/>

				<MilkCollectedCard
					total={data?.total_milk_collected ?? 0}
					byMonth={data?.milk_collected_by_month ?? []}
				/>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<ActiveDonationsByStepCard
						activeDonationsByStep={data?.active_donations_by_step ?? []}
					/>
					<SatisfactionCard feedbackByScore={data?.feedback_by_score ?? []} />
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<BottlesCard
						stats={{
							bottles_count: data?.bottles_count ?? 0,
							discarded_bottles_count: data?.discarded_bottles_count ?? 0,
							average_bottles_per_donor: data?.average_bottles_per_donor ?? 0,
							bottles_utilization_rate: data?.bottles_utilization_rate ?? 0,
						}}
					/>
					<RecurrenceCard rate={data?.donor_recurrence_rate ?? 0} />
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<StatCard
						icon={<Clock className="size-4 text-blue-deep" />}
						iconBg="bg-blue-tint"
						title="Tempo Médio de Resposta"
						subtitle="Triagem até a 1ª coleta agendada"
						value={formatOptionalDecimal(data?.average_service_time_hours, "h")}
						footnote="Média de horas até o primeiro agendamento"
					/>
					<StatCard
						icon={<AlertTriangle className="size-4 text-eva-deep" />}
						iconBg="bg-danger-tint"
						title="Doações não concluídas"
						subtitle="Ocorrências no período selecionado"
						value={String(data?.donations_with_error ?? 0)}
						valueColor="text-eva-deep"
						footnote="Doações que não puderam ser completadas"
					/>
				</div>

				<RouteStatsCard
					stats={{
						average_mileage_per_route: data?.average_mileage_per_route ?? null,
						average_stops_per_route: data?.average_stops_per_route ?? null,
						average_route_duration_hours:
							data?.average_route_duration_hours ?? null,
					}}
				/>
			</div>
		</Page>
	);
}
