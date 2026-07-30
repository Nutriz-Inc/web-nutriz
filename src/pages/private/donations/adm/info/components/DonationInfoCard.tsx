import { Calendar, IdCardLanyard, Milk } from "lucide-react";
import { DonationStatusBadge } from "@/components/full/DonationStatusBadge";
import { StarRating } from "@/components/full/StarRating";
import {
	EnumDonationStepStatus,
	type IGetDonationResponse,
} from "@/services/types/i-donation";
import { formatDateBR } from "@/utils/formatter";
import { DonorInfoRow } from "./DonorInfoRow";

type Props = {
	donation: IGetDonationResponse;
};

export function DonationInfoCard({ donation }: Props) {
	const hasError = donation.steps.some(
		(step) => step.status === EnumDonationStepStatus.Failed,
	);

	return (
		<div className="flex flex-col gap-4 rounded-2xl border border-[#e7eaef] bg-white p-6">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between gap-2">
					<p className="text-[17px] font-bold text-[#1f2a37]">
						Dados da doação
					</p>
					<DonationStatusBadge
						isActive={donation.is_active}
						hasError={hasError}
					/>
				</div>
				<p className="text-[12px] text-[#6b7280]">
					Informações de cadastro — somente leitura
				</p>
			</div>

			<DonorInfoRow
				icon={IdCardLanyard}
				label="ID da doação"
				value={donation?.id_donation || "—"}
				isCopyable={true}
			/>

			<DonorInfoRow
				icon={Calendar}
				label="Data de criação da doação"
				value={formatDateBR(donation.created_at)}
			/>

			{donation.quantity_donated != null && (
				<DonorInfoRow
					icon={Milk}
					label="Quantidade doada"
					value={`${donation.quantity_donated} ml`}
				/>
			)}

			{(donation.user_feedback || donation.score_feedback != null) && (
				<div className="flex flex-col gap-1.5">
					<span className="text-[12px] font-semibold text-[#6b7280]">
						Feedback da doadora
					</span>
					<div className="flex flex-col gap-2 rounded-[10px] border border-[#e7eaef] bg-white px-3.5 py-3">
						{donation.score_feedback != null && (
							<StarRating value={donation.score_feedback} size="sm" />
						)}
						{donation.user_feedback && (
							<p className="text-[14px] text-[#1f2a37]">
								{donation.user_feedback}
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
