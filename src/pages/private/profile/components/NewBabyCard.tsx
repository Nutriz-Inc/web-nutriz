import { Trash2 } from "lucide-react";
import { FormField } from "@/components/full/FormField";
import { Button } from "@/components/ui/button";
import { ProfileSectionCard } from "./ProfileSectionCard";

export type BabyDraft = {
	key: string;
	name: string;
	birth_date: string;
};

type NewBabyCardProps = {
	draft: BabyDraft;
	onChange: (draft: BabyDraft) => void;
	onRemove: () => void;
};

export function NewBabyCard({ draft, onChange, onRemove }: NewBabyCardProps) {
	return (
		<ProfileSectionCard
			as="h3"
			tone="eva"
			label="Novo"
			title="Novo bebê"
			action={
				<Button
					variant="neutral"
					size="pill"
					type="button"
					onClick={onRemove}
					className="shrink-0"
				>
					<Trash2 className="size-4" aria-hidden="true" />
					Descartar
				</Button>
			}
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormField
					id={`novo-bebe-nome-${draft.key}`}
					label="Nome do bebê"
					value={draft.name}
					placeholder="Ex.: Alice Ribeiro"
					onChange={(value) => onChange({ ...draft, name: value })}
				/>
				<FormField
					id={`novo-bebe-nascimento-${draft.key}`}
					label="Data de nascimento"
					type="date"
					value={draft.birth_date}
					onChange={(value) => onChange({ ...draft, birth_date: value })}
				/>
			</div>

			{(!draft.name || !draft.birth_date) && (
				<p className="text-[12px] text-ink-2">
					Preencha nome e data de nascimento para que este bebê seja salvo.
				</p>
			)}
		</ProfileSectionCard>
	);
}
