import { CalendarX } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { AppointmentStepper } from "../../detail/components/AppointmentStepper";
import { AppointmentSummaryCard } from "../../detail/components/AppointmentSummaryCard";
import { EndedNotice } from "../../detail/components/EndedNotice";
import { FinalResultCard } from "../../detail/components/FinalResultCard";
import { ReportHistory } from "../../detail/components/ReportHistory";
import { StepDescriptionCard } from "../../detail/components/StepDescriptionCard";
import { useAppointmentDetail } from "../../detail/hooks";
import { DonationLinkCard } from "./components/DonationLinkCard";
import { UpdateStepDescriptionForm } from "./components/UpdateStepDescriptionForm";
import { useAppointmentDonation } from "./hooks";

export function AppointmentManagementDetailPage() {
	const { id_job = "" } = useParams();
	const location = useLocation();
	const backTo = location.state?.backTo ?? "/gestao-agendamentos";
	const { auth } = useAuth();
	const { data: appointment, isLoading } = useAppointmentDetail(id_job);
	const { data: id_donation } = useAppointmentDonation(
		id_job,
		appointment?.id_user_common,
	);

	return (
		<Page
			hasPermission={auth?.type === EnumUserType.Admin}
			loading={isLoading}
			backTo={backTo}
			title={`Agendamento #${id_job.slice(0, 8)}`}
			description="Acompanhe as etapas do agendamento e edite a descrição enquanto ele estiver em andamento."
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
		>
			{!appointment ? (
				<div className="flex flex-col items-center gap-2 rounded-card-sm border border-line bg-surface p-10 text-center">
					<CalendarX className="size-8 text-ink-3" />
					<p className="text-[15px] font-semibold text-ink">
						Agendamento não encontrado
					</p>
					<p className="text-[13px] text-ink-3">
						Ele pode ter sido removido ou o endereço está incorreto.
					</p>
				</div>
			) : (
				<div className="-mx-4 -mt-4 -mb-16 sm:-mx-6 sm:-mt-6 flex min-h-[calc(100vh-69px)] flex-col gap-5 bg-canvas p-4 pb-24 lg:m-0 lg:mx-auto lg:min-h-0 lg:max-w-[1200px] lg:bg-transparent lg:p-0 lg:pb-8">
					{appointment.ended && (
						<div className="lg:hidden">
							<EndedNotice status={appointment.status} />
						</div>
					)}

					<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
						<div className="flex flex-col gap-5 lg:w-[340px] lg:shrink-0">
							<AppointmentSummaryCard appointment={appointment} />
							{id_donation && <DonationLinkCard id_donation={id_donation} />}
							{appointment.steps.length > 0 && (
								<AppointmentStepper
									steps={appointment.steps}
									ended={appointment.ended}
								/>
							)}
						</div>

						<div className="flex min-w-0 flex-1 flex-col gap-5">
							{appointment.ended && (
								<>
									<div className="hidden lg:block">
										<EndedNotice status={appointment.status} />
									</div>
									{appointment.finalResult && (
										<FinalResultCard result={appointment.finalResult} />
									)}
								</>
							)}

							{appointment.ended ? (
								<StepDescriptionCard
									stepName={appointment.stepName}
									description={appointment.description}
								/>
							) : (
								<UpdateStepDescriptionForm
									id_job={id_job}
									stepName={appointment.stepName}
									description={appointment.description}
								/>
							)}

							{appointment.reports.length > 0 && (
								<ReportHistory reports={appointment.reports} />
							)}
						</div>
					</div>
				</div>
			)}
		</Page>
	);
}
