import { Calendar, Clock } from "lucide-react";
import type { EnumDonationStepStatus } from "@/services/types/i-donation";
import type { EnumJobStatus, Job } from "@/services/types/i-job";
import type { Address, User } from "@/services/types/i-user";
import { ADMIN_STEP_STATUS_LABEL, EDITABLE_STATUSES } from "../constants";
import { StepAddressPicker } from "./StepAddressPicker";
import { StepJobsSection } from "./StepJobsSection";

type Props = {
	date: string;
	onDateChange: (value: string) => void;
	time: string;
	onTimeChange: (value: string) => void;
	selectedStatus: EnumDonationStepStatus;
	onStatusChange: (value: EnumDonationStepStatus) => void;
	donorAddresses: Address[];
	addressMode: "existing" | "new";
	selectedAddressId: string;
	onSelectExisting: (id: string) => void;
	onSelectNew: () => void;
	zipCode: string;
	onZipCodeChange: (value: string) => void;
	number: string;
	onNumberChange: (value: string) => void;
	complement: string;
	onComplementChange: (value: string) => void;
	description: string;
	onDescriptionChange: (value: string) => void;
	onSave: () => void;
	saveDisabled: boolean;
	isPending: boolean;
	jobs: Job[];
	jobsLoading: boolean;
	nurses: User[];
	jobMutationsPending: boolean;
	onCreateJob: (data: { id_user: string; description: string }) => void;
	onUpdateJob: (
		id_job: string,
		data: { id_user: string; description: string; status: EnumJobStatus },
	) => void;
	onRemoveJob: (id_job: string) => void;
};

export function StepEditableForm({
	date,
	onDateChange,
	time,
	onTimeChange,
	selectedStatus,
	onStatusChange,
	donorAddresses,
	addressMode,
	selectedAddressId,
	onSelectExisting,
	onSelectNew,
	zipCode,
	onZipCodeChange,
	number,
	onNumberChange,
	complement,
	onComplementChange,
	description,
	onDescriptionChange,
	onSave,
	saveDisabled,
	isPending,
	jobs,
	jobsLoading,
	nurses,
	jobMutationsPending,
	onCreateJob,
	onUpdateJob,
	onRemoveJob,
}: Props) {
	return (
		<>
			<div className="flex flex-col gap-3.5 lg:flex-row">
				<label className="flex flex-1 flex-col gap-1.5">
					<span className="text-[12px] font-semibold text-[#6b7280]">
						Data do agendamento
					</span>
					<div className="flex items-center gap-2 rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3">
						<Calendar className="size-4 shrink-0 text-[#00458b]" />
						<input
							type="date"
							value={date}
							onChange={(event) => onDateChange(event.target.value)}
							className="w-full bg-transparent text-[14px] text-[#1f2a37] outline-none"
						/>
					</div>
				</label>

				<label className="flex flex-1 flex-col gap-1.5">
					<span className="text-[12px] font-semibold text-[#6b7280]">
						Horário do agendamento
					</span>
					<div className="flex items-center gap-2 rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3">
						<Clock className="size-4 shrink-0 text-[#00458b]" />
						<input
							type="time"
							value={time}
							onChange={(event) => onTimeChange(event.target.value)}
							className="w-full bg-transparent text-[14px] text-[#1f2a37] outline-none"
						/>
					</div>
				</label>
			</div>

			<label className="flex flex-col gap-1.5">
				<span className="text-[12px] font-semibold text-[#6b7280]">
					Status da etapa
				</span>
				<select
					value={selectedStatus}
					onChange={(event) =>
						onStatusChange(event.target.value as EnumDonationStepStatus)
					}
					disabled={isPending}
					className="rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none disabled:opacity-60"
				>
					{EDITABLE_STATUSES.map((status) => (
						<option key={status} value={status}>
							{ADMIN_STEP_STATUS_LABEL[status]}
						</option>
					))}
				</select>
			</label>

			<StepAddressPicker
				addresses={donorAddresses}
				mode={addressMode}
				selectedAddressId={selectedAddressId}
				onSelectExisting={onSelectExisting}
				onSelectNew={onSelectNew}
				zipCode={zipCode}
				onZipCodeChange={onZipCodeChange}
				number={number}
				onNumberChange={onNumberChange}
				complement={complement}
				onComplementChange={onComplementChange}
			/>

			<label className="flex flex-col gap-1.5">
				<span className="text-[12px] font-semibold text-[#6b7280]">
					Descrição da etapa
				</span>
				<textarea
					value={description}
					onChange={(event) => onDescriptionChange(event.target.value)}
					rows={2}
					placeholder="Descreva o que será feito nesta etapa"
					className="rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none placeholder:text-[#9ca3af]"
				/>
			</label>

			<button
				type="button"
				onClick={onSave}
				disabled={isPending || saveDisabled}
				className="self-start rounded-[10px] bg-[#00458b] px-5 py-2.5 text-[14px] font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
			>
				Salvar
			</button>

			<div className="h-px bg-[#e7eaef]" />

			{!jobsLoading && (
				<StepJobsSection
					jobs={jobs}
					nurses={nurses}
					disabled={jobMutationsPending}
					onCreate={onCreateJob}
					onUpdate={onUpdateJob}
					onRemove={onRemoveJob}
				/>
			)}
		</>
	);
}
