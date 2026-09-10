import { Pencil } from "lucide-react";
import { ExpandableText } from "@/components/full/ExpandableText";
import { Button } from "@/components/ui/button";
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
					<Button
						variant="ghost"
						size="icon-pill-sm"
						type="button"
						onClick={onEditar}
						aria-label="Editar nome e descrição da rota"
						className="-mt-1 shrink-0 text-ink-2 hover:bg-blue-tint hover:text-blue-deep"
					>
						<Pencil className="size-4" />
					</Button>
				)}
			</div>
		</section>
	);
}
