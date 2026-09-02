import {
	CalendarClock,
	CircleCheckBig,
	CirclePlay,
	PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IGetRouteResponse } from "@/services/types/i-route";
import { formatDateTimeParts } from "@/utils/formatter";

type Props = {
	route: IGetRouteResponse;
};

export function RouteHistoryStrip({ route }: Props) {
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
		<ol className="flex flex-col px-5 pb-5 sm:flex-row">
			{marcos.map((marco, indice) => {
				const cumprido = Boolean(marco.data);
				const partes = marco.data ? formatDateTimeParts(marco.data) : null;
				const isLast = indice === marcos.length - 1;
				const proximoCumprido = Boolean(marcos[indice + 1]?.data);

				return (
					<li
						key={marco.chave}
						className="flex gap-3 sm:min-w-0 sm:flex-1 sm:flex-col sm:gap-2.5"
					>
						<div className="flex flex-col items-center sm:w-full sm:flex-row">
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
								<span
									aria-hidden="true"
									className={cn(
										"my-1 flex-1 sm:mx-2 sm:my-0",
										proximoCumprido
											? "w-0.5 rounded-full bg-blue-tint-2 sm:h-0.5 sm:w-auto"
											: "w-0 border-l-2 border-dotted border-blue-tint-2 sm:h-0 sm:w-auto sm:border-l-0 sm:border-t-2",
									)}
								/>
							)}
						</div>

						<div
							className={cn(
								"flex min-w-0 flex-col",
								isLast ? "pb-0" : "pb-5 sm:pb-0",
							)}
						>
							<span className="text-[11px] text-ink-2">{marco.rotulo}</span>
							{partes ? (
								<span className="truncate text-[13px] font-semibold tabular-nums text-ink">
									{partes.date}
									<span className="ml-1.5 text-ink-2">{partes.time}</span>
								</span>
							) : (
								<span className="text-[13px] font-semibold text-ink-3">
									Ainda não
								</span>
							)}
						</div>
					</li>
				);
			})}
		</ol>
	);
}
