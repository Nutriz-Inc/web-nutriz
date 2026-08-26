import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { formatCep, formatCreatedAt } from "@/utils/formatter";
import { STEP_DEFINITIONS } from "../info/constants";
import { useDonation } from "../info/hooks/use-donation";
import { StepAboutCard } from "./components/StepAboutCard";
import { StepHeroCard } from "./components/StepHeroCard";
import { StepInfoRow } from "./components/StepInfoRow";
import { StepNurseCard } from "./components/StepNurseCard";
import { StepTimelineSheet } from "./components/StepTimelineSheet";
import { useLatestStepJob, useStepAddress } from "./hooks";

export function DonationStepDetailPage() {
	const { id_donation = "", id_donation_step = "" } = useParams();
	const { auth } = useAuth();
	const { donationQuery } = useDonation(id_donation);
	const [timelineOpen, setTimelineOpen] = useState(false);

	const steps = donationQuery.data?.steps ?? [];
	const step = steps.find((s) => s.id_donation_step === id_donation_step);
	const definition = STEP_DEFINITIONS.find((d) => d.name === step?.name)!;

	const { addressQuery } = useStepAddress(step?.id_address);
	const address = addressQuery.data;

	const { latestJob } = useLatestStepJob(step?.id_donation_step);
	const addressText = address
		? `${address.street}, ${address.number ?? "s/n"}${address.complement ? `, ${address.complement}` : ""} - ${address.neighborhood}, ${address.city} - ${address.state}, ${formatCep(address.zipcode)}`
		: undefined;

	const Icon = definition?.icon;

	return (
		<Page
			hasPermission={auth?.type === EnumUserType.Common}
			loading={donationQuery.isLoading}
			backTo={`/doacao/${id_donation}`}
		>
			{!donationQuery.isLoading && !step ? (
				<div className="flex flex-col items-center gap-2 rounded-2xl bg-surface p-8 text-center shadow-soft lg:mx-auto lg:w-full lg:max-w-[640px]">
					<p className="text-[15px] font-semibold text-ink">
						Etapa ainda não iniciada
					</p>
					<p className="text-[13px] text-ink-2">
						Assim que esta etapa começar, os detalhes aparecerão aqui.
					</p>
				</div>
			) : (
				step && (
					<>
						<div className="flex flex-col gap-5 lg:mx-auto lg:w-full lg:max-w-[640px] lg:gap-6">
							<StepHeroCard
								icon={Icon}
								title={
									definition
										? `Etapa ${definition.order} — ${definition.name}`
										: "Etapa"
								}
								status={step.status}
								onViewTimeline={() => setTimelineOpen(true)}
								description={definition.description}
							/>

							{(step.set_date || addressText) && (
								<div className="flex flex-col gap-4 rounded-card-sm border border-line bg-surface px-[18px] py-5 shadow-soft">
									<p className="text-[14px] font-bold text-ink">
										Informações da etapa
									</p>

									{step.set_date && (
										<StepInfoRow
											icon={Calendar}
											label="Data / Previsão"
											value={formatCreatedAt(step.set_date)}
										/>
									)}

									{step.set_date && addressText && (
										<div className="h-px bg-blue-tint" />
									)}

									{addressText && (
										<StepInfoRow
											icon={MapPin}
											label="Endereço"
											value={addressText}
										/>
									)}
								</div>
							)}

							{latestJob?.user_nurse_name && (
								<StepNurseCard
									nurseName={latestJob.user_nurse_name}
									status={latestJob.status}
								/>
							)}

							<StepAboutCard text={step.description} />
						</div>

						<StepTimelineSheet
							open={timelineOpen}
							onOpenChange={setTimelineOpen}
							idDonationStep={id_donation_step}
							stepOrder={definition?.order}
							stepTitle={definition?.name}
						/>
					</>
				)
			)}
		</Page>
	);
}
