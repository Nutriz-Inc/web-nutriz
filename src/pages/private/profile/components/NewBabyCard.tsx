import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type BabyGender = "masculino" | "feminino" | "outro";

export type BabyDraft = {
	key: string;
	name: string;
	birth_date: string;
	gender: BabyGender | null;
};

const GENDER_OPTIONS: { key: BabyGender; label: string }[] = [
	{ key: "masculino", label: "Masculino" },
	{ key: "feminino", label: "Feminino" },
	{ key: "outro", label: "Outro" },
];

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

			<div className="flex flex-col gap-1.5 border-b border-[#387ccd]/10 px-3 py-3">
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

			<div className="flex flex-col gap-2 px-3 py-3">
				<p className="text-[12px] font-bold text-[#1e4976]">Sexo</p>
				<div className="flex gap-2">
					{GENDER_OPTIONS.map((option) => {
						const active = draft.gender === option.key;

						return (
							<button
								key={option.key}
								type="button"
								onClick={() => onChange({ ...draft, gender: option.key })}
								className={cn(
									"rounded-full border px-4 py-1.5 text-[11px] font-medium text-[#387ccd] transition-colors",
									active
										? "border-[#387ccd]/50 bg-[#387ccd]/25"
										: "border-[#387ccd]/20 bg-[#387ccd]/12",
								)}
							>
								{option.label}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
