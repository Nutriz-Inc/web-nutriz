import type { IGetUserResponse } from "@/services/types/i-user";
import { formatDateBR } from "@/utils/formatter";
import { USER_TYPE_DISPLAY } from "../constants";
import { InfoCard } from "./InfoCard";
import { InfoField } from "./InfoField";

type AccessInfoCardProps = {
	user: IGetUserResponse;
};

export function AccessInfoCard({ user }: AccessInfoCardProps) {
	return (
		<InfoCard title="Dados de Acesso">
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<InfoField label="Perfil" value={USER_TYPE_DISPLAY[user.type].label} />
				<InfoField
					label="Status"
					value={user.removed_at ? "Inativo" : "Ativo"}
				/>
				<InfoField
					label="Cadastrado em"
					value={formatDateBR(user.created_at)}
				/>
			</div>
		</InfoCard>
	);
}
