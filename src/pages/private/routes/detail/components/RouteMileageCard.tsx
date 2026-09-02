import { Gauge } from "lucide-react";

type Props = {
	mileage?: number;
	mediaPorRota?: number | null;
};

function formatarKm(valor: number): string {
	return `${valor.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} km`;
}

export function RouteMileageCard({ mileage, mediaPorRota }: Props) {
	return (
		<section className="flex w-full flex-col gap-4 rounded-2xl bg-surface p-5 shadow-soft lg:rounded-3xl lg:p-6">
			<div className="flex items-center justify-between gap-3">
				<h2 className="font-display text-xs font-bold uppercase tracking-[0.06em] text-blue-bright">
					Quilometragem
				</h2>
				<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue-deep">
					<Gauge className="size-[18px]" />
				</span>
			</div>

			<div className="flex flex-col gap-1">
				<p className="font-display text-[28px] font-extrabold leading-none tracking-tight text-blue-deep lg:text-[32px]">
					{mileage != null ? formatarKm(mileage) : "—"}
				</p>
				<p className="text-[13px] text-ink-2">
					{mileage != null
						? "Registrada na finalização da rota"
						: "Registrada quando o motorista finalizar a rota"}
				</p>
			</div>

			{mediaPorRota != null && (
				<div className="flex items-center justify-between gap-3 border-t border-line pt-3.5">
					<span className="text-[13px] text-ink-2">Média por rota</span>
					<span className="font-sans text-[14px] font-bold tabular-nums text-ink">
						{formatarKm(mediaPorRota)}
					</span>
				</div>
			)}
		</section>
	);
}
