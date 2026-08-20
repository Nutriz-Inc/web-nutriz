import { CalendarX } from "lucide-react";
import { useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { AppointmentStepper } from "./components/AppointmentStepper";
import { AppointmentSummaryCard } from "./components/AppointmentSummaryCard";
import { EndedNotice } from "./components/EndedNotice";
import { FinalResultCard } from "./components/FinalResultCard";
import { ReportHistory } from "./components/ReportHistory";
import { StepDescriptionCard } from "./components/StepDescriptionCard";
import { UpdateStepStatusForm } from "./components/UpdateStepStatusForm";
import { useAppointmentDetail } from "./hooks";

export function AppointmentDetailPage() {
	const { id_job = "" } = useParams();
	const { auth } = useAuth();
	const { data: appointment, isLoading } = useAppointmentDetail(id_job);

	return (
		<Page
			hasPermission={auth?.type === EnumUserType.Nurse}
			loading={isLoading}
			backTo="/agendamentos"
			title={`Agendamento #${id_job.slice(0, 8)}`}
			description="Acompanhe cada etapa do processo do agendamento."
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
		>
			{!appointment ? (
				<div className="flex flex-col items-center gap-2 rounded-card-sm border border-line bg-white p-10 text-center">
					<CalendarX className="size-8 text-blue-tint-2" />
					<p className="text-[15px] font-semibold text-ink">
						Agendamento não encontrado
					</p>
					<p className="text-[13px] text-ink-3">
						Ele pode ter sido removido ou o endereço está incorreto.
					</p>
				</div>
			) : (
				<div className="-mx-4 -mt-4 -mb-16 sm:-mx-6 sm:-mt-6 flex min-h-[calc(100vh-69px)] flex-col gap-5 bg-surface-3 p-4 pb-24 lg:m-0 lg:mx-auto lg:min-h-0 lg:max-w-[1200px] lg:bg-transparent lg:p-0 lg:pb-8">
					{appointment.ended && (
						<div className="lg:hidden">
							<EndedNotice status={appointment.status} />
						</div>
					)}

					<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
						<div className="flex flex-col gap-5 lg:w-[340px] lg:shrink-0">
							<AppointmentSummaryCard appointment={appointment} />
							{appointment.steps.length > 0 && (
								<AppointmentStepper
									steps={appointment.steps}
									ended={appointment.ended}
								/>
							)}
						</div>

						<div className="flex min-w-0 flex-1 flex-col gap-5">
							{appointment.ended ? (
								<>
									<div className="hidden lg:block">
										<EndedNotice status={appointment.status} />
									</div>
									{appointment.finalResult && (
										<FinalResultCard result={appointment.finalResult} />
									)}
									<StepDescriptionCard
										stepName={appointment.stepName}
										description={appointment.description}
									/>
									{(appointment.steps.length > 0 ||
										appointment.reports.length > 0) && (
										<ReportHistory reports={appointment.reports} />
									)}
								</>
							) : (
								<>
									<StepDescriptionCard
										stepName={appointment.stepName}
										description={appointment.description}
									/>
									<UpdateStepStatusForm
										id_job={id_job}
										stepName={appointment.stepName}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</Page>
	);
}
