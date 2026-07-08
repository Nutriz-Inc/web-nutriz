import { Baby } from "lucide-react";
import type { UserBaby } from "@/services/types/i-user";
import { formatDateBR } from "@/utils/formatter";
import { Field } from "../../../../components/full/Field";
import { AddBabyButton } from "./AddBabyButton";
import type { BabyDraft } from "./NewBabyCard";
import { NewBabyCard } from "./NewBabyCard";
import { RemoveBabyButton } from "./RemoveBabyButton";
import { SectionCard } from "./SectionCard";

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
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between px-1">
				<p className="text-[13px] font-bold uppercase text-[#00458b]">Bebês</p>
				<AddBabyButton onClick={onAddDraft} />
			</div>

			<div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
				{babies.length === 0 ? (
					<SectionCard icon={<Baby className="size-[18px]" />} title="Bebê">
						<p className="px-3 py-4 text-center text-[12px] text-[#888]">
							Nenhum bebê cadastrado ainda.
						</p>
					</SectionCard>
				) : (
					babies.map((baby) => {
						const birthDate = babyBirthDates[baby.id_user_baby] ?? "";

						return (
							<SectionCard
								key={baby.id_user_baby}
								icon={<Baby className="size-[18px]" />}
								title="Bebê"
								action={
									<RemoveBabyButton
										onConfirm={() => onRemoveBaby(baby.id_user_baby)}
										loading={removingBabyId === baby.id_user_baby}
									/>
								}
							>
								<Field
									label="Nome do Bebê"
									value={babyNames[baby.id_user_baby] ?? ""}
									onChange={(value) =>
										onChangeBabyName(baby.id_user_baby, value)
									}
								/>
								<Field
									label="Data de Nascimento"
									type="date"
									value={birthDate}
									displayValue={birthDate ? formatDateBR(birthDate) : ""}
									onChange={(value) =>
										onChangeBabyBirthDate(baby.id_user_baby, value)
									}
								/>
							</SectionCard>
						);
					})
				)}

				{drafts.map((draft) => (
					<NewBabyCard
						key={draft.key}
						draft={draft}
						onChange={onChangeDraft}
						onRemove={() => onRemoveDraft(draft.key)}
					/>
				))}
			</div>
		</div>
	);
}
