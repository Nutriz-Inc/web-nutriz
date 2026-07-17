import { useNavigate, useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import {
	EnumDonationStepName,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";
import { EnumUserType } from "@/services/types/i-user";
import { DonationStepCard } from "./components/DonationStepCard";
import { STEP_DEFINITIONS, type StepVisualStatus } from "./constants";
import { useDonation } from "./hooks/use-donation";

export function DonationInfoPage() {
	const { id_donation = "" } = useParams();
	const navigate = useNavigate();
	const { donationQuery } = useDonation(id_donation);
	const { auth } = useAuth();

	const steps = donationQuery.data?.steps ?? [];

	const firstPendingOrder = STEP_DEFINITIONS.find((definition) => {
		const step = steps.find((s: { name: EnumDonationStepName; }) => s.name === definition.name);
		return step?.status !== EnumDonationStepStatus.Done;
	})?.order;

	return (
		<Page
			title={`Doação #${id_donation.slice(0, 8)}`}
			description="Acompanhe cada etapa do processo da sua doação."
			hasPermission={auth?.type === EnumUserType.Common}
			loading={donationQuery.isLoading}
			backTo="/minhas-doacoes"
		>
			<div className="flex flex-col pt-4">
				{STEP_DEFINITIONS.map((definition, index) => {
					const step = steps.find((s: { name: EnumDonationStepName; }) => s.name === definition.name);

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
