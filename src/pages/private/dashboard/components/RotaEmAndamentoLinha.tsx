import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { RotaEmAndamento } from "@/services/types/i-analytics";
import { LIMITE_ROTA_HORAS, situacaoLimiteRota } from "@/utils/route-time";

export function RotaEmAndamentoLinha({ rota }: { rota: RotaEmAndamento }) {
	const limite = situacaoLimiteRota(rota.iniciada_em ?? undefined);
	const decorridoPct = limite
		? Math.min(
				(limite.decorridoMs / (LIMITE_ROTA_HORAS * 3600 * 1000)) * 100,
				100,
			)
		: 0;
	const tom = limite?.excedeu
		? "danger"
		: limite?.emAviso
			? "orange"
			: "blue-deep";

	return (
		<Link
			to={`/rotas/${rota.id_rota}`}
			className="group flex flex-col gap-2.5 rounded-card-sm border border-line bg-surface px-4 py-3.5 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-soft"
		>
			<div className="flex items-baseline justify-between gap-3">
				<p className="truncate text-[14px] font-semibold text-ink">
					{rota.rota}
				</p>
				<p
					className={cn(
						"shrink-0 text-[12px] font-semibold tabular-nums",
						tom === "danger" && "text-danger",
						tom === "orange" && "text-orange",
						tom === "blue-deep" && "text-ink-2",
					)}
				>
					{limite?.rotulo ?? "Aguardando início"}
				</p>
			</div>
			<div
				className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3"
				role="progressbar"
				aria-label={`Tempo da rota ${rota.rota} no limite de ${LIMITE_ROTA_HORAS} horas`}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(decorridoPct)}
			>
				<div
					className={cn(
						"h-full rounded-full",
						tom === "danger" && "bg-danger",
						tom === "orange" && "bg-orange",
						tom === "blue-deep" && "bg-blue-deep",
					)}
					style={{ width: `${decorridoPct}%` }}
				/>
			</div>
			<p className="text-[12px] text-ink-2">
				{rota.motorista ?? "Motorista não informado"} · {rota.paradas_feitas} de{" "}
				{rota.paradas} paradas
				{rota.paradas_com_imprevisto > 0
					? ` · ${rota.paradas_com_imprevisto} com imprevisto`
					: ""}
			</p>
		</Link>
	);
}
