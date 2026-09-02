import { AlertTriangle, Gauge, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { AVISO_ROTA_MS, LIMITE_ROTA_MS } from "../constants";
import { useRouteTimer } from "../hooks/use-route-timer";
import { formatarCronometro, formatarDuracaoCurta } from "../utils";

type Props = {
	dateStart?: string;
	dateEnd?: string;
	mileage?: number;
	mediaPorRota?: number | null;
};

function formatarKm(valor: number): string {
	return valor.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

export function RouteProgressCard({
	dateStart,
	dateEnd,
	mileage,
	mediaPorRota,
}: Props) {
	const decorrido = useRouteTimer(dateStart, dateEnd);

	const naoIniciada = !dateStart;
	const emAndamento = Boolean(dateStart) && !dateEnd;
	const excedeu = !naoIniciada && decorrido >= LIMITE_ROTA_MS;
	const emAviso = !naoIniciada && !excedeu && decorrido >= AVISO_ROTA_MS;

	const tomDoTempo = excedeu
		? "text-danger"
		: emAviso
			? "text-warning"
			: "text-blue-deep";

	const restante = Math.max(LIMITE_ROTA_MS - decorrido, 0);
	const preenchido = naoIniciada
		? 0
		: Math.min((decorrido / LIMITE_ROTA_MS) * 100, 100);

	return (
		<section className="flex w-full flex-col rounded-card-sm border border-line bg-surface shadow-soft">
			<div className="grid grid-cols-2 divide-x divide-line">
				<div className="flex flex-col gap-2 p-5">
					<span className="flex items-center gap-2 text-[13px] text-ink-2">
						<Timer className="size-4 shrink-0" />
						Tempo de rota
					</span>

					{naoIniciada ? (
						<p className="font-display text-[22px] font-extrabold leading-none tracking-tight text-blue-deep">
							6h
						</p>
					) : (
						<p
							role="timer"
							aria-live="off"
							className={cn(
								"font-display text-[26px] font-extrabold leading-none tabular-nums tracking-tight",
								tomDoTempo,
							)}
						>
							{formatarCronometro(decorrido)}
						</p>
					)}

					<span className="text-[12px] text-ink-2">
						{naoIniciada
							? "disponíveis para a rota"
							: emAndamento
								? excedeu
									? "limite de 6h excedido"
									: `restam ${formatarDuracaoCurta(restante)}`
								: "duração total"}
					</span>
				</div>

				<div className="flex flex-col gap-2 p-5">
					<span className="flex items-center gap-2 text-[13px] text-ink-2">
						<Gauge className="size-4 shrink-0" />
						Quilometragem
					</span>

					<p className="font-display text-[26px] font-extrabold leading-none tabular-nums tracking-tight text-blue-deep">
						{mileage != null ? formatarKm(mileage) : "—"}
						{mileage != null && (
							<span className="ml-1 text-[15px] font-bold">km</span>
						)}
					</p>

					<span className="text-[12px] text-ink-2">
						{mileage != null
							? "registrada na finalização"
							: mediaPorRota != null
								? `média de ${formatarKm(mediaPorRota)} km por rota`
								: "registrada ao finalizar"}
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-2 border-t border-line px-5 py-4">
				<div
					aria-hidden="true"
					className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10"
				>
					<div
						className={cn(
							"h-full rounded-full transition-[width] duration-700 ease-out",
							excedeu
								? "bg-danger"
								: emAviso
									? "bg-warning"
									: "bg-gradient-to-r from-blue-bright to-mint",
						)}
						style={{ width: `${preenchido}%` }}
					/>
				</div>

				{excedeu || emAviso ? (
					<p
						className={cn(
							"flex items-start gap-2 text-[12px] font-semibold",
							excedeu ? "text-danger" : "text-warning",
						)}
					>
						<AlertTriangle className="mt-px size-4 shrink-0" />
						{excedeu
							? "A rota passou do limite de 6 horas da cadeia fria."
							: "Passou de 5 horas. Fique atento ao limite de 6h."}
					</p>
				) : (
					<p className="text-[12px] text-ink-2">
						Limite de 6 horas por rota (cadeia fria).
					</p>
				)}
			</div>

			<span aria-live="polite" className="sr-only">
				{excedeu
					? "Limite de seis horas de rota excedido."
					: emAviso
						? "Cinco horas de rota decorridas."
						: ""}
			</span>
		</section>
	);
}
