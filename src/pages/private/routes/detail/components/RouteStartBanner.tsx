import { AlertTriangle, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCreatedAt } from "@/utils/formatter";

type Props = {
	dateSet: string;
};

function ehHoje(data: Date): boolean {
	const hoje = new Date();

	return (
		data.getFullYear() === hoje.getFullYear() &&
		data.getMonth() === hoje.getMonth() &&
		data.getDate() === hoje.getDate()
	);
}

export function RouteStartBanner({ dateSet }: Props) {
	const previsto = new Date(dateSet);
	const atrasada = previsto.getTime() < Date.now();

	if (!atrasada && !ehHoje(previsto)) {
		return null;
	}

	return (
		<div
			role="status"
			className={cn(
				"flex items-start gap-3 rounded-2xl px-4 py-3.5 lg:rounded-3xl lg:px-5",
				atrasada ? "bg-danger-tint" : "bg-warning-tint",
			)}
		>
			<span
				className={cn(
					"mt-px shrink-0",
					atrasada ? "text-danger" : "text-warning",
				)}
			>
				{atrasada ? (
					<AlertTriangle className="size-5" />
				) : (
					<CalendarClock className="size-5" />
				)}
			</span>

			<div className="flex min-w-0 flex-col gap-0.5">
				<p
					className={cn(
						"text-[14px] font-bold",
						atrasada ? "text-danger" : "text-warning",
					)}
				>
					{atrasada
						? "Rota não iniciada — o horário previsto já passou."
						: "Esta rota está agendada para hoje."}
				</p>
				<p className="text-[13px] text-ink-2">
					{atrasada
						? `Previsto para ${formatCreatedAt(dateSet)}. Inicie assim que puder.`
						: "Não esqueça de iniciar a rota antes de sair."}
				</p>
			</div>
		</div>
	);
}
