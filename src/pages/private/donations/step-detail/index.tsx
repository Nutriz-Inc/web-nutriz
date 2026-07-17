import { Calendar, History, Info, MapPin } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DetailRow } from "@/components/full/DetailRow";
import { Status } from "@/components/full/Status";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { formatCep, formatCreatedAt } from "@/utils/formatter";
import { STEP_DEFINITIONS } from "../info/constants";
import { useDonation } from "../info/hooks/use-donation";
import { StepActionRow } from "./components/StepActionRow";
import { StepTimelineSheet } from "./components/StepTimelineSheet";
import { useStepAddress } from "./hooks";

export function DonationStepDetailPage() {
	const { id_donation = "", id_donation_step = "" } = useParams();
	const { auth } = useAuth();
	const { donationQuery } = useDonation(id_donation);
	const [timelineOpen, setTimelineOpen] = useState(false);

	const steps = donationQuery.data?.steps ?? [];
	const step = steps.find((s) => s.id_donation_step === id_donation_step);
	const definition = STEP_DEFINITIONS.find((d) => d.name === step?.name);

	const { addressQuery } = useStepAddress(step?.id_address);
	const address = addressQuery.data;
	const addressText = address
		? `${address.street}, ${address.number ?? "s/n"}${address.complement ? `, ${address.complement}` : ""} - ${address.neighborhood}, ${address.city} - ${address.state}, ${formatCep(address.zipcode)}`
		: undefined;

	const Icon = definition?.icon;

	return (
		<Page
			title={definition ? `Etapa ${definition.order} - ${definition.name}` : "Etapa"}
			hasPermission={auth?.type === EnumUserType.Common}
			loading={donationQuery.isLoading}
			backTo={`/doacao/${id_donation}`}
		>
			{!donationQuery.isLoading && !step ? (
				<div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-8 text-center shadow-[0px_8px_16px_rgba(10,38,77,0.06)]">
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
						<div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-[0px_8px_16px_rgba(10,38,77,0.06)]">
							<div className="flex size-[72px] items-center justify-center rounded-full bg-[#dbe7f6]">
								{Icon && <Icon className="size-8 text-[#00458b]" />}
							</div>
							<Status status={step.status} />
						</div>

						<div className="mt-4 rounded-2xl border border-[#e5ebf3] bg-white p-4">
							<p className="text-[13px] font-semibold text-[#0e2a45]">
								Informações da etapa
							</p>
							<div className="my-3 h-px bg-[#e5ebf3]" />

							<div className="flex flex-col gap-3">
								{step.set_date && (
									<>
										<DetailRow
											icon={<Calendar className="size-[18px] text-[#387ccd]" />}
											label="Data / Previsão"
											value={formatCreatedAt(step.set_date)}
										/>
										<div className="h-px bg-[#e5ebf3]" />
									</>
								)}

								{addressText && (
									<>
										<DetailRow
											icon={<MapPin className="size-[18px] text-[#387ccd]" />}
											label="Endereço"
											value={addressText}
										/>
										<div className="h-px bg-[#e5ebf3]" />
									</>
								)}

								<DetailRow
									icon={<Info className="size-[18px] text-[#387ccd]" />}
									label="Sobre esta etapa"
									value={step.description || definition?.description || ""}
								/>

								<div className="h-px bg-[#e5ebf3]" />

								<StepActionRow
									icon={<History className="size-[18px] text-[#387ccd]" />}
									label="Ver linha do tempo desta etapa"
									onClick={() => setTimelineOpen(true)}
								/>
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
