import { Baby } from "lucide-react";
import type { UserBaby } from "@/services/types/i-user";
import { AddBabyButton } from "./AddBabyButton";
import { EditableField } from "./EditableField";
import { LockedField } from "./LockedField";
import { type BabyDraft, NewBabyCard } from "./NewBabyCard";
import { SectionCard } from "./SectionCard";

type BabySectionProps = {
	babies: UserBaby[];
	babyNames: Record<string, string>;
	onChangeBabyName: (id_user_baby: string, name: string) => void;
	drafts: BabyDraft[];
	onAddDraft: () => void;
	onChangeDraft: (draft: BabyDraft) => void;
	onRemoveDraft: (key: string) => void;
};

export function BabySection({
	babies,
	babyNames,
	onChangeBabyName,
	drafts,
	onAddDraft,
	onChangeDraft,
	onRemoveDraft,
}: BabySectionProps) {
	return (
		<div className="flex flex-col gap-4">
			{babies.length === 0 ? (
				<SectionCard
					icon={<Baby className="size-[18px]" />}
					title="Bebê"
					action={<AddBabyButton onClick={onAddDraft} />}
				>
					<p className="px-3 py-4 text-center text-[12px] text-[#888]">
						Nenhum bebê cadastrado ainda.
					</p>
				</SectionCard>
			) : (
				babies.map((baby, index) => (
					<SectionCard
						key={baby.id_user_baby}
						icon={<Baby className="size-[18px]" />}
						title="Bebê"
						action={
							index === 0 ? <AddBabyButton onClick={onAddDraft} /> : undefined
						}
					>
						<EditableField
							label="Nome do Bebê"
							value={babyNames[baby.id_user_baby] ?? ""}
							onChange={(value) => onChangeBabyName(baby.id_user_baby, value)}
						/>
						<LockedField
							label="Data de Nascimento"
							value={new Date(baby.birth_date).toLocaleDateString("pt-BR")}
						/>
					</SectionCard>
				))
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
	);
}
