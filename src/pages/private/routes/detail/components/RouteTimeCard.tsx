import { AlertTriangle, Gauge } from "lucide-react";
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

export function RouteTimeCard({
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

	const restante = Math.max(LIMITE_ROTA_MS - decorrido, 0);
	const preenchido = naoIniciada
		? 0
		: Math.min((decorrido / LIMITE_ROTA_MS) * 100, 100);

	const tom = excedeu
		? "text-danger"
		: emAviso
			? "text-warning"
			: "text-blue-deep";

	return (
		<div className="flex h-full flex-col">
			<div className="flex flex-col gap-2 p-5">
				<p
					role="timer"
					aria-live="off"
					className={cn(
						"font-display text-[38px] font-extrabold leading-none tabular-nums tracking-tight",
						tom,
					)}
				>
					{naoIniciada ? "6h" : formatarCronometro(decorrido)}
				</p>

				<p className="text-[13px] text-ink-2">
					{naoIniciada
						? "disponíveis para a rota"
						: emAndamento
							? excedeu
								? "limite de 6 horas excedido"
								: `restam ${formatarDuracaoCurta(restante)} das 6h`
							: "duração total da rota"}
				</p>

				<div
					aria-hidden="true"
					className="mt-1 h-2 w-full overflow-hidden rounded-full bg-ink/10"
				>
					<div
						className={cn(
							"h-full rounded-full transition-[width] duration-700 ease-out",
							excedeu
								? "bg-danger"
								: emAviso
									? "bg-warning"
									: "bg-blue-bright-fill",
						)}
						style={{ width: `${preenchido}%` }}
					/>
				</div>

				{(excedeu || emAviso) && (
					<p
						className={cn(
							"flex items-start gap-2 text-[12px] font-semibold",
							excedeu ? "text-danger" : "text-warning",
						)}
					>
						<AlertTriangle className="mt-px size-4 shrink-0" />
						{excedeu
							? "A rota passou do limite de 6 horas."
							: "Passou de 5 horas desde o início."}
					</p>
				)}
			</div>

			<div className="mt-auto flex items-center justify-between gap-3 border-t border-line px-5 py-4">
				<span className="flex items-center gap-2 text-[13px] text-ink-2">
					<Gauge className="size-4 shrink-0" />
					Quilometragem
				</span>

				<span className="text-right text-[14px] font-semibold tabular-nums text-ink">
					{mileage != null ? (
						`${formatarKm(mileage)} km`
					) : mediaPorRota != null ? (
						<span className="text-[12px] font-normal text-ink-2">
							média de {formatarKm(mediaPorRota)} km
						</span>
					) : (
						"—"
					)}
				</span>
			</div>

			<span aria-live="polite" className="sr-only">
				{excedeu
					? "Limite de seis horas de rota excedido."
					: emAviso
						? "Cinco horas de rota decorridas."
						: ""}
			</span>
		</div>
	);
}
