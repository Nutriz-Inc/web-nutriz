import { Trash2 } from "lucide-react";
import { FormField } from "@/components/full/FormField";
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
				<button
					type="button"
					onClick={onRemove}
					className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-line px-4 text-[13px] font-semibold text-ink-2 outline-none transition-colors hover:bg-surface-3 focus-visible:ring-3 focus-visible:ring-blue-bright/50 motion-reduce:transition-none"
				>
					<Trash2 className="size-4" aria-hidden="true" />
					Descartar
				</button>
			}
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormField
					id={`novo-bebe-nome-${draft.key}`}
					label="Nome do bebê"
					value={draft.name}
					placeholder="Nome completo do bebê"
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
