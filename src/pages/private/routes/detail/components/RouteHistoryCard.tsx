import {
	CalendarClock,
	CircleCheckBig,
	CirclePlay,
	PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IGetRouteResponse } from "@/services/types/i-route";
import { formatCreatedAt } from "@/utils/formatter";

type Props = {
	route: IGetRouteResponse;
};

export function RouteHistoryCard({ route }: Props) {
	const marcos = [
		{
			chave: "criada",
			icone: <PlusCircle className="size-4" />,
			rotulo: "Criada",
			data: route.created_at,
		},
		{
			chave: "prevista",
			icone: <CalendarClock className="size-4" />,
			rotulo: "Prevista para",
			data: route.date_set,
		},
		{
			chave: "iniciada",
			icone: <CirclePlay className="size-4" />,
			rotulo: "Iniciada",
			data: route.date_start,
		},
		{
			chave: "finalizada",
			icone: <CircleCheckBig className="size-4" />,
			rotulo: "Finalizada",
			data: route.date_end,
		},
	];

	return (
		<section className="flex w-full flex-col p-5">
			<ol className="flex flex-col">
				{marcos.map((marco, indice) => {
					const cumprido = Boolean(marco.data);
					const isLast = indice === marcos.length - 1;

					return (
						<li key={marco.chave} className="flex gap-3">
							<div className="flex flex-col items-center">
								<span
									className={cn(
										"flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
										cumprido
											? "bg-blue-tint text-blue-deep"
											: "bg-surface-2 text-ink-3",
									)}
								>
									{marco.icone}
								</span>

								{!isLast && (
									<div
										className={cn(
											"my-1 flex-1",
											cumprido
												? "w-0.5 rounded-full bg-blue-tint-2"
												: "w-0 border-l-2 border-dotted border-blue-tint-2",
										)}
									/>
								)}
							</div>

							<div
								className={cn(
									"flex min-w-0 flex-1 flex-col gap-0.5",
									isLast ? "pb-0" : "pb-4",
								)}
							>
								<span className="text-[12px] text-ink-2">{marco.rotulo}</span>
								<span
									className={cn(
										"text-[13px] font-semibold tabular-nums",
										cumprido ? "text-ink" : "text-ink-3",
									)}
								>
									{marco.data ? formatCreatedAt(marco.data) : "Ainda não"}
								</span>
							</div>
						</li>
					);
				})}
			</ol>
		</section>
	);
}
