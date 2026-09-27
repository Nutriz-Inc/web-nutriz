import { useState } from "react";
import { CountUp } from "@/components/full/CountUp";
import { FaixaDeIndicadores } from "@/components/full/FaixaDeIndicadores";
import { StaggerGroup } from "@/components/full/StaggerGroup";
import { StaggerItem } from "@/components/full/StaggerItem";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import type { FiltroDeIndicadores } from "@/services/types/i-analytics";
import { EnumUserType } from "@/services/types/i-user";
import { ActiveDonationsByStepCard } from "./components/ActiveDonationsByStepCard";
import { BottlesCard } from "./components/BottlesCard";
import { CadeiaFriaCard } from "./components/CadeiaFriaCard";
import { FunilCard } from "./components/FunilCard";
import { GerarRelatorioButton } from "./components/GerarRelatorioButton";
import { LogisticaCard } from "./components/LogisticaCard";
import { MilkCollectedCard } from "./components/MilkCollectedCard";
import { MotoristasCard } from "./components/MotoristasCard";
import { OperacaoAgoraCard } from "./components/OperacaoAgoraCard";
import { PeriodFilter } from "./components/PeriodFilter";
import { RecurrenceCard } from "./components/RecurrenceCard";
import { RegioesCard } from "./components/RegioesCard";
import { RelatorioDoDashboard } from "./components/report/RelatorioDoDashboard";
import { SatisfactionCard } from "./components/SatisfactionCard";
import type { PeriodPreset } from "./constants";
import { useQueryAdmDashboard } from "./hooks";
import { useIndicador } from "./hooks/use-indicadores";
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
	const intervalo: { start_date?: string; end_date?: string } = requestParams;
	const filtroDeIndicadores: FiltroDeIndicadores =
		intervalo.start_date && intervalo.end_date
			? { inicio: intervalo.start_date, fim: intervalo.end_date }
			: { periodo: "tudo" };
	const data = dashboardQuery.data;

	const cadeiaFriaDoRelatorio = useIndicador(
		"cadeia_fria",
		filtroDeIndicadores,
	);
	const logisticaDoRelatorio = useIndicador("logistica", filtroDeIndicadores);
	const { emitidoEm, gerarRelatorio } = useRelatorio(!!data);

	const doacoesAtivas = (data?.active_donations_by_step ?? []).reduce(
		(soma, etapa) => soma + etapa.count,
		0,
	);
	const tempoDeResposta = data?.average_service_time_hours ?? null;
	const naoConcluidas = data?.donations_with_error ?? 0;

	const indicadores = [
		{
			chave: "litros",
			rotulo: "Litros captados",
			detalhe: "Todas as doadoras, no período",
			tom: "marca" as const,
			valor: (
				<CountUp
					value={(data?.total_milk_collected ?? 0) / 1000}
					decimals={1}
					suffix=" L"
				/>
			),
		},
		{
			chave: "ativas",
			rotulo: "Doações em andamento",
			detalhe: "Em alguma etapa agora",
			valor: <CountUp value={doacoesAtivas} />,
		},
		{
			chave: "resposta",
			rotulo: "Tempo médio de resposta",
			detalhe: "Da triagem à 1ª coleta agendada",
			valor:
				tempoDeResposta === null ? (
					"—"
				) : (
					<CountUp value={tempoDeResposta} decimals={1} suffix="h" />
				),
		},
		{
			chave: "nao-concluidas",
			rotulo: "Doações não concluídas",
			detalhe: "Interrompidas no período",
			tom: naoConcluidas > 0 ? ("perigo" as const) : ("neutro" as const),
			valor: <CountUp value={naoConcluidas} />,
		},
	];

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
					cadeiaFria={cadeiaFriaDoRelatorio.data}
					logistica={logisticaDoRelatorio.data}
					periodo={descreverPeriodo(requestParams)}
					emissao={descreverEmissao(emitidoEm)}
					emitidoPor={auth?.name ?? "—"}
				/>
			) : null}

			<div className="flex flex-col gap-6 print:hidden lg:mx-auto lg:w-full lg:max-w-[1400px]">
				<OperacaoAgoraCard />

				<PeriodFilter
					preset={preset}
					onPresetChange={handlePresetChange}
					customStart={customStart}
					customEnd={customEnd}
					onCustomStartChange={setCustomStart}
					onCustomEndChange={setCustomEnd}
					onApplyCustom={handleApplyCustom}
				/>

				<FaixaDeIndicadores
					rotulo="Resumo do período"
					indicadores={indicadores}
				/>

				<StaggerGroup className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
					<StaggerItem className="h-full">
						<CadeiaFriaCard filtro={filtroDeIndicadores} />
					</StaggerItem>
					<StaggerItem className="h-full">
						<LogisticaCard filtro={filtroDeIndicadores} />
					</StaggerItem>
				</StaggerGroup>

				<FunilCard filtro={filtroDeIndicadores} />

				<StaggerGroup className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
					<StaggerItem className="h-full">
						<MilkCollectedCard
							total={data?.total_milk_collected ?? 0}
							byMonth={data?.milk_collected_by_month ?? []}
						/>
					</StaggerItem>
					<StaggerItem className="h-full">
						<ActiveDonationsByStepCard
							activeDonationsByStep={data?.active_donations_by_step ?? []}
						/>
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
						<SatisfactionCard feedbackByScore={data?.feedback_by_score ?? []} />
					</StaggerItem>
					<StaggerItem className="h-full">
						<RegioesCard filtro={filtroDeIndicadores} />
					</StaggerItem>
				</StaggerGroup>

				<MotoristasCard filtro={filtroDeIndicadores} />
			</div>
		</Page>
	);
}
