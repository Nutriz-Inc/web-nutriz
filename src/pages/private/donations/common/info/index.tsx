import { useNavigate, useParams } from "react-router-dom";
import { LiveBadge } from "@/components/full/LiveBadge";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import {
	type EnumDonationStepName,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";
import { EnumUserType } from "@/services/types/i-user";
import { DonationFeedbackCard } from "./components/DonationFeedbackCard";
import { DonationStepCard } from "./components/DonationStepCard";
import { DonationSummaryCard } from "./components/DonationSummaryCard";
import { STEP_DEFINITIONS, type StepVisualStatus } from "./constants";
import { useDonation, useUpdateDonation } from "./hooks/use-donation";

export function DonationInfoPage() {
	const { id_donation = "" } = useParams();
	const navigate = useNavigate();
	const { donationQuery, etapasDestacadas } = useDonation(id_donation);
	const updateDonationMutation = useUpdateDonation(id_donation);
	const { auth } = useAuth();

	const steps = donationQuery.data?.steps ?? [];

	const hasFailedStep = steps.some(
		(s) => s.status === EnumDonationStepStatus.Failed,
	);

	const isFullyCompleted =
		!hasFailedStep &&
		STEP_DEFINITIONS.every((definition) => {
			const step = steps.find((s) => s.name === definition.name);
			return step?.status === EnumDonationStepStatus.Done;
		});

	const isConcluded = hasFailedStep || isFullyCompleted;

	const firstPendingOrder = STEP_DEFINITIONS.find((definition) => {
		const step = steps.find(
			(s: { name: EnumDonationStepName }) => s.name === definition.name,
		);
		return step?.status !== EnumDonationStepStatus.Done;
	})?.order;

	return (
		<Page
			title={`Doação #${id_donation.slice(0, 8)}`}
			description="Acompanhe cada etapa do processo da sua doação."
			hasPermission={auth?.type === EnumUserType.Common}
			loading={donationQuery.isLoading}
			backTo="/minhas-doacoes"
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={!isConcluded && <LiveBadge />}
		>
			<div className="flex flex-col pt-4 gap-5">
				{donationQuery.data?.bottles &&
					donationQuery.data.bottles.length > 0 && (
						<DonationSummaryCard bottles={donationQuery.data.bottles} />
					)}

				{isConcluded && (
					<DonationFeedbackCard
						hasError={hasFailedStep}
						feedback={donationQuery.data?.user_feedback}
						scoreFeedback={donationQuery.data?.score_feedback}
						isPending={updateDonationMutation.isPending}
						onSubmit={(feedback, score) =>
							updateDonationMutation.mutate({
								user_feedback: feedback,
								score_feedback: score,
							})
						}
					/>
				)}

				{STEP_DEFINITIONS.map((definition, index) => {
					const step = steps.find(
						(s: { name: EnumDonationStepName }) => s.name === definition.name,
					);

					const visualStatus: StepVisualStatus =
						step?.status === EnumDonationStepStatus.Done
							? "done"
							: definition.order === firstPendingOrder
								? "current"
								: "waiting";

					return (
						<DonationStepCard
							key={definition.name}
							order={definition.order}
							title={step?.name || definition.name}
							description={definition.description}
							setDate={step?.set_date}
							completedAt={step?.completed_at}
							icon={definition.icon}
							visualStatus={visualStatus}
							isLast={index === STEP_DEFINITIONS.length - 1}
							justChanged={
								step ? etapasDestacadas.has(step.id_donation_step) : false
							}
							onClick={
								step
									? () =>
											navigate(
												`/doacao/${id_donation}/etapa/${step.id_donation_step}`,
											)
									: undefined
							}
						/>
					);
				})}
			</div>
		</Page>
	);
}
