import type { IGetUserResponse } from "@/services/types/i-user";
import { formatDateBR } from "@/utils/formatter";
import { formatFullAddress } from "../utils";
import { InfoCard } from "./InfoCard";
import { InfoField } from "./InfoField";

type CollectionAddressCardProps = {
	user: IGetUserResponse;
};

export function CollectionAddressCard({ user }: CollectionAddressCardProps) {
	const address = user.addresses?.[0];

	return (
		<InfoCard title="Endereço de Coleta">
			<div className="flex flex-col gap-5">
				<InfoField
					label="Endereço completo"
					value={formatFullAddress(address)}
				/>
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<InfoField
						label="Cadastrada em"
						value={formatDateBR(user.created_at)}
					/>
				</div>
			</div>
		</InfoCard>
	);
}
