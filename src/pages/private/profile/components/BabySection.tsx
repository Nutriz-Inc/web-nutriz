import bebeNaoCadastrado from "@/assets/illustrations/bebe-nao-cadastrado.svg";
import { EmptyState } from "@/components/full/EmptyState";
import { Reveal } from "@/components/full/Reveal";
import { SectionHeading } from "@/components/full/SectionHeading";
import type { UserBaby } from "@/services/types/i-user";
import { AddBabyButton } from "./AddBabyButton";
import { BabyCard } from "./BabyCard";
import type { BabyDraft } from "./NewBabyCard";
import { NewBabyCard } from "./NewBabyCard";

type BabySectionProps = {
	babies: UserBaby[];
	babyNames: Record<string, string>;
	onChangeBabyName: (id_user_baby: string, name: string) => void;
	babyBirthDates: Record<string, string>;
	onChangeBabyBirthDate: (id_user_baby: string, birthDate: string) => void;
	onRemoveBaby: (id_user_baby: string) => void;
	removingBabyId?: string;
	drafts: BabyDraft[];
	onAddDraft: () => void;
	onChangeDraft: (draft: BabyDraft) => void;
	onRemoveDraft: (key: string) => void;
};

export function BabySection({
	babies,
	babyNames,
	onChangeBabyName,
	babyBirthDates,
	onChangeBabyBirthDate,
	onRemoveBaby,
	removingBabyId,
	drafts,
	onAddDraft,
	onChangeDraft,
	onRemoveDraft,
}: BabySectionProps) {
	const isEmpty = babies.length === 0 && drafts.length === 0;

	return (
		<div className="flex flex-col gap-5">
			<SectionHeading
				label="Cadastro"
				title="Seus bebês"
				actionSlot={<AddBabyButton onClick={onAddDraft} />}
			/>

			{isEmpty ? (
				<Reveal>
					<div className="rounded-card-sm border border-line bg-surface shadow-soft">
						<EmptyState
							illustration={bebeNaoCadastrado}
							title="Nenhum bebê cadastrado ainda"
							description="Cadastre para a EVA personalizar as orientações."
							action={
								<AddBabyButton onClick={onAddDraft} label="Cadastrar bebê" />
							}
						/>
					</div>
				</Reveal>
			) : (
				<div className="grid gap-5 lg:grid-cols-2 lg:items-start">
					{babies.map((baby, index) => (
						<Reveal key={baby.id_user_baby} delay={index * 0.05}>
							<BabyCard
								baby={baby}
								name={babyNames[baby.id_user_baby] ?? ""}
								onChangeName={(name) =>
									onChangeBabyName(baby.id_user_baby, name)
								}
								birthDate={babyBirthDates[baby.id_user_baby] ?? ""}
								onChangeBirthDate={(birthDate) =>
									onChangeBabyBirthDate(baby.id_user_baby, birthDate)
								}
								onRemove={() => onRemoveBaby(baby.id_user_baby)}
								removing={removingBabyId === baby.id_user_baby}
							/>
						</Reveal>
					))}

					{drafts.map((draft, index) => (
						<Reveal key={draft.key} delay={(babies.length + index) * 0.05}>
							<NewBabyCard
								draft={draft}
								onChange={onChangeDraft}
								onRemove={() => onRemoveDraft(draft.key)}
							/>
						</Reveal>
					))}
				</div>
			)}
		</div>
	);
}
