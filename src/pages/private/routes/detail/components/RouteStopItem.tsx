import { Check, CircleAlert, MapPinOff, Trash2 } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { StepDot } from "@/components/ui/step-dot";
import { cn } from "@/lib/utils";
import type { IRouteStop } from "@/services/types/i-route";
import { formatDateTimeParts } from "@/utils/formatter";
import type { EstadoDaParada } from "../utils";
import { partesDoEndereco, temCoordenadas } from "../utils";

const BADGE: Record<EstadoDaParada, { rotulo: string; tone: BadgeTone }> = {
	concluida: { rotulo: "VISITADA", tone: "success" },
	erro: { rotulo: "NÃO REALIZADA", tone: "error" },
	atual: { rotulo: "EM ROTA", tone: "brand" },
	proxima: { rotulo: "AGUARDANDO", tone: "neutral" },
};

type Props = {
	stop: IRouteStop;
	numero: number;
	estado: EstadoDaParada;
	isLast: boolean;
	podeRemover: boolean;
	podeMarcar: boolean;
	onRemover: () => void;
	onMarcar: () => void;
	onReportarProblema: () => void;
};

export function RouteStopItem({
	stop,
	numero,
	estado,
	isLast,
	podeRemover,
	podeMarcar,
	onRemover,
	onMarcar,
	onReportarProblema,
}: Props) {
	const concluida = estado === "concluida";
	const comErro = estado === "erro";
	const atual = estado === "atual";
	const semCoordenada = !temCoordenadas(stop);
	const { linha, regiao } = partesDoEndereco(stop);

	const marcador = (wrapperClassName?: string) => (
		<StepDot
			status={
				concluida ? "done" : comErro ? "failed" : atual ? "current" : "waiting"
			}
			order={numero}
			className={atual ? "size-7 text-[12px]" : "size-6 text-[11px]"}
			wrapperClassName={wrapperClassName}
		/>
	);

	return (
		<li className="flex gap-3">
			{/* Trilha lateral so no desktop. No celular o marcador entra no cartao,
			    ao lado do endereco: da mais espaco ao texto e o cartao da parada
			    atual cresce para abraçar a bolinha que anima. */}
			<div className="hidden flex-col items-center sm:flex">
				{marcador()}

				{!isLast && (
					<div
						className={cn(
							"my-1 flex-1",
							concluida
								? "w-0.5 rounded-full bg-blue-bright-fill"
								: "w-0 border-l-2 border-dotted border-blue-tint-2",
						)}
					/>
				)}
			</div>

			<div
				className={cn(
					"flex min-w-0 flex-1 gap-2.5 rounded-xl transition-colors sm:block",
					isLast ? "pb-1" : "pb-5",
					atual && "-mt-1.5 mb-3.5 bg-blue-tint/60 p-3",
				)}
			>
				{marcador("mt-0.5 sm:hidden")}

				<div className="min-w-0 flex-1">
					<div className="flex items-start justify-between gap-2">
						<p
							className={cn(
								"min-w-0 flex-1 break-words text-[14px] font-bold",
								comErro ? "text-danger" : "text-ink",
							)}
						>
							{linha}
						</p>

						<Badge
							tone={BADGE[estado].tone}
							size="sm"
							caps
							dot={atual}
							className="mt-px shrink-0 px-2 py-0.5 text-[10px] tracking-[0.06em]"
						>
							{BADGE[estado].rotulo}
						</Badge>
					</div>

					<div className="mt-0.5 flex items-center justify-between gap-2">
						<p className="min-w-0 flex-1 truncate text-[12px] text-ink-2">
							{regiao}
						</p>

						{podeRemover && (
							<button
								type="button"
								onClick={onRemover}
								aria-label={`Remover a parada em ${linha}`}
								className="-my-1 flex size-7 shrink-0 items-center justify-center rounded-full text-ink-2 outline-none transition-colors hover:bg-danger-tint hover:text-danger focus-visible:ring-4 focus-visible:ring-danger/40"
							>
								<Trash2 className="size-3.5" />
							</button>
						)}
					</div>

					{stop.date_start && (
						<p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-success">
							<Check className="size-3.5 shrink-0" strokeWidth={3} />
							Chegou às {formatDateTimeParts(stop.date_start).time}
						</p>
					)}

					{comErro && (
						<p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-danger">
							<CircleAlert className="size-3.5 shrink-0" />
							Marcada como não realizada
						</p>
					)}

					{semCoordenada && (
						<p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-warning">
							<MapPinOff className="size-3.5 shrink-0" />
							Sem localização no mapa
						</p>
					)}

					{podeMarcar && (
						<div className="mt-3 flex items-center gap-2">
							<button
								type="button"
								onClick={onMarcar}
								className={cn(
									"flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-bold outline-none transition-[transform,background-color] focus-visible:ring-4 focus-visible:ring-blue-bright/50 active:scale-[0.98]",
									atual
										? "bg-blue-deep-fill text-white hover:bg-blue-fill"
										: "border border-blue-tint-2 bg-surface text-blue-deep hover:bg-blue-tint",
								)}
							>
								<Check className="size-4 shrink-0" strokeWidth={3} />
								Cheguei
							</button>

							<button
								type="button"
								onClick={onReportarProblema}
								className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-danger-tint bg-surface px-3 text-[13px] font-semibold text-danger outline-none transition-colors hover:bg-danger-tint focus-visible:ring-4 focus-visible:ring-danger/40"
							>
								<CircleAlert className="size-4 shrink-0" />
								Imprevisto
							</button>
						</div>
					)}
				</div>
			</div>
		</li>
	);
}
