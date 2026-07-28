import { Fragment, useState } from "react";
import {
	type FilterChipOption,
	FilterChips,
} from "@/components/full/FilterChips";
import { SearchBar } from "@/components/full/SearchBar";
import { EnumDonationStepName } from "@/services/types/i-donation";
import type { IJobResponse } from "@/services/types/i-job";
import { EnumJobStatus } from "@/services/types/i-job";
import { formatDateBR } from "@/utils/formatter";
import { APPOINTMENTS_GRID_COLS } from "../constants";
import { formatJobLocation, toStepName } from "../utils";
import { InfoCard } from "./InfoCard";
import { NurseAppointmentRow } from "./NurseAppointmentRow";

type AppointmentFilter = "all" | "exams" | "collect" | "done";

const FILTER_OPTIONS: FilterChipOption<AppointmentFilter>[] = [
	{ key: "all", label: "Todos" },
	{ key: "exams", label: "Exames" },
	{ key: "collect", label: "Coleta" },
	{ key: "done", label: "Concluídos" },
];

const COLUMN_LABELS = [
	"Doadora",
	"Etapa",
	"Data",
	"Horário",
	"Local",
	"Status",
];

type NurseAppointmentsCardProps = {
	jobs: IJobResponse[];
};

export function NurseAppointmentsCard({ jobs }: NurseAppointmentsCardProps) {
	const [filter, setFilter] = useState<AppointmentFilter>("all");
	const [search, setSearch] = useState("");

	const filtered = jobs.filter((job) => {
		if (
			filter === "exams" &&
			toStepName(job.name) !== EnumDonationStepName.BloodTest
		) {
			return false;
		}
		if (
			filter === "collect" &&
			toStepName(job.name) !== EnumDonationStepName.CollectMilk
		) {
			return false;
		}
		if (filter === "done" && job.status !== EnumJobStatus.Done) {
			return false;
		}

		if (!search.trim()) return true;

		const term = search.trim().toLowerCase();
		const haystack = [
			job.user_common_name ?? "",
			formatJobLocation(job.address),
			job.date_set ? formatDateBR(job.date_set) : "",
		]
			.join(" ")
			.toLowerCase();

		return haystack.includes(term);
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
			<div className="flex flex-col gap-4">
				<SearchBar
					value={search}
					onChange={setSearch}
					placeholder="Buscar por doadora, endereço ou data..."
				/>

				{filtered.length === 0 ? (
					<p className="text-[13px] text-[#9ca3af]">
						Nenhum agendamento encontrado para o filtro selecionado.
					</p>
				) : (
					<div className="overflow-hidden rounded-xl border border-[#eef1f5]">
						<div
							className={`hidden bg-[#f8fafc] px-4 py-3 lg:grid ${APPOINTMENTS_GRID_COLS} lg:gap-3`}
						>
							{COLUMN_LABELS.map((label) => (
								<span
									key={label}
									className="text-[11px] font-semibold uppercase tracking-wide text-[#9ca3af]"
								>
									{label}
								</span>
							))}
						</div>
						{filtered.map((job, index) => (
							<Fragment key={job.id_job}>
								{index > 0 && <div className="h-px bg-[#eef1f5]" />}
								<NurseAppointmentRow job={job} />
							</Fragment>
						))}
					</div>
				)}
			</div>
		</InfoCard>
	);
}
