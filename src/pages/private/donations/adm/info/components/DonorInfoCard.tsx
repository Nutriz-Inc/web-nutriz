import { CreditCard, IdCardLanyard, Mail, Phone, User } from "lucide-react";
import type { User as UserEntity } from "@/services/types/i-user";
import { formatCpf, formatPhoneNumber } from "@/utils/formatter";
import { DonorInfoRow } from "./DonorInfoRow";

type Props = {
	donor?: UserEntity;
};

export function DonorInfoCard({ donor }: Props) {
	return (
		<div className="flex flex-col gap-4 rounded-2xl border border-[#e7eaef] bg-white p-6">
			<div className="flex flex-col gap-1">
				<p className="text-[17px] font-bold text-[#1f2a37]">Dados da doadora</p>
				<p className="text-[12px] text-[#6b7280]">
					Informações de cadastro — somente leitura
				</p>
			</div>

			<DonorInfoRow
				icon={IdCardLanyard}
				label="ID da doadora"
				value={donor?.id_user || "—"}
				isCopyable={true}
			/>

			<DonorInfoRow
				icon={User}
				label="Nome da doadora"
				value={donor?.name ?? "—"}
			/>
			<DonorInfoRow
				icon={CreditCard}
				label="CPF da doadora"
				value={donor ? formatCpf(donor.cpf) : "—"}
			/>
			<DonorInfoRow
				icon={Phone}
				label="Telefone da doadora"
				value={donor ? formatPhoneNumber(donor.phone_number) : "—"}
			/>
			<DonorInfoRow
				icon={Mail}
				label="Email da doadora"
				value={donor?.email ?? "—"}
			/>
		</div>
	);
}
