import { FormField } from "@/components/full/FormField";
import type { UserBaby } from "@/services/types/i-user";
import { ProfileSectionCard } from "./ProfileSectionCard";
import { RemoveBabyButton } from "./RemoveBabyButton";

type BabyCardProps = {
	baby: UserBaby;
	name: string;
	onChangeName: (name: string) => void;
	birthDate: string;
	onChangeBirthDate: (birthDate: string) => void;
	onRemove: () => void;
	removing?: boolean;
};

export function BabyCard({
	baby,
	name,
	onChangeName,
	birthDate,
	onChangeBirthDate,
	onRemove,
	removing,
}: BabyCardProps) {
	return (
		<ProfileSectionCard
			as="h3"
			label="Bebê"
			title={name || "Bebê sem nome"}
			action={<RemoveBabyButton onConfirm={onRemove} loading={removing} />}
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormField
					id={`bebe-nome-${baby.id_user_baby}`}
					label="Nome do bebê"
					value={name}
					placeholder="Nome completo do bebê"
					onChange={onChangeName}
				/>
				<FormField
					id={`bebe-nascimento-${baby.id_user_baby}`}
					label="Data de nascimento"
					type="date"
					value={birthDate}
					onChange={onChangeBirthDate}
				/>
			</div>
		</ProfileSectionCard>
	);
}
