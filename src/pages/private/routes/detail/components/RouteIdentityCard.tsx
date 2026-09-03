import { CalendarClock, MapPin } from "lucide-react";
import { CopyableId } from "@/components/full/CopyableId";
import { DataGrid } from "@/components/full/DataGrid";
import { RouteStatusBadge } from "@/components/full/RouteStatusBadge";
import type { IGetRouteResponse } from "@/services/types/i-route";
import { formatDateTimeParts } from "@/utils/formatter";

type Props = {
	route: IGetRouteResponse;
};

export function RouteIdentityCard({ route }: Props) {
	const previsto = formatDateTimeParts(route.date_set);
	const regiao = [route.city, route.neighborhood].filter(Boolean).join(" · ");

	const dados = [
		{
			chave: "prevista",
			icone: <CalendarClock className="size-4 shrink-0" />,
			rotulo: "Prevista para",
			valor: previsto.date,
			complemento: previsto.time,
		},
		{
			chave: "regiao",
			icone: <MapPin className="size-4 shrink-0" />,
			rotulo: "Região",
			valor: regiao || "—",
		},
	];

	return (
		<section className="flex flex-col lg:flex-row lg:items-stretch">
			<div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 p-5">
				<RouteStatusBadge status={route.status} />
				<CopyableId id={route.id_route} className="text-[13px] text-ink-2" />
			</div>

			<DataGrid
				colunas={2}
				colunasMobile={2}
				className="border-t lg:w-[440px] lg:shrink-0 lg:border-t-0 lg:border-l"
				itens={dados.map((item) => ({
					chave: item.chave,
					conteudo: (
						<div className="flex flex-col gap-1 px-5 py-4">
							<span className="flex items-center gap-1.5 text-[11px] text-ink-2">
								{item.icone}
								{item.rotulo}
							</span>
							<span className="truncate text-[13px] font-semibold text-ink">
								{item.valor}
								{item.complemento && (
									<span className="ml-1.5 font-normal text-ink-2">
										{item.complemento}
									</span>
								)}
							</span>
						</div>
					),
				}))}
			/>
		</section>
	);
}
