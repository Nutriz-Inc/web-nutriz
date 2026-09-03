import { Pencil } from "lucide-react";
import { ExpandableText } from "@/components/full/ExpandableText";
import type { IGetRouteResponse } from "@/services/types/i-route";

type Props = {
	route: IGetRouteResponse;
	podeEditar: boolean;
	onEditar: () => void;
};

export function RouteDetailsCard({ route, podeEditar, onEditar }: Props) {
	return (
		<section className="flex h-full w-full flex-col">
			<div className="flex items-start justify-between gap-3 p-5">
				{route.description ? (
					<ExpandableText
						texto={route.description}
						titulo="Descrição da rota"
						className="flex-1"
					/>
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
		</section>
	);
}
