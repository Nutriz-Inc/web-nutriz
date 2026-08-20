import { Fragment, useState } from "react";
import nadaPorAqui from "@/assets/illustrations/nada-por-aqui.svg";
import { EmptyState } from "@/components/full/EmptyState";
import {
	type FilterChipOption,
	FilterChips,
} from "@/components/full/FilterChips";
import type { IJobResponse } from "@/services/types/i-job";
import { EnumJobStatus } from "@/services/types/i-job";
import { APPOINTMENTS_GRID_COLS } from "../constants";
import { InfoCard } from "./InfoCard";
import { NurseAppointmentRow } from "./NurseAppointmentRow";

type AppointmentFilter = "all" | "pending" | "done";

const FILTER_OPTIONS: FilterChipOption<AppointmentFilter>[] = [
	{ key: "all", label: "Todos" },
	{ key: "pending", label: "Em andamento" },
	{ key: "done", label: "Concluídos" },
];

const COLUMN_LABELS = [
	"Doadora",
	"Etapa",
	"Data",
	"Horário",
	"Local",
	"Status",
	"",
];

type NurseAppointmentsCardProps = {
	jobs: IJobResponse[];
};

export function NurseAppointmentsCard({ jobs }: NurseAppointmentsCardProps) {
	const [filter, setFilter] = useState<AppointmentFilter>("all");

	const filtered = jobs.filter((job) => {
		if (filter === "pending") return job.status === EnumJobStatus.Pending;
		if (filter === "done") return job.status === EnumJobStatus.Done;
		return true;
	});

	return (
		<InfoCard
			title="Agendamentos Vinculados"
			description={`${jobs.length} ${jobs.length === 1 ? "agendamento encontrado" : "agendamentos encontrados"} para este(a) enfermeiro(a)`}
			actionSlot={
				<div className="flex items-center gap-2 overflow-x-auto pb-1">
					<FilterChips
						options={FILTER_OPTIONS}
						value={filter}
						onChange={setFilter}
					/>
				</div>
			}
		>
			{filtered.length === 0 ? (
				<EmptyState
					size="sm"
					illustration={nadaPorAqui}
					title="Nenhum agendamento encontrado"
					description="Ajuste o filtro selecionado."
				/>
			) : (
				<div className="overflow-hidden rounded-xl border border-surface-3">
					<div
						className={`hidden bg-surface-2 px-4 py-3 lg:grid ${APPOINTMENTS_GRID_COLS} lg:gap-3`}
					>
						{COLUMN_LABELS.map((label) => (
							<span
								key={label || "actions"}
								className="text-[11px] font-semibold uppercase tracking-wide text-ink-3"
							>
								{label}
							</span>
						))}
					</div>
					{filtered.map((job, index) => (
						<Fragment key={job.id_job}>
							{index > 0 && <div className="h-px bg-surface-3" />}
							<NurseAppointmentRow job={job} />
						</Fragment>
					))}
				</div>
			)}
		</InfoCard>
	);
}
