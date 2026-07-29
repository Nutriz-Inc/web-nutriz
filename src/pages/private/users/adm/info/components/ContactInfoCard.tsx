import type { IGetUserResponse } from "@/services/types/i-user";
import { EnumUserType } from "@/services/types/i-user";
import { formatCpf, formatDateBR, formatPhoneNumber } from "@/utils/formatter";
import { InfoCard } from "./InfoCard";
import { InfoField } from "./InfoField";
import { RemovedByField } from "./RemovedByField";

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
				<InfoField
					label="Data de nascimento"
					value={user.birth_date ? formatDateBR(user.birth_date) : "—"}
				/>
				{user.internal_identifier && (
					<InfoField label="Identificador" value={user.internal_identifier} />
				)}
				{user.type !== EnumUserType.Common && user.removed_by && (
					<RemovedByField idUser={user.removed_by} />
				)}
			</div>
		</InfoCard>
	);
}
