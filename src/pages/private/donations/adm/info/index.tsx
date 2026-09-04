import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumDonationStepStatus } from "@/services/types/i-donation";
import { EnumUserType } from "@/services/types/i-user";
import { getStepDefinitions } from "../../common/info/constants";
import { AdminStepCard } from "./components/AdminStepCard";
import { DonationInfoCard } from "./components/DonationInfoCard";
import { DonationStatusStepper } from "./components/DonationStatusStepper";
import { DonorInfoCard } from "./components/DonorInfoCard";
import type { AdminStepVisualStatus } from "./constants";
import {
	useAdminDonationDetail,
	useCreateDonationStep,
	useDonationJobs,
} from "./hooks";

export function DonationManagementDetailPage() {
	const { id_donation = "" } = useParams();
	const location = useLocation();
	const backTo = location.state?.backTo ?? "/gestao-doacoes";
	const { auth } = useAuth();
	const { donationQuery, donorQuery } = useAdminDonationDetail(id_donation);
	const createNextStepMutation = useCreateDonationStep(id_donation);

	const donation = donationQuery.data;
	const jobsQuery = useDonationJobs(donation?.created_by);
	const jobs = jobsQuery.data ?? [];
	const steps = donation?.steps ?? [];
	const stepDefinitions = getStepDefinitions(donation?.is_recurrent);
	const hasFailedStep = steps.some(
		(s) => s.status === EnumDonationStepStatus.Failed,
	);

	const isFullyCompleted =
		!hasFailedStep &&
		stepDefinitions.every((definition) => {
			const step = steps.find((s) => s.name === definition.name);
			return step?.status === EnumDonationStepStatus.Done;
		});

	const firstPendingOrder = stepDefinitions.find((definition) => {
		const step = steps.find((s) => s.name === definition.name);
		return step?.status !== EnumDonationStepStatus.Done;
	})?.order;

	function getVisualStatus(order: number): AdminStepVisualStatus {
		if (firstPendingOrder === undefined) return "done";
		if (order < firstPendingOrder) return "done";
		if (order === firstPendingOrder) return "current";
		return "locked";
	}

	function handleStepFinalized(order: number) {
		const nextDefinition = stepDefinitions.find(
			(definition) => definition.order === order + 1,
		);
		if (!nextDefinition) return;
		if (steps.some((s) => s.name === nextDefinition.name)) return;

		const description =
			stepDefinitions.find(
				(definition) => definition.name === nextDefinition.name,
			)?.description ?? "";

		createNextStepMutation.mutate({
			id_donation,
			name: nextDefinition.name,
			description,
		});
	}

	return (
		<Page
			hasPermission={auth?.type === EnumUserType.Admin}
			loading={donationQuery.isLoading}
			backTo={backTo}
			title={id_donation.slice(0, 16)}
			description="Informações cadastrais e histórico da doação na plataforma"
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
		>
			{donation && (
				<div className="-mx-4 -mt-4 -mb-16 sm:-mx-6 sm:-mt-6 flex min-h-[calc(100vh-69px)] flex-col gap-5 bg-canvas p-4 lg:m-0 lg:min-h-0 lg:mx-auto lg:max-w-[1400px] lg:flex-row lg:items-start lg:gap-6 lg:bg-transparent lg:p-0">
					<div className="flex flex-col gap-5 lg:w-[340px] lg:shrink-0">
						<DonationInfoCard donation={donation} />
						<DonorInfoCard donor={donorQuery.data} />
						<DonationStatusStepper
							steps={steps}
							definitions={stepDefinitions}
							getVisualStatus={getVisualStatus}
						/>
					</div>

					<div className="flex min-w-0 flex-1 flex-col gap-4">
						<div className="flex flex-col gap-1">
							<p className="text-[20px] font-bold text-ink">Etapas da doação</p>
							<p className="text-[14px] text-ink-2">
								Gerencie o agendamento e o status de cada etapa. Finalize para
								liberar a próxima.
							</p>
						</div>

						{hasFailedStep && (
							<div className="flex items-center gap-2.5 rounded-xl border border-danger-tint bg-danger-tint px-4 py-3">
								<AlertTriangle className="size-4 shrink-0 text-danger" />
								<p className="text-[13px] font-semibold text-danger">
									Esta doação foi encerrada — uma das etapas foi marcada como
									erro.
								</p>
							</div>
						)}

						{isFullyCompleted && (
							<div className="flex items-center gap-2.5 rounded-xl border border-teal-tint bg-success-tint px-4 py-3">
								<CheckCircle2 className="size-4 shrink-0 text-success" />
								<p className="text-[13px] font-semibold text-success">
									Esta doação foi concluída com sucesso — todas as etapas foram
									finalizadas.
								</p>
							</div>
						)}

						{stepDefinitions.map((definition) => {
							const step = steps.find((s) => s.name === definition.name);

							return (
								<AdminStepCard
									key={`${definition.name}-${step?.updated_at ?? step?.created_at ?? "pending"}`}
									idDonation={id_donation}
									idUserCommon={donation.created_by}
									definition={definition}
									step={step}
									visualStatus={getVisualStatus(definition.order)}
									donorAddresses={donorQuery.data?.addresses ?? []}
									onFinalized={() => handleStepFinalized(definition.order)}
									donationEnded={hasFailedStep}
									isLastStep={definition.order === stepDefinitions.length}
									jobs={jobs.filter(
										(job) => job.id_step === step?.id_donation_step,
									)}
									jobsLoading={jobsQuery.isLoading}
								/>
							);
						})}
					</div>
				</div>
			)}
		</Page>
	);
}
