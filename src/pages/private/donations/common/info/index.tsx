import { useNavigate, useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumDonationStepStatus } from "@/services/types/i-donation";
import { EnumUserType } from "@/services/types/i-user";
import { DonationFeedbackCard } from "./components/DonationFeedbackCard";
import { DonationSummaryCard } from "./components/DonationSummaryCard";
import { DonationTimelineCard } from "./components/DonationTimelineCard";
import { STEP_DEFINITIONS } from "./constants";
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

	return (
		<Page
			title={`Doação #${id_donation.slice(0, 8)}`}
			description="Acompanhe cada etapa do processo da sua doação."
			hasPermission={auth?.type === EnumUserType.Common}
			loading={donationQuery.isLoading}
			backTo="/minhas-doacoes"
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
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

				<DonationTimelineCard
					steps={steps}
					highlightedSteps={etapasDestacadas}
					onSelectStep={(idDonationStep) =>
						navigate(`/doacao/${id_donation}/etapa/${idDonationStep}`)
					}
				/>
			</div>
		</Page>
	);
}
