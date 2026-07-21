import { Plus } from "lucide-react";
import { useState } from "react";
import type { EnumJobStatus, Job } from "@/services/types/i-job";
import type { User } from "@/services/types/i-user";
import { StepJobCard } from "./StepJobCard";

type CreateParams = { id_user: string; description: string };
type UpdateParams = CreateParams & { status: EnumJobStatus };

type Props = {
	jobs: Job[];
	nurses: User[];
	disabled: boolean;
	onCreate: (data: CreateParams) => void;
	onUpdate: (id_job: string, data: UpdateParams) => void;
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
			<span className="text-[12px] font-semibold text-[#6b7280]">
				Agendamentos com enfermeiros
			</span>

			{jobs.length === 0 && !showNewForm && (
				<p className="text-[13px] text-[#9ca3af]">
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
				<div className="flex flex-col gap-2.5 rounded-[12px] border border-[#54b2e3] bg-white p-3.5">
					<select
						value={nurseId}
						onChange={(event) => setNurseId(event.target.value)}
						className="rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3 py-2 text-[13px] text-[#1f2a37] outline-none"
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
						className="rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3 py-2 text-[13px] text-[#1f2a37] outline-none placeholder:text-[#9ca3af]"
					/>

					<div className="flex gap-2">
						<button
							type="button"
							onClick={handleCreate}
							disabled={disabled || !nurseId || !description}
							className="rounded-lg bg-[#00458b] px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-60"
						>
							Adicionar agendamento
						</button>
						<button
							type="button"
							onClick={() => setShowNewForm(false)}
							className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-[#6b7280]"
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
					className="flex items-center gap-1.5 self-start rounded-lg border border-dashed border-[#54b2e3] px-3 py-1.5 text-[12px] font-semibold text-[#00458b] disabled:opacity-60"
				>
					<Plus className="size-3.5" />
					Adicionar agendamento
				</button>
			)}
		</div>
	);
}
