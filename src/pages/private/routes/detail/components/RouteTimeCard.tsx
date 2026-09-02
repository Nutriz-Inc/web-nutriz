import { AlertTriangle, Clock, TimerReset } from "lucide-react";
import { cn } from "@/lib/utils";
import { AVISO_ROTA_MS, LIMITE_ROTA_MS } from "../constants";
import { useRouteTimer } from "../hooks/use-route-timer";
import { formatarCronometro, formatarDuracaoCurta } from "../utils";

type Props = {
	dateStart?: string;
	dateEnd?: string;
};

export function RouteTimeCard({ dateStart, dateEnd }: Props) {
	const decorrido = useRouteTimer(dateStart, dateEnd);

	const naoIniciada = !dateStart;
	const emAndamento = Boolean(dateStart) && !dateEnd;
	const excedeu = decorrido >= LIMITE_ROTA_MS;
	const emAviso = !excedeu && decorrido >= AVISO_ROTA_MS;

	const tom = excedeu
		? "text-danger"
		: emAviso
			? "text-warning"
			: "text-blue-deep";

	const fundo = excedeu
		? "bg-danger-tint"
		: emAviso
			? "bg-warning-tint"
			: "bg-blue-tint";

	const restante = Math.max(LIMITE_ROTA_MS - decorrido, 0);

	return (
		<section className="flex w-full flex-col gap-4 rounded-2xl bg-surface p-5 shadow-soft lg:rounded-3xl lg:p-6">
			<div className="flex items-center justify-between gap-3">
				<h2 className="font-display text-xs font-bold uppercase tracking-[0.06em] text-blue-bright">
					Tempo de rota
				</h2>
				<span
					className={cn(
						"flex size-9 shrink-0 items-center justify-center rounded-full",
						fundo,
						tom,
					)}
				>
					{naoIniciada ? (
						<TimerReset className="size-[18px]" />
					) : (
						<Clock className="size-[18px]" />
					)}
				</span>
			</div>

			{naoIniciada ? (
				<div className="flex flex-col gap-1">
					<p className="font-display text-[28px] font-extrabold leading-none tracking-tight text-blue-deep lg:text-[32px]">
						6h disponíveis
					</p>
					<p className="text-[13px] text-ink-2">
						O contador começa quando a rota for iniciada.
					</p>
				</div>
			) : (
				<div className="flex flex-col gap-1">
					<p
						role="timer"
						aria-live="off"
						className={cn(
							"font-display text-[34px] font-extrabold leading-none tabular-nums tracking-tight lg:text-[40px]",
							tom,
						)}
					>
						{formatarCronometro(decorrido)}
					</p>
					<p className="text-[13px] text-ink-2">
						{emAndamento
							? excedeu
								? "Limite de 6 horas excedido"
								: `Restam ${formatarDuracaoCurta(restante)} das 6h`
							: `Duração total · limite de ${formatarDuracaoCurta(LIMITE_ROTA_MS)}`}
					</p>
				</div>
			)}

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
					style={{
						width: `${Math.min((decorrido / LIMITE_ROTA_MS) * 100, 100)}%`,
					}}
				/>
			</div>

			{(emAviso || excedeu) && (
				<p
					className={cn(
						"flex items-start gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold",
						excedeu
							? "bg-danger-tint text-danger"
							: "bg-warning-tint text-warning",
					)}
				>
					<AlertTriangle className="mt-px size-4 shrink-0" />
					{excedeu
						? "A rota passou do limite de 6 horas."
						: "A rota já passou de 5 horas. Fique atento ao limite."}
				</p>
			)}

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
