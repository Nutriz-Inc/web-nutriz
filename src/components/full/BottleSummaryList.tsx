import { Milk } from "lucide-react";
import type { Bottle } from "@/services/types/i-donation";
import { sumBottlesMl } from "@/utils/bottle";
import { formatMl } from "@/utils/formatter";

type Props = {
	bottles: Bottle[];
};

export function BottleSummaryList({ bottles }: Props) {
	if (bottles.length === 0) {
		return <p className="text-[13px] text-ink-3">Nenhum frasco registrado.</p>;
	}

	const total = sumBottlesMl(bottles);
	const discardedCount = bottles.filter((bottle) => bottle.discarded).length;

	return (
		<div className="flex flex-col gap-2.5">
			<div className="flex items-center gap-2.5 rounded-card-sm border border-line bg-surface px-3.5 py-3">
				<Milk className="size-4 shrink-0 text-ink-3" />
				<div className="flex flex-1 flex-col">
					<span className="text-[14px] font-semibold text-ink">
						{formatMl(total)} aproveitados
					</span>
					<span className="text-[12px] text-ink-2">
						{bottles.length} {bottles.length === 1 ? "frasco" : "frascos"}
						{discardedCount > 0 &&
							` · ${discardedCount} descartado${discardedCount === 1 ? "" : "s"}`}
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-1.5">
				{bottles.map((bottle, index) => (
					<div
						key={bottle.id_bottle}
						className="flex flex-col gap-1 rounded-card-sm border border-line bg-surface px-3.5 py-2.5"
					>
						<div className="flex items-center justify-between gap-2">
							<span className="text-[13px] font-semibold text-ink">
								Frasco {index + 1} · {formatMl(bottle.quantity_donated_ml)}
							</span>
							{bottle.discarded && (
								<span className="shrink-0 rounded-full bg-danger-tint px-2 py-0.5 text-[11px] font-bold text-danger">
									Descartado
								</span>
							)}
						</div>
						{bottle.discarded && bottle.description && (
							<p className="text-[12px] text-ink-2">{bottle.description}</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
