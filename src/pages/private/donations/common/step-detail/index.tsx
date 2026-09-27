import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { formatCep, formatCreatedAt } from "@/utils/formatter";
import { getStepDefinitions } from "../info/constants";
import { useDonation } from "../info/hooks/use-donation";
import { EsqueletoDaEtapa } from "./components/EsqueletoDaEtapa";
import { StepAboutCard } from "./components/StepAboutCard";
import { StepHelpCard } from "./components/StepHelpCard";
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
	const definicoes = getStepDefinitions(donationQuery.data?.is_recurrent);
	const definition = definicoes.find((d) => d.name === step?.name);

	const { addressQuery } = useStepAddress(step?.id_address);
	const address = addressQuery.data;

	const { latestJob } = useLatestStepJob(step?.id_donation_step);
	const enderecoRua = address
		? `${address.street}, ${address.number ?? "s/n"}${address.complement ? `, ${address.complement}` : ""}`
		: undefined;
	const enderecoBairro = address
		? `${address.neighborhood}, ${address.city} - ${address.state} · CEP ${formatCep(address.zipcode)}`
		: undefined;

	const Icon = definition?.icon;

	return (
		<Page
			hasPermission={auth?.type === EnumUserType.Common}
			loading={donationQuery.isLoading}
			skeleton={<EsqueletoDaEtapa />}
			backTo={`/doacao/${id_donation}`}
		>
			{!donationQuery.isLoading && !step ? (
				<div className="flex flex-col items-center gap-2 rounded-card-sm border border-line bg-surface p-8 text-center lg:mx-auto lg:w-full lg:max-w-[640px]">
					<p className="text-corpo font-semibold text-ink">
						Etapa ainda não iniciada
					</p>
					<p className="text-apoio text-ink-2">
						Assim que esta etapa começar, os detalhes aparecerão aqui.
					</p>
				</div>
			) : (
				step && (
					<>
						<div className="cascata flex flex-col gap-5 lg:mx-auto lg:w-full lg:max-w-[1200px] lg:gap-6">
							<StepHeroCard
								icon={Icon}
								eyebrow={
									definition
										? `Etapa ${definition.order} de ${definicoes.length}`
										: "Etapa"
								}
								title={definition?.name ?? "Etapa"}
								status={step.status}
								order={definition?.order}
								total={definicoes.length}
								onViewTimeline={() => setTimelineOpen(true)}
								description={definition?.description ?? ""}
							/>

							<div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-6">
								<div className="flex flex-col gap-8">
									{(step.set_date || enderecoRua) && (
										<section className="flex flex-col gap-5 rounded-card border border-line bg-surface p-6 shadow-soft sm:p-7">
											<p className="text-destaque font-bold text-ink">
												Informações da etapa
											</p>

											{step.set_date && (
												<StepInfoRow
													icon={Calendar}
													label="Data / Previsão"
													value={formatCreatedAt(step.set_date)}
												/>
											)}

											{step.set_date && enderecoRua && (
												<div className="h-px bg-line" />
											)}

											{enderecoRua && (
												<StepInfoRow
													icon={MapPin}
													label="Endereço"
													value={enderecoRua}
													detail={enderecoBairro}
												/>
											)}
										</section>
									)}

									{step.description ? (
										<StepAboutCard text={step.description} />
									) : null}
								</div>

								<div className="flex flex-col gap-5 lg:sticky lg:top-24">
									{latestJob?.user_nurse_name && (
										<StepNurseCard
											nurseName={latestJob.user_nurse_name}
											status={latestJob.status}
										/>
									)}

									<StepHelpCard />
								</div>
							</div>
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
