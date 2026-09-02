import { CheckCircle2, MapPinOff, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StepDot } from "@/components/ui/step-dot";
import { cn } from "@/lib/utils";
import type { IRouteStop } from "@/services/types/i-route";
import { formatCreatedAt } from "@/utils/formatter";
import type { EstadoDaParada } from "../utils";
import { formatarEndereco, temCoordenadas } from "../utils";

const BADGE = {
	concluida: { rotulo: "VISITADA", tone: "success" as const },
	atual: { rotulo: "PRÓXIMA PARADA", tone: "brand" as const },
	proxima: { rotulo: "AGUARDANDO", tone: "neutral" as const },
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
}: Props) {
	const concluida = estado === "concluida";
	const atual = estado === "atual";
	const semCoordenada = !temCoordenadas(stop);

	return (
		<li className="flex gap-3.5 lg:gap-4">
			<div className="flex flex-col items-center">
				<StepDot
					status={concluida ? "done" : atual ? "current" : "waiting"}
					order={numero}
					className={atual ? "size-9 text-[14px]" : "size-7 text-[12px]"}
				/>

				{!isLast && (
					<div
						className={cn(
							"my-1.5 flex-1",
							concluida
								? "w-0.5 rounded-full bg-blue-bright-fill"
								: "w-0 border-l-2 border-dashed border-blue-tint-2",
						)}
					/>
				)}
			</div>

			<div
				className={cn(
					"mb-4 flex flex-1 flex-col gap-3 rounded-xl p-3.5 lg:rounded-2xl lg:p-5",
					atual
						? "bg-blue-tint/70"
						: concluida
							? "bg-surface-3"
							: "bg-surface-2",
				)}
			>
				<div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
					<p
						className={cn(
							"min-w-0 flex-1 break-words font-bold",
							atual
								? "text-[15px] text-ink lg:text-[16px]"
								: "text-[14px] text-ink lg:text-[15px]",
						)}
					>
						{formatarEndereco(stop)}
					</p>

					<Badge
						tone={BADGE[estado].tone}
						size="sm"
						caps
						dot={atual}
						className="px-2 py-0.5 text-[10px] tracking-wider"
					>
						{BADGE[estado].rotulo}
					</Badge>
				</div>

				{stop.address?.complement && (
					<p className="text-[13px] text-ink-2">{stop.address.complement}</p>
				)}

				<div className="flex flex-col gap-1.5">
					{stop.date_start && (
						<p className="flex items-center gap-2 text-[13px] text-ink-2">
							<CheckCircle2 className="size-4 shrink-0 text-success" />
							Chegada registrada em {formatCreatedAt(stop.date_start)}
						</p>
					)}

					{stop.date_end && (
						<p className="text-[12.5px] text-ink-2">
							Encerrada em {formatCreatedAt(stop.date_end)}
						</p>
					)}

					{semCoordenada && (
						<p className="flex items-center gap-2 text-[12.5px] text-warning">
							<MapPinOff className="size-4 shrink-0" />
							Sem localização — não aparece no mapa
						</p>
					)}
				</div>

				{(podeMarcar || podeRemover) && (
					<div className="flex flex-wrap items-center gap-2.5 border-t border-line pt-3">
						{podeMarcar && (
							<button
								type="button"
								onClick={onMarcar}
								className="flex h-11 min-w-[132px] items-center justify-center gap-2 rounded-full bg-blue-deep-fill px-5 text-[14px] font-semibold text-white outline-none transition-[transform,background-color] hover:bg-blue-fill focus-visible:ring-3 focus-visible:ring-blue-bright/50 active:scale-[0.98]"
							>
								<CheckCircle2 className="size-[18px]" />
								Cheguei
							</button>
						)}

						{podeRemover && (
							<button
								type="button"
								onClick={onRemover}
								className="flex h-11 items-center justify-center gap-2 rounded-full border border-danger-tint bg-surface px-5 text-[14px] font-semibold text-danger outline-none transition-colors hover:bg-danger-tint focus-visible:ring-3 focus-visible:ring-danger/40"
							>
								<Trash2 className="size-4" />
								Remover
							</button>
						)}
					</div>
				)}
			</div>
		</li>
	);
}
