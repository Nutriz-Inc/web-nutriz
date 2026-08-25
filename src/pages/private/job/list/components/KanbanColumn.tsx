import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Appointment } from "../../types";
import type { ColunaQuadro } from "../constants";
import { KanbanCard } from "./KanbanCard";

type KanbanColumnProps = {
	coluna: ColunaQuadro;
	appointments: Appointment[];
	total: number;
	isLoading: boolean;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	onLoadMore: () => void;
};

/**
 * Uma coluna do quadro: faixa de cor, titulo com contador e a pilha de
 * cartoes.
 *
 * A paginacao e por coluna, porque cada status e uma consulta propria — o
 * "carregar mais" no pe puxa so a coluna dele.
 */
export function KanbanColumn({
	coluna,
	appointments,
	total,
	isLoading,
	hasNextPage,
	isFetchingNextPage,
	onLoadMore,
}: KanbanColumnProps) {
	return (
		<section
			aria-label={coluna.titulo}
			className="flex w-[84vw] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-card-sm border border-line bg-surface-2 lg:w-auto lg:max-w-none lg:shrink"
		>
			<span
				aria-hidden="true"
				className={cn("h-1 w-full", coluna.corDaFaixa)}
			/>

			<header className="flex items-center gap-2 px-4 py-3.5">
				<h2 className="text-[15px] font-bold text-ink">{coluna.titulo}</h2>
				<span
					className={cn(
						"rounded-full px-2 py-0.5 text-[12px] font-bold tabular-nums",
						coluna.corDoContador,
					)}
				>
					{isLoading ? "—" : total}
				</span>
			</header>

			{/*
			 * A rolagem e de cada coluna, nao da pagina: com tres colunas de alturas
			 * diferentes, rolar a pagina inteira faria a mais curta sumir enquanto a
			 * mais longa ainda tem cartoes.
			 */}
			<div className="sem-barra flex max-h-[min(62vh,560px)] flex-col gap-2.5 overflow-y-auto px-3 pb-3.5">
				{isLoading ? (
					<div className="flex justify-center py-8">
						<LoaderCircle className="size-5 animate-spin text-blue-bright" />
					</div>
				) : appointments.length === 0 ? (
					<p className="rounded-card-sm border border-dashed border-line bg-white/60 px-4 py-8 text-center text-[13px] leading-[19px] text-ink-3">
						{coluna.vazio}
					</p>
				) : (
					<>
						{appointments.map((appointment) => (
							<KanbanCard key={appointment.id} appointment={appointment} />
						))}

						{hasNextPage && (
							<button
								type="button"
								onClick={onLoadMore}
								disabled={isFetchingNextPage}
								className="rounded-card-sm border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink-2 transition-colors hover:bg-surface-3 disabled:opacity-60"
							>
								{isFetchingNextPage
									? "Carregando..."
									: `Carregar mais (${Math.max(total - appointments.length, 0)})`}
							</button>
						)}
					</>
				)}
			</div>
		</section>
	);
}
