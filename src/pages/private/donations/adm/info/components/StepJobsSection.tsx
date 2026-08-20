import { Plus } from "lucide-react";
import { useState } from "react";
import type { Job } from "@/services/types/i-job";
import type { User } from "@/services/types/i-user";
import { StepJobCard } from "./StepJobCard";

type JobParams = { id_user: string; description: string };

type Props = {
	jobs: Job[];
	nurses: User[];
	disabled: boolean;
	onCreate: (data: JobParams) => void;
	onUpdate: (id_job: string, data: JobParams) => void;
	onRemove: (id_job: string) => void;
};

export function StepJobsSection({
	jobs,
	nurses,
	disabled,
	onCreate,
	onUpdate,
	onRemove,
}: Props) {
	const [showNewForm, setShowNewForm] = useState(false);
	const [nurseId, setNurseId] = useState("");
	const [description, setDescription] = useState("");

	function handleCreate() {
		if (!nurseId || !description) return;

		onCreate({ id_user: nurseId, description });
		setShowNewForm(false);
		setNurseId("");
		setDescription("");
	}

	return (
		<div className="flex flex-col gap-2.5">
			<span className="text-[12px] font-semibold text-ink-2">
				Agendamentos com enfermeiros
			</span>

			{jobs.length === 0 && !showNewForm && (
				<p className="text-[13px] text-ink-3">
					Nenhum agendamento com enfermeiro para esta etapa.
				</p>
			)}

			{jobs.map((job) => (
				<StepJobCard
					key={job.id_job}
					job={job}
					nurses={nurses}
					disabled={disabled}
					onSave={(data) => onUpdate(job.id_job, data)}
					onRemove={() => onRemove(job.id_job)}
				/>
			))}

			{showNewForm ? (
				<div className="flex flex-col gap-2.5 rounded-xl border border-blue-bright bg-white p-3.5">
					<select
						value={nurseId}
						onChange={(event) => setNurseId(event.target.value)}
						className="rounded-xl border-[1.5px] border-blue-bright bg-white px-3 py-2 text-[13px] text-ink outline-none"
					>
						<option value="">Selecione um enfermeiro</option>
						{nurses.map((nurse) => (
							<option key={nurse.id_user} value={nurse.id_user}>
								{nurse.name}
							</option>
						))}
					</select>

					<textarea
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						rows={2}
						placeholder="Descrição do atendimento"
						className="rounded-xl border-[1.5px] border-blue-bright bg-white px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-3"
					/>

					<div className="flex gap-2">
						<button
							type="button"
							onClick={handleCreate}
							disabled={disabled || !nurseId || !description}
							className="rounded-full bg-blue-deep hover:bg-blue px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-60"
						>
							Adicionar agendamento
						</button>
						<button
							type="button"
							onClick={() => setShowNewForm(false)}
							className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-ink-2"
						>
							Cancelar
						</button>
					</div>
				</div>
			) : (
				<button
					type="button"
					onClick={() => setShowNewForm(true)}
					disabled={disabled || nurses.length === 0}
					className="flex items-center gap-1.5 self-start rounded-lg border border-dashed border-blue-bright px-3 py-1.5 text-[12px] font-semibold text-blue-deep disabled:opacity-60"
				>
					<Plus className="size-3.5" />
					Adicionar agendamento
				</button>
			)}
		</div>
	);
}
