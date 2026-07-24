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
import { StepTimelineSheet } from "./components/StepTimelineSheet";
import { useStepAddress } from "./hooks";

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
				<div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-8 text-center shadow-[0px_8px_16px_rgba(10,38,77,0.06)] lg:mx-auto lg:w-full lg:max-w-[640px]">
					<p className="text-[15px] font-semibold text-[#0e2a45]">
						Etapa ainda não iniciada
					</p>
					<p className="text-[13px] text-[#6b8faa]">
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
								<div className="flex flex-col gap-4 rounded-2xl border border-[#e3eaf2] bg-white px-[18px] py-5 shadow-[0px_6px_10px_rgba(15,26,51,0.06)]">
									<p className="text-[14px] font-bold text-[#1b2a41]">
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
										<div className="h-px bg-[#e3eaf2]" />
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
