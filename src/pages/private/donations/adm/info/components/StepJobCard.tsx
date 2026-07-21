import { Calendar, Pencil, Trash2, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { getInitials } from "@/components/layout/utils";
import { cn } from "@/lib/utils";
import { EnumJobStatus, type Job } from "@/services/types/i-job";
import type { User } from "@/services/types/i-user";
import { formatCreatedAt } from "@/utils/formatter";
import { JOB_STATUS_BADGE_CLASSNAME, JOB_STATUS_LABEL } from "../constants";

type SaveParams = {
	id_user: string;
	description: string;
	status: EnumJobStatus;
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
	const [status, setStatus] = useState(job.status);
	const [description, setDescription] = useState(job.description);

	const nurseName =
		nurses.find((nurse) => nurse.id_user === job.id_user)?.name ?? "—";

	function handleStartEdit() {
		setNurseId(job.id_user);
		setStatus(job.status);
		setDescription(job.description);
		setIsEditing(true);
	}

	function handleSave() {
		onSave({ id_user: nurseId, status, description });
		setIsEditing(false);
	}

	if (!isEditing) {
		return (
			<div className="flex flex-col gap-3 rounded-[14px] border border-[#e7eaef] bg-white p-4 shadow-[0px_4px_10px_rgba(15,26,51,0.05)]">
				<div className="flex items-start justify-between gap-3">
					<div className="flex items-center gap-3">
						<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e1f1fb] text-[13px] font-bold text-[#00458b]">
							{getInitials(nurseName)}
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-[13px] font-semibold text-[#1f2a37]">
								{nurseName}
							</span>
							<span
								className={cn(
									"w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.3px]",
									JOB_STATUS_BADGE_CLASSNAME[job.status],
								)}
							>
								{JOB_STATUS_LABEL[job.status]}
							</span>
						</div>
					</div>

					<div className="flex shrink-0 items-center gap-1">
						<button
							type="button"
							onClick={handleStartEdit}
							disabled={disabled}
							aria-label="Editar agendamento"
							className="flex items-center justify-center rounded-lg p-2 text-[#00458b] hover:bg-[#eef3f8] disabled:opacity-60"
						>
							<Pencil className="size-3.5" />
						</button>
						<button
							type="button"
							onClick={onRemove}
							disabled={disabled}
							aria-label="Remover agendamento"
							className="flex items-center justify-center rounded-lg p-2 text-[#df5a7a] hover:bg-[#fbe8ec] disabled:opacity-60"
						>
							<Trash2 className="size-3.5" />
						</button>
					</div>
				</div>

				{(job.date_set || job.description) && (
					<div className="h-px bg-[#e7eaef]" />
				)}

				{job.date_set && (
					<div className="flex items-center gap-2 text-[12px] text-[#6b7280]">
						<Calendar className="size-3.5 shrink-0 text-[#9ca3af]" />
						{formatCreatedAt(job.date_set)}
					</div>
				)}

				{job.description && (
					<p className="text-[12px] leading-[18px] text-[#6b7280]">
						{job.description}
					</p>
				)}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2.5 rounded-[14px] border border-[#54b2e3] bg-white p-4 shadow-[0px_4px_10px_rgba(15,26,51,0.05)]">
			<div className="flex flex-col gap-2.5 lg:flex-row">
				<div className="flex flex-1 items-center gap-2">
					<UserIcon className="size-4 shrink-0 text-[#9ca3af]" />
					<select
						value={nurseId}
						onChange={(event) => setNurseId(event.target.value)}
						disabled={disabled}
						className="w-full rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3 py-2 text-[13px] text-[#1f2a37] outline-none disabled:opacity-60"
					>
						{nurses.map((nurse) => (
							<option key={nurse.id_user} value={nurse.id_user}>
								{nurse.name}
							</option>
						))}
					</select>
				</div>

				<select
					value={status}
					onChange={(event) => setStatus(event.target.value as EnumJobStatus)}
					disabled={disabled}
					className="rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3 py-2 text-[13px] text-[#1f2a37] outline-none disabled:opacity-60"
				>
					{Object.values(EnumJobStatus).map((value) => (
						<option key={value} value={value}>
							{JOB_STATUS_LABEL[value]}
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
				className="rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3 py-2 text-[13px] text-[#1f2a37] outline-none placeholder:text-[#9ca3af] disabled:opacity-60"
			/>

			<div className="flex gap-2">
				<button
					type="button"
					onClick={handleSave}
					disabled={disabled || !description}
					className="rounded-lg bg-[#00458b] px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-60"
				>
					Salvar
				</button>
				<button
					type="button"
					onClick={() => setIsEditing(false)}
					disabled={disabled}
					className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-[#6b7280] disabled:opacity-60"
				>
					Cancelar
				</button>
			</div>
		</div>
	);
}
