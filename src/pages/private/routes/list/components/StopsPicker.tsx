import { Check, Plus, X } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { formatDateBR } from "@/utils/formatter";
import { useDonationStepsList } from "../hooks";

type StopsPickerProps = {
	value: string[];
	onChange: (ids: string[]) => void;
};

export function StopsPicker({ value, onChange }: StopsPickerProps) {
	const { data, isLoading } = useDonationStepsList({ page: 1, page_size: 50 });
	const steps = data?.data ?? [];

	const selected = new Set(value);
	const labelById = useMemo(() => {
		const map = new Map<string, string>();
		for (const step of steps) map.set(step.id_donation_step, step.name);
		return map;
	}, [steps]);

	function add(id: string) {
		if (!selected.has(id)) onChange([...value, id]);
	}

	function remove(id: string) {
		onChange(value.filter((current) => current !== id));
	}

	return (
		<div className="flex flex-col gap-2.5 text-left">
			<span className="text-[12px] font-semibold text-ink-2">
				Paradas da rota <span className="text-ink-3">({value.length})</span>
			</span>

			{value.length > 0 && (
				<div className="flex flex-wrap gap-1.5">
					{value.map((id, index) => (
						<span
							key={id}
							className="flex items-center gap-1 rounded-full bg-blue-tint px-2.5 py-1 text-[12px] font-semibold text-blue-deep"
						>
							{index + 1}. {labelById.get(id) ?? `${id.slice(0, 8)}…`}
							<button
								type="button"
								onClick={() => remove(id)}
								aria-label="Remover parada"
							>
								<X className="size-3.5" />
							</button>
						</span>
					))}
				</div>
			)}

			<div className="flex max-h-[220px] flex-col gap-1.5 overflow-y-auto rounded-card-sm border border-line bg-surface-2 p-2">
				{isLoading ? (
					<p className="px-1 py-2 text-[13px] text-ink-3">Carregando etapas…</p>
				) : steps.length === 0 ? (
					<p className="px-1 py-2 text-[13px] text-ink-3">
						Nenhuma etapa disponível.
					</p>
				) : (
					steps.map((step) => {
						const added = selected.has(step.id_donation_step);
						const location = [step.address?.city, step.address?.neighborhood]
							.filter(Boolean)
							.join(" · ");

						return (
							<button
								key={step.id_donation_step}
								type="button"
								onClick={() =>
									added
										? remove(step.id_donation_step)
										: add(step.id_donation_step)
								}
								className={cn(
									"flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-left text-[13px] transition-colors",
									added
										? "border-blue-deep bg-blue-tint text-blue-deep"
										: "border-line bg-surface text-ink hover:bg-surface-3",
								)}
							>
								<span className="flex min-w-0 flex-col">
									<span className="truncate font-semibold">{step.name}</span>
									<span className="truncate text-[11px] text-ink-3">
										{step.set_date ? formatDateBR(step.set_date) : "sem data"}
										{location && ` · ${location}`}
									</span>
								</span>
								{added ? (
									<Check className="size-4 shrink-0" />
								) : (
									<Plus className="size-4 shrink-0 text-ink-3" />
								)}
							</button>
						);
					})
				)}
			</div>
		</div>
	);
}
