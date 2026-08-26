import { Calendar, Pencil, Trash2, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { getInitials } from "@/components/layout/utils";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/services/types/i-job";
import type { User } from "@/services/types/i-user";
import { formatCreatedAt } from "@/utils/formatter";
import { JOB_STATUS_LABEL, JOB_STATUS_TONE } from "../constants";

type SaveParams = {
	id_user: string;
	description: string;
};

type Props = {
	job: Job;
	nurses: User[];
	disabled: boolean;
	onSave: (data: SaveParams) => void;
	onRemove: () => void;
};

export function StepJobCard({
	job,
	nurses,
	disabled,
	onSave,
	onRemove,
}: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [nurseId, setNurseId] = useState(job.id_user);
	const [description, setDescription] = useState(job.description);

	const nurseName =
		nurses.find((nurse) => nurse.id_user === job.id_user)?.name ?? "—";

	function handleStartEdit() {
		setNurseId(job.id_user);
		setDescription(job.description);
		setIsEditing(true);
	}

	function handleSave() {
		onSave({ id_user: nurseId, description });
		setIsEditing(false);
	}

	if (!isEditing) {
		return (
			<div className="flex flex-col gap-3 rounded-card-sm border border-line bg-white p-4 shadow-soft">
				<div className="flex items-start justify-between gap-3">
					<div className="flex items-center gap-3">
						<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-tint text-[13px] font-bold text-blue-deep">
							{getInitials(nurseName)}
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-[13px] font-semibold text-ink">
								{nurseName}
							</span>
							<Badge tone={JOB_STATUS_TONE[job.status]} size="sm" caps>
								{JOB_STATUS_LABEL[job.status]}
							</Badge>
						</div>
					</div>

					<div className="flex shrink-0 items-center gap-1">
						<button
							type="button"
							onClick={handleStartEdit}
							disabled={disabled}
							aria-label="Editar agendamento"
							className="flex items-center justify-center rounded-lg p-2 text-blue-deep hover:bg-blue-tint disabled:opacity-60"
						>
							<Pencil className="size-3.5" />
						</button>
						<button
							type="button"
							onClick={onRemove}
							disabled={disabled}
							aria-label="Remover agendamento"
							className="flex items-center justify-center rounded-lg p-2 text-eva-deep hover:bg-eva-tint disabled:opacity-60"
						>
							<Trash2 className="size-3.5" />
						</button>
					</div>
				</div>

				{(job.date_set || job.description) && (
					<div className="h-px bg-blue-tint" />
				)}

				{job.date_set && (
					<div className="flex items-center gap-2 text-[12px] text-ink-2">
						<Calendar className="size-3.5 shrink-0 text-ink-3" />
						{formatCreatedAt(job.date_set)}
					</div>
				)}

				{job.description && (
					<p className="text-[12px] leading-[18px] text-ink-2">
						{job.description}
					</p>
				)}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2.5 rounded-2xl border border-blue-bright bg-white p-4 shadow-soft">
			<div className="flex items-center gap-2">
				<UserIcon className="size-4 shrink-0 text-ink-3" />
				<select
					value={nurseId}
					onChange={(event) => setNurseId(event.target.value)}
					disabled={disabled}
					className="w-full rounded-xl border-[1.5px] border-blue-bright bg-white px-3 py-2 text-[13px] text-ink outline-none disabled:opacity-60"
				>
					{nurses.map((nurse) => (
						<option key={nurse.id_user} value={nurse.id_user}>
							{nurse.name}
						</option>
					))}
				</select>
			</div>

			<textarea
				value={description}
				onChange={(event) => setDescription(event.target.value)}
				rows={2}
				disabled={disabled}
				placeholder="Descrição do atendimento"
				className="rounded-xl border-[1.5px] border-blue-bright bg-white px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-3 disabled:opacity-60"
			/>

			<div className="flex gap-2">
				<button
					type="button"
					onClick={handleSave}
					disabled={disabled || !description}
					className="rounded-full bg-blue-deep hover:bg-blue px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-60"
				>
					Salvar
				</button>
				<button
					type="button"
					onClick={() => setIsEditing(false)}
					disabled={disabled}
					className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-ink-2 disabled:opacity-60"
				>
					Cancelar
				</button>
			</div>
		</div>
	);
}
