import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";
import type { EnumJobStatus, Job } from "@/services/types/i-job";
import type { Address } from "@/services/types/i-user";
import {
	useCreateDonationStep,
	useCreateStepJob,
	useNurses,
	useRemoveStepJob,
	useUpdateDonationStep,
	useUpdateStepJob,
} from "../hooks";
import {
	combineDateTime,
	formatAddressLine,
	toDateInputValue,
	toTimeInputValue,
} from "../utils";
import { StepActionsFooter } from "./StepActionsFooter";
import { StepCardHeader } from "./StepCardHeader";
import { StepCreateForm } from "./StepCreateForm";
import { StepDoneFooter } from "./StepDoneFooter";
import { StepEditableForm } from "./StepEditableForm";
import { StepFailedFooter } from "./StepFailedFooter";
import { StepLockedCard } from "./StepLockedCard";
import { StepReadOnlyInfo } from "./StepReadOnlyInfo";
import type { StepDefinition } from "../../../common/info/constants";
import { useStepAddress } from "../../../common/step-detail/hooks";
import { StepTimelineSheet } from "../../../common/step-detail/components/StepTimelineSheet";

type Props = {
	idDonation: string;
	idUserCommon?: string;
	definition: StepDefinition;
	step?: DonationStep;
	visualStatus: "done" | "current" | "locked";
	donorAddresses: Address[];
	onFinalized?: () => void;
	donationEnded?: boolean;
	jobs: Job[];
	jobsLoading: boolean;
};

