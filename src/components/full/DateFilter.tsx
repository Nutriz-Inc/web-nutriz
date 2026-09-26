import { Calendar, X } from "lucide-react";
import { maskDate } from "@/utils/formatter";

type DateFilterProps = {
	value: string;
	onChange: (value: string) => void;
	semRotulo?: boolean;
};

export function DateFilter({
	value,
	onChange,
	semRotulo = false,
}: DateFilterProps) {
	return (
		<div className="flex flex-col gap-2">
			{semRotulo ? null : (
				<span className="text-apoio font-medium text-ink-2">
					Período do Agendamento
				</span>
			)}
			<div className="flex h-10 w-full max-w-[220px] items-center gap-2.5 rounded-full border border-line bg-surface px-3.5">
				<Calendar className="size-[18px] shrink-0 text-ink-3" />
				<input
					type="text"
					inputMode="numeric"
					value={value}
					onChange={(event) => onChange(maskDate(event.target.value))}
					placeholder="DD/MM/AAAA"
					aria-label="Filtrar por data"
					className="min-h-6 min-w-0 flex-1 bg-transparent text-corpo text-ink outline-none placeholder:text-ink-3"
				/>
				{value && (
					<button
						type="button"
						onClick={() => onChange("")}
						aria-label="Limpar filtro de data"
						className="shrink-0 text-ink-3 transition-colors hover:text-ink-2"
					>
						<X className="size-4" />
					</button>
				)}
			</div>
		</div>
	);
}
