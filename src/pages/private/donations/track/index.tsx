import { useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { EnumDonationStepStatus } from "@/services/types/i-donation";
import {
	DonationStepCard,
	type StepVisualStatus,
} from "./components/DonationStepCard";
import { useDonation } from "./hooks/use-donation";
import { STEP_DEFINITIONS } from "@/utils/step-definitions";

export function DonationTrackPage() {
	const { id_donation = "" } = useParams();
	const { donationQuery } = useDonation(id_donation);

	const steps = donationQuery.data?.steps ?? [];

	const firstPendingOrder = STEP_DEFINITIONS.find((definition) => {
		const step = steps.find((s) => s.name === definition.name);
		return step?.status !== EnumDonationStepStatus.Done;
	})?.order;

	return (
		<Page>
			<div className="flex flex-col gap-1 pb-2">
				<h1 className="text-[24px] font-extrabold text-[#0e2a45]">
					Doação #{id_donation.slice(0, 8)}
				</h1>
				<p className="text-[15px] text-[#6b8faa]">
					Acompanhe cada etapa do processo da sua doação.
				</p>
			</div>

			<div className="flex flex-col pt-4">
				{STEP_DEFINITIONS.map((definition, index) => {
					const step = steps.find((s) => s.name === definition.name);

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
							title={definition.title}
							description={step?.description ?? definition.name}
							icon={definition.icon}
							visualStatus={visualStatus}
							isLast={index === STEP_DEFINITIONS.length - 1}
						/>
					);
				})}
			</div>
		</Page>
	);
}
