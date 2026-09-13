import { AlertTriangle, Clock } from "lucide-react";
import { useState } from "react";
import { StaggerGroup } from "@/components/full/StaggerGroup";
import { StaggerItem } from "@/components/full/StaggerItem";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { ActiveDonationsByStepCard } from "./components/ActiveDonationsByStepCard";
import { BottlesCard } from "./components/BottlesCard";
import { GerarRelatorioButton } from "./components/GerarRelatorioButton";
import { MilkCollectedCard } from "./components/MilkCollectedCard";
import { PeriodFilter } from "./components/PeriodFilter";
import { RecurrenceCard } from "./components/RecurrenceCard";
import { RouteStatsCard } from "./components/RouteStatsCard";
import { RelatorioDoDashboard } from "./components/report/RelatorioDoDashboard";
import { SatisfactionCard } from "./components/SatisfactionCard";
import { StatCard } from "./components/StatCard";
import type { PeriodPreset } from "./constants";
import { useQueryAdmDashboard } from "./hooks";
import { useRelatorio } from "./hooks/use-relatorio";
import {
	descreverEmissao,
	descreverPeriodo,
	getPeriodPresetRange,
} from "./utils";

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

	const { emitidoEm, gerarRelatorio } = useRelatorio();

	return (
		<Page
			title="Dashboard"
			description="Indicadores consolidados de todas as doadoras · atualizado em tempo real"
			loading={dashboardQuery.isLoading}
			error={dashboardQuery.isError ? dashboardQuery.error : undefined}
			onRetry={() => dashboardQuery.refetch()}
			hasPermission={auth?.type === EnumUserType.Admin}
			titleClassName="print:hidden lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={
				<GerarRelatorioButton
					onGerar={gerarRelatorio}
					disabled={!data || dashboardQuery.isFetching}
				/>
			}
		>
			{emitidoEm ? (
				<RelatorioDoDashboard
					data={data}
					periodo={descreverPeriodo(requestParams)}
					emissao={descreverEmissao(emitidoEm)}
					emitidoPor={auth?.name ?? "—"}
				/>
			) : null}

			<div className="flex flex-col gap-6 print:hidden lg:mx-auto lg:w-full lg:max-w-[1400px]">
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

				<StaggerGroup className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
					<StaggerItem className="h-full">
						<ActiveDonationsByStepCard
							activeDonationsByStep={data?.active_donations_by_step ?? []}
						/>
					</StaggerItem>
					<StaggerItem className="h-full">
						<SatisfactionCard feedbackByScore={data?.feedback_by_score ?? []} />
					</StaggerItem>
				</StaggerGroup>

				<StaggerGroup className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
					<StaggerItem className="h-full">
						<BottlesCard
							stats={{
								bottles_count: data?.bottles_count ?? 0,
								discarded_bottles_count: data?.discarded_bottles_count ?? 0,
								average_bottles_per_donor: data?.average_bottles_per_donor ?? 0,
								bottles_utilization_rate: data?.bottles_utilization_rate ?? 0,
							}}
						/>
					</StaggerItem>
					<StaggerItem className="h-full">
						<RecurrenceCard rate={data?.donor_recurrence_rate ?? 0} />
					</StaggerItem>
				</StaggerGroup>

				<StaggerGroup className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
					<StaggerItem className="h-full">
						<StatCard
							icon={<Clock className="size-4 text-blue-deep" />}
							iconBg="bg-blue-tint"
							title="Tempo Médio de Resposta"
							subtitle="Triagem até a 1ª coleta agendada"
							value={data?.average_service_time_hours ?? null}
							decimals={1}
							suffix="h"
							footnote="Média de horas até o primeiro agendamento"
						/>
					</StaggerItem>
					<StaggerItem className="h-full">
						<StatCard
							icon={<AlertTriangle className="size-4 text-eva-deep" />}
							iconBg="bg-danger-tint"
							title="Doações não concluídas"
							subtitle="Ocorrências no período selecionado"
							value={data?.donations_with_error ?? 0}
							valueColor="text-eva-deep"
							footnote="Doações que não puderam ser completadas"
						/>
					</StaggerItem>
				</StaggerGroup>

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
