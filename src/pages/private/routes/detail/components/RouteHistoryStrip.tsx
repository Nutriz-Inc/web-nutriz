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
		<ol className="grid grid-cols-2 lg:grid-cols-4">
			{marcos.map((marco, indice) => {
				const cumprido = Boolean(marco.data);
				const partes = marco.data ? formatDateTimeParts(marco.data) : null;

				return (
					<li
						key={marco.chave}
						className={cn(
							"flex items-center gap-3 border-line px-5 py-4",
							indice % 2 === 1 && "border-l",
							indice > 1 && "border-t lg:border-t-0",
							indice > 0 && "lg:border-l",
						)}
					>
						<span
							className={cn(
								"flex size-9 shrink-0 items-center justify-center rounded-full",
								cumprido
									? "bg-blue-tint text-blue-deep"
									: "bg-surface-2 text-ink-3",
							)}
						>
							{marco.icone}
						</span>

						<div className="flex min-w-0 flex-col">
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
