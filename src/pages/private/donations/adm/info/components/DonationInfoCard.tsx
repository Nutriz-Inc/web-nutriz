import { Calendar, IdCardLanyard } from "lucide-react";
import { DonationStatusBadge } from "@/components/full/DonationStatusBadge";
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
		</div>
	);
}
