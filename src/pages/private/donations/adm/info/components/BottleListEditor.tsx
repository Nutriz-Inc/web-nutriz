import { Plus, Trash2 } from "lucide-react";
import type { BottleUpdateBase } from "@/services/types/i-donation";
import { emptyBottle } from "@/utils/bottle";

type Props = {
	bottles: BottleUpdateBase[];
	onChange: (next: BottleUpdateBase[]) => void;
	disabled?: boolean;
};

export function BottleListEditor({ bottles, onChange, disabled }: Props) {
	function updateBottle(index: number, patch: Partial<BottleUpdateBase>) {
		onChange(
			bottles.map((bottle, i) =>
				i === index ? { ...bottle, ...patch } : bottle,
			),
		);
	}

	function addBottle() {
		onChange([...bottles, emptyBottle()]);
	}

	function removeBottle(index: number) {
		onChange(bottles.filter((_, i) => i !== index));
	}

	return (
		<div className="flex flex-col gap-3 text-left">
			<div className="flex items-center justify-between gap-3">
				<span className="text-[12px] font-semibold text-ink-2">
					Frascos coletados
				</span>
				<button
					type="button"
					onClick={addBottle}
					disabled={disabled}
					className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-tint px-3.5 py-1.5 text-[12px] font-bold text-blue-deep transition-transform active:scale-[0.98] disabled:opacity-60"
				>
					<Plus className="size-3.5" />
					Adicionar frasco
				</button>
			</div>

			<div className="flex max-h-[300px] flex-col gap-2.5 overflow-y-auto pr-1">
				{bottles.map((bottle, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: bottles have no id before creation
						key={index}
						className="flex flex-col gap-2.5 rounded-card-sm border border-line bg-surface-2 p-3"
					>
						<div className="flex items-center justify-between">
							<span className="text-[11px] font-bold tracking-[0.6px] text-blue-deep">
								FRASCO {index + 1}
							</span>
							{bottles.length > 1 && (
								<button
									type="button"
									onClick={() => removeBottle(index)}
									disabled={disabled}
									className="text-ink-3 transition-colors hover:text-danger disabled:opacity-60"
									aria-label={`Remover frasco ${index + 1}`}
								>
									<Trash2 className="size-4" />
								</button>
							)}
						</div>

						<div className="flex flex-col gap-1.5">
							<label
								htmlFor={`bottle-ml-${index}`}
								className="text-[12px] font-semibold text-ink-2"
							>
								Quantidade doada (ml)
							</label>
							<input
								id={`bottle-ml-${index}`}
								type="number"
								min={0}
								value={
									Number.isNaN(bottle.quantity_donated_ml)
										? ""
										: bottle.quantity_donated_ml
								}
								onChange={(event) =>
									updateBottle(index, {
										quantity_donated_ml: event.target.valueAsNumber,
									})
								}
								disabled={disabled}
								placeholder="Ex: 250"
								className="rounded-card-sm border border-line bg-surface px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-3 disabled:opacity-60"
							/>
						</div>

						<label className="flex items-center gap-2 text-[13px] font-semibold text-ink-2">
							<input
								type="checkbox"
								checked={Boolean(bottle.discarded)}
								onChange={(event) =>
									updateBottle(index, {
										discarded: event.target.checked,
										...(event.target.checked ? {} : { description: "" }),
									})
								}
								disabled={disabled}
								className="size-4 accent-blue-deep"
							/>
							Frasco descartado
						</label>

						{bottle.discarded && (
							<div className="flex flex-col gap-1.5">
								<label
									htmlFor={`bottle-description-${index}`}
									className="text-[12px] font-semibold text-ink-2"
								>
									Motivo do descarte
								</label>
								<textarea
									id={`bottle-description-${index}`}
									value={bottle.description ?? ""}
									onChange={(event) =>
										updateBottle(index, { description: event.target.value })
									}
									disabled={disabled}
									rows={2}
									placeholder="Descreva o motivo do descarte"
									className="rounded-card-sm border border-line bg-surface px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-3 disabled:opacity-60"
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
