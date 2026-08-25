import { Bookmark, Calendar, FileText, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getInitials } from "@/components/layout/utils";
import { cn } from "@/lib/utils";
import { formatCreatedAt } from "@/utils/formatter";
import { findStepDefinition } from "../../detail/utils";
import type { Appointment } from "../../types";
import { getReportHint } from "../utils";

type KanbanCardProps = {
	appointment: Appointment;
};

/**
 * Cartao do quadro.
 *
 * Mais baixo que o cartao antigo da lista: numa coluna o que importa e caber
 * varios na altura da tela, entao o local e a etapa viram uma linha de apoio e
 * o selo de status sai — a coluna em que o cartao esta ja diz o status, repetir
 * so ocupava espaco.
 */
export function KanbanCard({ appointment }: KanbanCardProps) {
	const navigate = useNavigate();

	const dica = getReportHint(appointment);
	const IconeDaEtapa =
		findStepDefinition(appointment.stepName)?.icon ?? Bookmark;

	return (
		<button
			type="button"
			onClick={() => navigate(`/agendamentos/${appointment.id}`)}
			className="group flex w-full flex-col gap-3 rounded-card-sm border border-line bg-white p-4 text-left shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-bright/40"
		>
			<div className="flex items-start gap-3">
				<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-tint text-[13px] font-bold text-blue-bright">
					{getInitials(appointment.donorName)}
				</span>

				<span className="flex min-w-0 flex-1 flex-col">
					<span className="truncate text-[15px] font-bold leading-tight text-ink">
						{appointment.donorName}
					</span>
					<span className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-3">
						<IconeDaEtapa className="size-3.5 shrink-0" />
						<span className="truncate">{appointment.stepName}</span>
					</span>
				</span>
			</div>

			<div className="flex flex-wrap items-center gap-1.5">
				<span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-ink-2">
					<Calendar className="size-3.5 shrink-0 text-ink-3" />
					{appointment.dateSet
						? formatCreatedAt(appointment.dateSet)
						: "Sem data"}
				</span>
			</div>

			<span className="flex min-w-0 items-center gap-1.5 text-[12px] text-ink-3">
				<MapPin className="size-3.5 shrink-0" />
				<span className="truncate">{appointment.locationName}</span>
			</span>

			<span
				className={cn(
					"flex items-center gap-1.5 border-t border-surface-3 pt-2.5 text-[12px] font-semibold",
					dica.highlighted ? "text-blue-bright" : "text-ink-3",
				)}
			>
				<FileText className="size-3.5 shrink-0" />
				<span className="truncate">{dica.text}</span>
			</span>
		</button>
	);
}
