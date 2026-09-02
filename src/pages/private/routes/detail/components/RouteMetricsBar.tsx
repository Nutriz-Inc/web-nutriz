import { AlertTriangle, Gauge, MapPin, Timer, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { DataGrid } from "@/components/full/DataGrid";
import { cn } from "@/lib/utils";
import { AVISO_ROTA_MS, LIMITE_ROTA_MS } from "../constants";
import { useRouteTimer } from "../hooks/use-route-timer";
import { formatarCronometro, formatarDuracaoCurta } from "../utils";

type Props = {
	dateStart?: string;
	dateEnd?: string;
	mileage?: number;
	mediaPorRota?: number | null;
	totalParadas: number;
	paradasVisitadas: number;
};

function formatarKm(valor: number): string {
	return valor.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

export function RouteMetricsBar({
	dateStart,
	dateEnd,
	mileage,
	mediaPorRota,
	totalParadas,
	paradasVisitadas,
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

	const mediaPorParada =
		paradasVisitadas > 0 && decorrido > 0 ? decorrido / paradasVisitadas : null;

	const tomDoTempo = excedeu
		? "text-danger"
		: emAviso
			? "text-warning"
			: "text-blue-deep";

	const metricas: {
		chave: string;
		icone: ReactNode;
		rotulo: string;
		valor: ReactNode;
		apoio: string;
		tom?: string;
	}[] = [
		{
			chave: "tempo",
			icone: <Timer className="size-4 shrink-0" />,
			rotulo: "Tempo de rota",
			valor: naoIniciada ? "6h" : formatarCronometro(decorrido),
			apoio: naoIniciada
				? "disponíveis para a rota"
				: emAndamento
					? excedeu
						? "limite de 6h excedido"
						: `restam ${formatarDuracaoCurta(restante)}`
					: "duração total",
			tom: tomDoTempo,
		},
		{
			chave: "paradas",
			icone: <MapPin className="size-4 shrink-0" />,
			rotulo: "Paradas",
			valor: (
				<>
					{paradasVisitadas}
					<span className="text-[18px] text-ink-2">/{totalParadas}</span>
				</>
			),
			apoio:
				totalParadas === 0
					? "nenhuma parada cadastrada"
					: paradasVisitadas === totalParadas
						? "todas visitadas"
						: `${totalParadas - paradasVisitadas} restantes`,
		},
		{
			chave: "ritmo",
			icone: <TrendingUp className="size-4 shrink-0" />,
			rotulo: "Média por parada",
			valor: mediaPorParada ? formatarDuracaoCurta(mediaPorParada) : "—",
			apoio: mediaPorParada
				? "tempo médio até cada chegada"
				: "após a primeira chegada",
		},
		{
			chave: "km",
			icone: <Gauge className="size-4 shrink-0" />,
			rotulo: "Quilometragem",
			valor:
				mileage != null ? (
					<>
						{formatarKm(mileage)}
						<span className="ml-1 text-[18px]">km</span>
					</>
				) : (
					"—"
				),
			apoio:
				mileage != null
					? "registrada na finalização"
					: mediaPorRota != null
						? `média de ${formatarKm(mediaPorRota)} km por rota`
						: "registrada ao finalizar",
		},
	];

	return (
		<section className="flex w-full flex-col">
			<DataGrid
				colunas={4}
				colunasMobile={2}
				itens={metricas.map((metrica, indice) => ({
					chave: metrica.chave,
					conteudo: (
						<div
							style={{ animationDelay: `${indice * 70}ms` }}
							className="flex flex-col gap-1.5 p-5 motion-safe:surge-etapa"
						>
							<span className="flex items-center gap-2 text-[13px] text-ink-2">
								{metrica.icone}
								{metrica.rotulo}
							</span>

							<p
								role={metrica.chave === "tempo" ? "timer" : undefined}
								aria-live="off"
								className={cn(
									"font-display text-[28px] font-extrabold leading-none tabular-nums tracking-tight",
									metrica.tom ?? "text-blue-deep",
								)}
							>
								{metrica.valor}
							</p>

							<span className="text-[12px] text-ink-2">{metrica.apoio}</span>
						</div>
					),
				}))}
			/>

			<div className="flex flex-col gap-2 border-t border-line px-5 py-4">
				<div
					aria-hidden="true"
					className="h-2 w-full overflow-hidden rounded-full bg-ink/10"
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

				{excedeu || emAviso ? (
					<p
						className={cn(
							"flex items-center gap-2 text-[12px] font-semibold",
							excedeu ? "text-danger" : "text-warning",
						)}
					>
						<AlertTriangle className="size-4 shrink-0" />
						{excedeu
							? "A rota passou do limite de 6 horas da cadeia fria."
							: "Passou de 5 horas. Fique atento ao limite de 6h."}
					</p>
				) : (
					<p className="text-[12px] text-ink-2">
						Limite de 6 horas por rota, contadas a partir do início.
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
