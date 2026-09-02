import { Ban, CalendarClock, MapPin, Pencil, PlusCircle } from "lucide-react";
import { RouteStatusBadge } from "@/components/full/RouteStatusBadge";
import type { IGetRouteResponse } from "@/services/types/i-route";
import { formatCreatedAt } from "@/utils/formatter";

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
	const regiao = [route.city, route.neighborhood].filter(Boolean).join(" · ");

	const dados = [
		{
			icone: <CalendarClock className="size-4 shrink-0 text-ink-2" />,
			rotulo: "Prevista para",
			valor: formatCreatedAt(route.date_set),
		},
		{
			icone: <MapPin className="size-4 shrink-0 text-ink-2" />,
			rotulo: "Região",
			valor: regiao || "Sem região definida",
		},
		{
			icone: <PlusCircle className="size-4 shrink-0 text-ink-2" />,
			rotulo: "Criada em",
			valor: formatCreatedAt(route.created_at),
		},
	];

	return (
		<section className="flex w-full flex-col gap-4 rounded-2xl bg-surface p-5 shadow-soft lg:gap-5 lg:rounded-3xl lg:p-6">
			<div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
				<h2 className="min-w-0 flex-1 break-words font-display text-[18px] font-extrabold tracking-tight text-blue-deep lg:text-[20px]">
					{route.name}
				</h2>
				<RouteStatusBadge status={route.status} />
			</div>

			<p className="text-[14px] leading-relaxed text-ink-2">
				{route.description}
			</p>

			<div className="h-px bg-blue-tint" />

			<div className="flex flex-col gap-2.5">
				{dados.map((item) => (
					<div key={item.rotulo} className="flex items-center gap-2.5">
						{item.icone}
						<span className="text-[13px] text-ink-2">{item.rotulo}</span>
						<span className="ml-auto min-w-0 truncate text-[14px] font-semibold text-ink">
							{item.valor}
						</span>
					</div>
				))}
			</div>

			{route.user_feedback && (
				<div className="flex flex-col gap-1 rounded-xl bg-surface-2 p-3.5">
					<span className="text-[10.5px] font-bold uppercase tracking-wider text-ink-2">
						Relato do motorista
					</span>
					<p className="text-[13.5px] leading-relaxed text-ink">
						{route.user_feedback}
					</p>
				</div>
			)}

			{podeGerenciar && (
				<div className="flex flex-wrap gap-2.5 border-t border-line pt-4">
					<button
						type="button"
						onClick={onEditar}
						className="flex h-11 items-center justify-center gap-2 rounded-full border border-blue-tint-2 bg-surface px-5 text-[14px] font-semibold text-blue-deep outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50"
					>
						<Pencil className="size-4" />
						Editar
					</button>

					<button
						type="button"
						onClick={onCancelar}
						className="flex h-11 items-center justify-center gap-2 rounded-full border border-danger-tint bg-surface px-5 text-[14px] font-semibold text-danger outline-none transition-colors hover:bg-danger-tint focus-visible:ring-3 focus-visible:ring-danger/40"
					>
						<Ban className="size-4" />
						Cancelar rota
					</button>
				</div>
			)}
		</section>
	);
}
