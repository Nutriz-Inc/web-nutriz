import { Ban, Pencil } from "lucide-react";
import { RouteStatusBadge } from "@/components/full/RouteStatusBadge";
import { cn } from "@/lib/utils";
import type { IGetRouteResponse } from "@/services/types/i-route";
import { formatDateBR, formatDateTimeParts } from "@/utils/formatter";

type Props = {
	route: IGetRouteResponse;
	podeGerenciar: boolean;
	onEditar: () => void;
	onCancelar: () => void;
};

export function RouteHeaderCard({
	route,
	podeGerenciar,
	onEditar,
	onCancelar,
}: Props) {
	const previsto = formatDateTimeParts(route.date_set);

	const meta = [
		{
			rotulo: "Prevista para",
			valor: previsto.date,
			complemento: `às ${previsto.time}`,
		},
		{
			rotulo: "Região",
			valor:
				[route.city, route.neighborhood].filter(Boolean).join(" · ") || "—",
		},
		{ rotulo: "Criada em", valor: formatDateBR(route.created_at) },
	];

	return (
		<section className="flex w-full flex-col">
			<div className="flex flex-col gap-3 p-5">
				<div className="flex items-start justify-between gap-3">
					<h2 className="min-w-0 flex-1 break-words font-display text-[18px] font-extrabold tracking-tight text-blue-deep">
						{route.name}
					</h2>

					<div className="flex shrink-0 items-center gap-2">
						<RouteStatusBadge status={route.status} />
						{podeGerenciar && (
							<button
								type="button"
								onClick={onEditar}
								aria-label="Editar nome e descrição da rota"
								className="flex size-9 items-center justify-center rounded-full text-ink-2 outline-none transition-colors hover:bg-blue-tint hover:text-blue-deep focus-visible:ring-4 focus-visible:ring-blue-bright/50"
							>
								<Pencil className="size-4" />
							</button>
						)}
					</div>
				</div>

				<p className="text-[13px] leading-relaxed text-ink-2">
					{route.description}
				</p>
			</div>

			<dl className="grid grid-cols-3 divide-x divide-line border-t border-line">
				{meta.map((item) => (
					<div key={item.rotulo} className="flex flex-col gap-1 px-4 py-3.5">
						<dt className="text-[11px] text-ink-2">{item.rotulo}</dt>
						<dd className="flex flex-col">
							<span className="text-[13px] font-semibold text-ink">
								{item.valor}
							</span>
							{item.complemento && (
								<span className="text-[11px] text-ink-2">
									{item.complemento}
								</span>
							)}
						</dd>
					</div>
				))}
			</dl>

			{route.user_feedback && (
				<div className="flex flex-col gap-1 border-t border-line px-5 py-4">
					<span className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-2">
						Relato do motorista
					</span>
					<p className="text-[13px] leading-relaxed text-ink">
						{route.user_feedback}
					</p>
				</div>
			)}

			{podeGerenciar && (
				<div className="flex justify-center border-t border-line px-5 py-4">
					<button
						type="button"
						onClick={onCancelar}
						className={cn(
							"flex h-11 items-center justify-center gap-2 rounded-full px-6 text-[14px] font-semibold text-danger",
							"border-[1.5px] border-danger/40 bg-surface outline-none transition-colors",
							"hover:border-danger hover:bg-danger-tint focus-visible:ring-4 focus-visible:ring-danger/40",
						)}
					>
						<Ban className="size-4" />
						Cancelar rota
					</button>
				</div>
			)}
		</section>
	);
}