export function AdminStepCard({
	idDonation,
	idUserCommon,
	definition,
	step,
	visualStatus,
	donorAddresses,
	onFinalized,
	donationEnded,
	jobs,
	jobsLoading,
}: Props) {
	const [timelineOpen, setTimelineOpen] = useState(false);
	const [date, setDate] = useState(() => toDateInputValue(step?.set_date));
	const [time, setTime] = useState(() => toTimeInputValue(step?.set_date));
	const [stepDescription, setStepDescription] = useState(
		() => step?.description ?? "",
	);
	const [selectedStatus, setSelectedStatus] = useState(
		() => step?.status ?? EnumDonationStepStatus.Pending,
	);
	const [finalizeDescription, setFinalizeDescription] = useState("");
	const [errorDescription, setErrorDescription] = useState("");

	const [addressMode, setAddressMode] = useState<"existing" | "new">(() =>
		donorAddresses.length > 0 ? "existing" : "new",
	);
	const [selectedAddressId, setSelectedAddressId] = useState(
		() => step?.id_address ?? donorAddresses[0]?.id_address ?? "",
	);
	const [zipCode, setZipCode] = useState("");
	const [number, setNumber] = useState("");
	const [complement, setComplement] = useState("");

	const { addressQuery } = useStepAddress(step?.id_address);
	const address = addressQuery.data;
	const addressText = address ? formatAddressLine(address) : undefined;

	const nursesQuery = useNurses();
	const nurses = nursesQuery.data ?? [];
	const nurseNames = jobs
		.map((job) => nurses.find((nurse) => nurse.id_user === job.id_user)?.name)
		.filter(Boolean)
		.join(", ");

	const updateStepMutation = useUpdateDonationStep(idDonation);
	const createStepMutation = useCreateDonationStep(idDonation);
	const createJobMutation = useCreateStepJob(idUserCommon);
	const updateJobMutation = useUpdateStepJob(idUserCommon);
	const removeJobMutation = useRemoveStepJob(idUserCommon);

	if (visualStatus === "locked") {
		return (
			<StepLockedCard label={definition.name} donationEnded={donationEnded} />
		);
	}

	const isDone = step?.status === EnumDonationStepStatus.Done;
	const isFailed = step?.status === EnumDonationStepStatus.Failed;
	const isLocked = isDone || isFailed;

	function buildAddressPayload() {
		if (addressMode === "new") {
			if (!zipCode) return {};
			return {
				address: {
					zip_code: zipCode.replace(/\D/g, ""),
					number: number || undefined,
					complement: complement || undefined,
				},
			};
		}
		return selectedAddressId ? { id_address: selectedAddressId } : {};
	}

	function handleSaveSchedule() {
		if (!step) return;
		updateStepMutation.mutate({
			id_donation_step: step.id_donation_step,
			data: {
				description: stepDescription,
				set_date: combineDateTime(date, time),
				status: selectedStatus,
				...buildAddressPayload(),
			},
		});
	}

	function handleFinalize() {
		if (!step) return;
		updateStepMutation.mutate(
			{
				id_donation_step: step.id_donation_step,
				data: {
					status: EnumDonationStepStatus.Done,
					description: finalizeDescription,
				},
			},
			{ onSuccess: () => onFinalized?.() },
		);
	}

	function handleMarkAsError() {
		if (!step) return;
		updateStepMutation.mutate({
			id_donation_step: step.id_donation_step,
			data: {
				status: EnumDonationStepStatus.Failed,
				description: errorDescription,
			},
		});
	}

	function handleCreate() {
		createStepMutation.mutate({
			id_donation: idDonation,
			name: definition.name,
			description: stepDescription,
			set_date: combineDateTime(date, time),
			...buildAddressPayload(),
		});
	}

	function handleCreateJob(data: { id_user: string; description: string }) {
		if (!step) return;
		createJobMutation.mutate({
			id_user: data.id_user,
			id_step: step.id_donation_step,
			name: definition.name,
			description: data.description,
			date_set: step.set_date,
		});
	}

	function handleUpdateJob(
		id_job: string,
		data: { id_user: string; description: string; status: EnumJobStatus },
	) {
		updateJobMutation.mutate({
			id_job,
			data: { ...data, date_set: step?.set_date },
		});
	}

	function handleRemoveJob(id_job: string) {
		removeJobMutation.mutate(id_job);
	}

	const scheduleChanged =
		Boolean(step) &&
		(date !== toDateInputValue(step?.set_date) ||
			time !== toTimeInputValue(step?.set_date) ||
			(addressMode === "existing" && selectedAddressId !== step?.id_address) ||
			(addressMode === "new" && Boolean(zipCode)));

	const descriptionChanged =
		Boolean(step) && stepDescription !== (step?.description ?? "");

	const statusChanged = Boolean(step) && selectedStatus !== step?.status;

	const addressPickerProps = {
		donorAddresses,
		addressMode,
		selectedAddressId,
		onSelectExisting: (id: string) => {
			setAddressMode("existing");
			setSelectedAddressId(id);
		},
		onSelectNew: () => setAddressMode("new"),
		zipCode,
		onZipCodeChange: setZipCode,
		number,
		onNumberChange: setNumber,
		complement,
		onComplementChange: setComplement,
	};

	return (
		<div className="flex flex-col gap-5 rounded-2xl border border-[#e7eaef] bg-white p-6">
			<StepCardHeader
				icon={definition.icon}
				label={definition.name}
				isDone={isDone}
				isFailed={isFailed}
				hasStep={Boolean(step)}
				onViewTimeline={() => setTimelineOpen(true)}
			/>

			<div className="h-px bg-[#e7eaef]" />

			{!step ? (
				<StepCreateForm
					date={date}
					onDateChange={setDate}
					time={time}
					onTimeChange={setTime}
					{...addressPickerProps}
					description={stepDescription}
					onDescriptionChange={setStepDescription}
					isPending={createStepMutation.isPending}
					onCreate={handleCreate}
				/>
			) : (
				<>
					{isFailed && (
						<div className="flex items-center gap-2.5 rounded-xl border border-[#f3caca] bg-[#fcebeb] px-4 py-3">
							<AlertTriangle className="size-4 shrink-0 text-[#a32d2d]" />
							<p className="text-[13px] font-semibold text-[#a32d2d]">
								Etapa marcada como erro — a doação foi encerrada.
							</p>
						</div>
					)}

					<div className="flex flex-col gap-3.5">
						{!isLocked && (
							<p className="text-[11px] font-bold tracking-[0.6px] text-[#00458b]">
								DADOS DO AGENDAMENTO · EDITÁVEL
							</p>
						)}

						{isLocked ? (
							<StepReadOnlyInfo
								step={step}
								addressText={addressText}
								nurseNames={nurseNames}
							/>
						) : (
							<StepEditableForm
								date={date}
								onDateChange={setDate}
								time={time}
								onTimeChange={setTime}
								selectedStatus={selectedStatus}
								onStatusChange={setSelectedStatus}
								{...addressPickerProps}
								description={stepDescription}
								onDescriptionChange={setStepDescription}
								onSave={handleSaveSchedule}
								saveDisabled={
									!(scheduleChanged || descriptionChanged || statusChanged)
								}
								isPending={updateStepMutation.isPending}
								jobs={jobs}
								jobsLoading={jobsLoading}
								nurses={nurses}
								jobMutationsPending={
									createJobMutation.isPending ||
									updateJobMutation.isPending ||
									removeJobMutation.isPending
								}
								onCreateJob={handleCreateJob}
								onUpdateJob={handleUpdateJob}
								onRemoveJob={handleRemoveJob}
							/>
						)}
					</div>

					<div className="h-px bg-[#e7eaef]" />

					{isDone ? (
						<StepDoneFooter step={step} />
					) : isFailed ? (
						<StepFailedFooter step={step} />
					) : (
						<StepActionsFooter
							definitionLabel={definition.name}
							isPending={updateStepMutation.isPending}
							stepDescription={stepDescription}
							finalizeDescription={finalizeDescription}
							onFinalizeDescriptionChange={setFinalizeDescription}
							onFinalize={handleFinalize}
							errorDescription={errorDescription}
							onErrorDescriptionChange={setErrorDescription}
							onMarkAsError={handleMarkAsError}
						/>
					)}
				</>
			)}

			{step && (
				<StepTimelineSheet
					open={timelineOpen}
					onOpenChange={setTimelineOpen}
					idDonationStep={step.id_donation_step}
					stepOrder={definition.order}
					stepTitle={definition.name}
				/>
			)}
		</div>
	);
}
