import { AlertTriangle } from "lucide-react";
import { useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumDonationStepStatus } from "@/services/types/i-donation";
import { EnumUserType } from "@/services/types/i-user";
import { STEP_DEFINITIONS } from "../info/constants";
import { AdminStepCard } from "./components/AdminStepCard";
import { DonationInfoCard } from "./components/DonationInfoCard";
import { DonationStatusStepper } from "./components/DonationStatusStepper";
import { DonorInfoCard } from "./components/DonorInfoCard";
import {
	ADMIN_STEP_DEFINITIONS,
	type AdminStepVisualStatus,
} from "./constants";
import { useAdminDonationDetail, useCreateDonationStep } from "./hooks";

export function DonationManagementDetailPage() {
	const { id_donation = "" } = useParams();
	const { auth } = useAuth();
	const { donationQuery, donorQuery } = useAdminDonationDetail(id_donation);
	const createNextStepMutation = useCreateDonationStep(id_donation);

	const donation = donationQuery.data;
	const steps = donation?.steps ?? [];
	const hasFailedStep = steps.some(
		(s) => s.status === EnumDonationStepStatus.Failed,
	);

	const firstPendingOrder = ADMIN_STEP_DEFINITIONS.find((definition) => {
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
		const nextDefinition = ADMIN_STEP_DEFINITIONS.find(
			(definition) => definition.order === order + 1,
		);
		if (!nextDefinition) return;
		if (steps.some((s) => s.name === nextDefinition.name)) return;

		const description =
			STEP_DEFINITIONS.find(
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
			backTo="/gestao-doacoes"
		>
			{donation && (
				<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col gap-5 bg-[#f4f7fb] p-4 lg:m-0 lg:min-h-0 lg:mx-auto lg:max-w-[1400px] lg:flex-row lg:items-start lg:gap-6 lg:bg-transparent lg:p-0">
					<div className="flex flex-col gap-5 lg:w-[340px] lg:shrink-0">
						<DonationInfoCard donation={donation} />
						<DonorInfoCard donor={donorQuery.data} />
						<DonationStatusStepper
							steps={steps}
							getVisualStatus={getVisualStatus}
						/>
					</div>

					<div className="flex min-w-0 flex-1 flex-col gap-4">
						<div className="flex flex-col gap-1">
							<p className="text-[20px] font-bold text-[#1f2a37]">
								Etapas da doação
							</p>
							<p className="text-[14px] text-[#6b7280]">
								Gerencie o agendamento e o status de cada etapa. Finalize para
								liberar a próxima.
							</p>
						</div>

						{hasFailedStep && (
							<div className="flex items-center gap-2.5 rounded-xl border border-[#f3caca] bg-[#fcebeb] px-4 py-3">
								<AlertTriangle className="size-4 shrink-0 text-[#a32d2d]" />
								<p className="text-[13px] font-semibold text-[#a32d2d]">
									Esta doação foi encerrada — uma das etapas foi marcada como
									erro.
								</p>
							</div>
						)}

						{ADMIN_STEP_DEFINITIONS.map((definition) => {
							const step = steps.find((s) => s.name === definition.name);

							return (
								<AdminStepCard
									key={`${definition.name}-${step?.updated_at ?? step?.created_at ?? "pending"}`}
									idDonation={id_donation}
									definition={definition}
									step={step}
									visualStatus={getVisualStatus(definition.order)}
									donorAddresses={donorQuery.data?.addresses ?? []}
									onFinalized={() => handleStepFinalized(definition.order)}
									donationEnded={hasFailedStep}
								/>
							);
						})}
					</div>
				</div>
			)}
		</Page>
	);
}
