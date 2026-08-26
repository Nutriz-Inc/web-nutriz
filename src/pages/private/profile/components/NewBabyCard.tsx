import { Trash2 } from "lucide-react";

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
		<div className="overflow-hidden rounded-2xl border-[1.5px] border-eva/35 bg-white/8">
			<div className="flex items-center justify-between border-b border-blue-bright/15 px-3 py-3">
				<div className="flex items-center gap-2">
					<span className="rounded-md bg-eva-tint px-2 py-1 text-[13px] font-bold text-eva-deep">
						NOVO
					</span>
					<span className="text-[13px] font-bold text-blue-deep">BEBÊ</span>
				</div>
				<button
					type="button"
					onClick={onRemove}
					className="flex items-center gap-1.5 rounded-full border border-eva/30 bg-eva-tint px-3 py-1.5 text-[12px] font-semibold text-eva-deep"
				>
					Remover
					<Trash2 className="size-3.5" />
				</button>
			</div>

			<div className="flex flex-col gap-1.5 border-b border-blue-bright/10 px-3 py-3">
				<p className="text-[12px] font-bold text-blue-deep">Nome do bebê</p>
				<input
					value={draft.name}
					onChange={(e) => onChange({ ...draft, name: e.target.value })}
					placeholder="Nome completo do bebê..."
					className="h-8 w-full rounded-lg border-[1.5px] border-blue-bright/80 bg-white px-3 text-[14px] text-ink outline-none placeholder:text-ink-3/35"
				/>
			</div>

			<div className="flex flex-col gap-1.5 px-3 py-3">
				<p className="text-[12px] font-bold text-blue-deep">
					Data de nascimento
				</p>
				<input
					type="date"
					value={draft.birth_date}
					onChange={(e) => onChange({ ...draft, birth_date: e.target.value })}
					className="h-[30px] w-full rounded-lg bg-white px-3 text-[14px] text-ink outline-none"
				/>
			</div>
		</div>
	);
}
