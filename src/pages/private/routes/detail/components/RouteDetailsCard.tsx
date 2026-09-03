import { Pencil } from "lucide-react";
import { DataGrid } from "@/components/full/DataGrid";
import { ExpandableText } from "@/components/full/ExpandableText";
import type { IGetRouteResponse } from "@/services/types/i-route";
import { formatDateBR, formatDateTimeParts } from "@/utils/formatter";

type Props = {
	route: IGetRouteResponse;
	podeEditar: boolean;
	onEditar: () => void;
};

export function RouteDetailsCard({ route, podeEditar, onEditar }: Props) {
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
		<section className="flex h-full w-full flex-col">
			<div className="flex items-start justify-between gap-3 p-5">
				{route.description ? (
					<ExpandableText texto={route.description} className="flex-1" />
				) : (
					<p className="min-w-0 flex-1 text-[13px] leading-relaxed text-ink-2">
						Sem descrição.
					</p>
				)}

				{podeEditar && (
					<button
						type="button"
						onClick={onEditar}
						aria-label="Editar nome e descrição da rota"
						className="-mt-1 flex size-9 shrink-0 items-center justify-center rounded-full text-ink-2 outline-none transition-colors hover:bg-blue-tint hover:text-blue-deep focus-visible:ring-4 focus-visible:ring-blue-bright/50"
					>
						<Pencil className="size-4" />
					</button>
				)}
			</div>

			<DataGrid
				colunas={3}
				colunasMobile={1}
				className="mt-auto border-t"
				itens={meta.map((item) => ({
					chave: item.rotulo,
					conteudo: (
						<div className="flex flex-col gap-1 px-5 py-4">
							<span className="text-[11px] text-ink-2">{item.rotulo}</span>
							<span className="break-words text-[13px] font-semibold text-ink">
								{item.valor}
							</span>
							{item.complemento && (
								<span className="text-[11px] text-ink-2">
									{item.complemento}
								</span>
							)}
						</div>
					),
				}))}
			/>
		</section>
	);
}
