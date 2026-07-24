import { Calendar, X } from "lucide-react";
import { maskDate } from "@/utils/formatter";

type DateFilterProps = {
	value: string;
	onChange: (value: string) => void;
};

export function DateFilter({ value, onChange }: DateFilterProps) {
	return (
		<div className="flex flex-col gap-2">
			<span className="text-[13px] font-medium text-[#6b7280]">
				Período do Agendamento
			</span>
			<div className="flex h-[46px] w-full max-w-[220px] items-center gap-2.5 rounded-xl border border-[#e2e8f0] bg-white px-3.5">
				<Calendar className="size-[18px] shrink-0 text-[#94a3b8]" />
				<input
					type="text"
					inputMode="numeric"
					value={value}
					onChange={(event) => onChange(maskDate(event.target.value))}
					placeholder="__/__/____"
					className="min-w-0 flex-1 bg-transparent text-[15px] text-[#1f2a37] outline-none placeholder:text-[#c0c7d1]"
				/>
				{value && (
					<button
						type="button"
						onClick={() => onChange("")}
						aria-label="Limpar filtro de data"
						className="shrink-0 text-[#94a3b8] transition-colors hover:text-[#6b7280]"
					>
						<X className="size-4" />
					</button>
				)}
			</div>
		</div>
	);
}
