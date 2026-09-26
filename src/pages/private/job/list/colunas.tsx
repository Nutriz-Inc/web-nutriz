import { FileText } from "lucide-react";
import type { ColunaDaLista } from "@/components/full/ListaDeDados";
import { StatusBadge } from "@/components/full/StatusBadge";
import { cn } from "@/lib/utils";
import { formatDateTimeParts } from "@/utils/formatter";
import { jobToken } from "@/utils/status";
import type { Appointment } from "../types";
import { resumoDoRelatorio } from "./utils";

function dataEHora(appointment: Appointment) {
	if (!appointment.dateSet) return "—";

	const { date, time } = formatDateTimeParts(appointment.dateSet);
	return `${date} · ${time}`;
}

export function colunasDoAgendamento({
	mostrarEnfermagem,
	podePreencher,
}: {
	mostrarEnfermagem: boolean;
	podePreencher: boolean;
}): ColunaDaLista<Appointment>[] {
	const colunas: ColunaDaLista<Appointment>[] = [
		{
			chave: "doadora",
			titulo: "Doadora",
			largura: "minmax(0,1.5fr)",
			papel: "principal",
			celula: (appointment) => (
				<span className="block truncate text-corpo font-semibold text-ink">
					{appointment.donorName}
				</span>
			),
		},
		{
			chave: "situacao",
			titulo: "Situação",
			largura: "minmax(0,1fr)",
			papel: "situacao",
			celula: (appointment) => (
				<StatusBadge token={jobToken(appointment.status)} />
			),
		},
		{
			chave: "etapa",
			titulo: "Etapa",
			largura: "minmax(0,1.1fr)",
			celula: (appointment) => appointment.stepName,
		},
		{
			chave: "quando",
			titulo: "Data e hora",
			largura: "minmax(0,1.2fr)",
			celula: dataEHora,
		},
	];

	if (mostrarEnfermagem) {
		colunas.push({
			chave: "enfermagem",
			titulo: "Enfermagem",
			largura: "minmax(0,1.2fr)",
			celula: (appointment) => appointment.nurseName ?? "Não atribuída",
		});
	}

	colunas.push(
		{
			chave: "local",
			titulo: "Local",
			largura: "minmax(0,1.8fr)",
			larga: true,
			celula: (appointment) => appointment.locationName,
		},
		{
			chave: "relatorio",
			titulo: "Relatório",
			largura: "minmax(0,0.9fr)",
			alinhar: "fim",
			celula: (appointment) => {
				const resumo = resumoDoRelatorio(appointment, podePreencher);

				return (
					<span
						className={cn(
							"inline-flex items-center gap-1.5 font-semibold",
							resumo.destaque ? "text-blue-bright" : "text-ink-3",
						)}
					>
						<FileText className="size-4 shrink-0" aria-hidden="true" />
						{resumo.texto}
					</span>
				);
			},
		},
	);

	return colunas;
}
