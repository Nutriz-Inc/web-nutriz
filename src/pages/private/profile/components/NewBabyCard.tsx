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
		<div className="overflow-hidden rounded-2xl border-[1.5px] border-[#f25ca2]/35 bg-white/8">
			<div className="flex items-center justify-between border-b border-[#387ccd]/15 px-3 py-3">
				<div className="flex items-center gap-2">
					<span className="rounded-md bg-[#fbeaf0] px-2 py-1 text-[13px] font-bold text-[#f25ca2]">
						NOVO
					</span>
					<span className="text-[13px] font-bold text-[#1a3a5c]">BEBÊ</span>
				</div>
				<button
					type="button"
					onClick={onRemove}
					className="flex items-center gap-1.5 rounded-full border border-[#df5a7a]/30 bg-[#fbe8ec] px-3 py-1.5 text-[12px] font-semibold text-[#df5a7a]"
				>
					Remover
					<Trash2 className="size-3.5" />
				</button>
			</div>

			<div className="flex flex-col gap-1.5 border-b border-[#387ccd]/10 px-3 py-3">
				<p className="text-[12px] font-bold text-[#1e4976]">Nome do bebê</p>
				<input
					value={draft.name}
					onChange={(e) => onChange({ ...draft, name: e.target.value })}
					placeholder="Nome completo do bebê..."
					className="h-8 w-full rounded-lg border-[1.5px] border-[#387ccd]/80 bg-white px-3 text-[14px] text-[#1a1d23] outline-none placeholder:text-[#888]/35"
				/>
			</div>

			<div className="flex flex-col gap-1.5 px-3 py-3">
				<p className="text-[12px] font-bold text-[#1e4976]">
					Data de nascimento
				</p>
				<input
					type="date"
					value={draft.birth_date}
					onChange={(e) => onChange({ ...draft, birth_date: e.target.value })}
					className="h-[30px] w-full rounded-lg bg-white px-3 text-[14px] text-[#1a1d23] outline-none"
				/>
			</div>
		</div>
	);
}
