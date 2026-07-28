import type { IGetUserResponse } from "@/services/types/i-user";
import { formatCpf, formatPhoneNumber } from "@/utils/formatter";
import { InfoCard } from "./InfoCard";
import { InfoField } from "./InfoField";

type ContactInfoCardProps = {
	user: IGetUserResponse;
};

export function ContactInfoCard({ user }: ContactInfoCardProps) {
	return (
		<InfoCard title="Dados de Contato">
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<InfoField label="E-mail" value={user.email} />
				<InfoField
					label="Telefone"
					value={formatPhoneNumber(user.phone_number)}
				/>
				<InfoField label="CPF" value={formatCpf(user.cpf)} />
			</div>
		</InfoCard>
	);
}
