import { Search } from "lucide-react";
import { FilterChips } from "@/components/full/FilterChips";
import { PERIOD_PRESET_OPTIONS, type PeriodPreset } from "../constants";

type PeriodFilterProps = {
	preset: PeriodPreset;
	onPresetChange: (preset: PeriodPreset) => void;
	customStart: string;
	customEnd: string;
	onCustomStartChange: (value: string) => void;
	onCustomEndChange: (value: string) => void;
	onApplyCustom: () => void;
};

export function PeriodFilter({
	preset,
	onPresetChange,
	customStart,
	customEnd,
	onCustomStartChange,
	onCustomEndChange,
	onApplyCustom,
}: PeriodFilterProps) {
	return (
		<div className="flex flex-col gap-3">
			<div className="sem-barra flex gap-2 overflow-x-auto">
				<FilterChips
					options={PERIOD_PRESET_OPTIONS}
					value={preset}
					onChange={onPresetChange}
				/>
			</div>

			{preset === "custom" && (
				<form
					onSubmit={(event) => {
						event.preventDefault();
						onApplyCustom();
					}}
					className="flex flex-col gap-2.5 sm:flex-row sm:items-center"
				>
					<div className="grid grid-cols-2 gap-3 sm:flex-1">
						<label className="flex flex-col gap-1">
							<span className="text-[12px] font-medium text-ink-2">De</span>
							<input
								type="date"
								value={customStart}
								max={customEnd || undefined}
								onChange={(event) => onCustomStartChange(event.target.value)}
								className="h-[43px] rounded-card-sm border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-blue-deep"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-[12px] font-medium text-ink-2">Até</span>
							<input
								type="date"
								value={customEnd}
								min={customStart || undefined}
								onChange={(event) => onCustomEndChange(event.target.value)}
								className="h-[43px] rounded-card-sm border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-blue-deep"
							/>
						</label>
					</div>
					<button
						type="submit"
						disabled={!customStart || !customEnd}
						className="flex h-[43px] shrink-0 items-center justify-center gap-2 self-end rounded-full bg-blue-deep hover:bg-blue px-5 text-[14px] font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-50"
					>
						<Search className="size-4" />
						Aplicar filtro
					</button>
				</form>
			)}
		</div>
	);
}
