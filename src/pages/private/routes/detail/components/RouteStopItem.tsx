import { Check, MapPinOff, Trash2 } from "lucide-react";
import { StepDot } from "@/components/ui/step-dot";
import { cn } from "@/lib/utils";
import type { IRouteStop } from "@/services/types/i-route";
import { formatCreatedAt } from "@/utils/formatter";
import type { EstadoDaParada } from "../utils";
import { partesDoEndereco, temCoordenadas } from "../utils";

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
	const { linha, regiao } = partesDoEndereco(stop);

	const temAcoes = podeMarcar || podeRemover;

	return (
		<li className="flex gap-3">
			<div className="flex flex-col items-center pt-0.5">
				<StepDot
					status={concluida ? "done" : atual ? "current" : "waiting"}
					order={numero}
					className="size-6 text-[11px]"
					iconClassName="size-3"
				/>

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
					"flex min-w-0 flex-1 flex-col gap-1",
					isLast ? "pb-0.5" : "pb-5",
				)}
			>
				<p
					className={cn(
						"break-words text-[14px] font-bold",
						concluida || atual ? "text-ink" : "text-ink-2",
					)}
				>
					{linha}
				</p>

				{regiao && <p className="text-[12px] text-ink-2">{regiao}</p>}

				{stop.date_start && (
					<p className="flex items-center gap-1.5 text-[12px] text-success">
						<Check className="size-3.5 shrink-0" strokeWidth={3} />
						{formatCreatedAt(stop.date_start)}
					</p>
				)}

				{atual && !stop.date_start && (
					<p className="text-[12px] font-semibold text-blue-bright">
						Próxima parada
					</p>
				)}

				{semCoordenada && (
					<p className="flex items-center gap-1.5 text-[12px] text-warning">
						<MapPinOff className="size-3.5 shrink-0" />
						Sem localização no mapa
					</p>
				)}

				{temAcoes && (
					<div className="flex flex-wrap items-center gap-2 pt-1.5">
						{podeMarcar && (
							<button
								type="button"
								onClick={onMarcar}
								className={cn(
									"flex h-11 items-center justify-center gap-2 rounded-full px-5 font-bold outline-none transition-[transform,filter,background-color] focus-visible:ring-4 focus-visible:ring-blue-bright/50 active:scale-[0.98]",
									atual
										? "gradient-blue text-[14px] text-white shadow-soft hover:brightness-110"
										: "border border-blue-tint-2 bg-surface text-[13px] text-blue-deep hover:bg-blue-tint",
								)}
							>
								<Check className="size-4" strokeWidth={3} />
								Cheguei
							</button>
						)}

						{podeRemover && (
							<button
								type="button"
								onClick={onRemover}
								aria-label={`Remover a parada em ${linha}`}
								className="flex size-11 items-center justify-center rounded-full text-ink-2 outline-none transition-colors hover:bg-danger-tint hover:text-danger focus-visible:ring-4 focus-visible:ring-danger/40"
							>
								<Trash2 className="size-4" />
							</button>
						)}
					</div>
				)}
			</div>
		</li>
	);
}
