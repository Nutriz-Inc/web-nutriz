import {
	AlertTriangle,
	Calendar,
	Check,
	Clock,
	History,
	Lock,
	MapPin,
	User,
} from "lucide-react";
import { useState } from "react";
import { Status } from "@/components/full/Status";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { StepTimelineSheet } from "@/pages/private/donations/step-detail/components/StepTimelineSheet";
import { useStepAddress } from "@/pages/private/donations/step-detail/hooks";
import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";
import type { EnumJobStatus } from "@/services/types/i-job";
import type { Address } from "@/services/types/i-user";
import { formatCreatedAt, formatDateBR } from "@/utils/formatter";
import {
	ADMIN_STEP_STATUS_LABEL,
	type AdminStepDefinition,
} from "../constants";
import {
	useCreateDonationStep,
	useCreateStepJob,
	useNurses,
	useRemoveStepJob,
	useStepJobs,
	useUpdateDonationStep,
	useUpdateStepJob,
} from "../hooks";
import { combineDateTime, toDateInputValue, toTimeInputValue } from "../utils";
import { formatAddressLine, StepAddressPicker } from "./StepAddressPicker";
import { StepJobsSection } from "./StepJobsSection";

type Props = {
	idDonation: string;
	definition: AdminStepDefinition;
	step?: DonationStep;
	visualStatus: "done" | "current" | "locked";
	donorAddresses: Address[];
	onFinalized?: () => void;
	donationEnded?: boolean;
};

export function AdminStepCard({
	idDonation,
	definition,
	step,
	visualStatus,
	donorAddresses,
	onFinalized,
	donationEnded,
}: Props) {
	const Icon = definition.icon;
	const [timelineOpen, setTimelineOpen] = useState(false);
	const [date, setDate] = useState(() => toDateInputValue(step?.set_date));
	const [time, setTime] = useState(() => toTimeInputValue(step?.set_date));
	const [stepDescription, setStepDescription] = useState(
		() => step?.description ?? "",
	);
	const [selectedStatus, setSelectedStatus] = useState(
		() => step?.status ?? EnumDonationStepStatus.Pending,
	);

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
	const jobsQuery = useStepJobs(step?.id_donation_step);
	const jobs = jobsQuery.data ?? [];
	const nurseNames = jobs
		.map((j) => nurses.find((nurse) => nurse.id_user === j.id_user)?.name)
		.filter(Boolean)
		.join(", ");

	const updateStepMutation = useUpdateDonationStep(idDonation);
	const createStepMutation = useCreateDonationStep(idDonation);
	const createJobMutation = useCreateStepJob(step?.id_donation_step);
	const updateJobMutation = useUpdateStepJob(step?.id_donation_step);
	const removeJobMutation = useRemoveStepJob(step?.id_donation_step);

	if (visualStatus === "locked") {
		if (donationEnded) {
			return (
				<div className="flex flex-col gap-5 rounded-2xl border border-[#f3caca] bg-[#fef5f5] p-6">
					<div className="flex items-center gap-3.5">
						<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#fcebeb]">
							<AlertTriangle className="size-5 text-[#a32d2d]" />
						</div>
						<p className="text-[17px] font-bold text-[#a32d2d]">
							{definition.label}
						</p>
					</div>
					<div className="flex items-center gap-2.5 rounded-xl bg-[#fcebeb] px-[18px] py-4">
						<AlertTriangle className="size-[15px] shrink-0 text-[#a32d2d]" />
						<p className="text-[13px] text-[#a32d2d]">
							Doação encerrada — uma etapa anterior foi marcada como erro.
						</p>
					</div>
				</div>
			);
		}

		return (
			<div className="flex flex-col gap-5 rounded-2xl border border-[#e7eaef] bg-[#fafbfc] p-6">
				<div className="flex items-center gap-3.5">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eef2f7]">
						<Lock className="size-5 text-[#9ca3af]" />
					</div>
					<p className="text-[17px] font-bold text-[#9ca3af]">
						{definition.label}
					</p>
				</div>
				<div className="flex items-center gap-2.5 rounded-xl bg-[#eef2f7] px-[18px] py-4">
					<Lock className="size-[15px] shrink-0 text-[#9ca3af]" />
					<p className="text-[13px] text-[#6b7280]">
						Disponível automaticamente após a conclusão da etapa anterior.
					</p>
				</div>
			</div>
		);
	}

	const isDone = step?.status === EnumDonationStepStatus.Done;
	const isFailed = step?.status === EnumDonationStepStatus.Failed;

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
				...buildAddressPayload(),
			},
		});
	}

	function handleSaveStatus() {
		if (!step) return;
		updateStepMutation.mutate({
			id_donation_step: step.id_donation_step,
			data: {
				description: stepDescription,
				status: selectedStatus,
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
					description: stepDescription,
				},
			},
			{ onSuccess: () => onFinalized?.() },
		);
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
			name: definition.label,
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

	const nonDoneStatuses = Object.values(EnumDonationStepStatus).filter(
		(status) => status !== EnumDonationStepStatus.Done,
	);

	return (
		<div className="flex flex-col gap-5 rounded-2xl border border-[#e7eaef] bg-white p-6">
			<div className="flex items-center justify-between gap-3">
				<div className="flex min-w-0 flex-1 items-center gap-3.5">
					<div
						className={cn(
							"flex size-11 shrink-0 items-center justify-center rounded-xl",
							isFailed
								? "bg-[#fcebeb] text-[#a32d2d]"
								: isDone
									? "bg-[#d9f7f4] text-[#0e9e94]"
									: "bg-[#e1f1fb] text-[#00458b]",
						)}
					>
						<Icon className="size-[18px]" />
					</div>
					<p className="truncate text-[17px] font-bold text-[#1f2a37]">
						{definition.label}
					</p>
				</div>

				{step && (
					<button
						type="button"
						onClick={() => setTimelineOpen(true)}
						className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-[#00458b] hover:bg-[#eef3f8]"
					>
						<History className="size-4" />
						Ver timeline
					</button>
				)}
			</div>

			<div className="h-px bg-[#e7eaef]" />

			{!step ? (
				<div className="flex flex-col gap-3.5">
					<p className="text-[11px] font-bold tracking-[0.6px] text-[#00458b]">
						AGENDAR ETAPA
					</p>

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
									onChange={(event) => setDate(event.target.value)}
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
									onChange={(event) => setTime(event.target.value)}
									className="w-full bg-transparent text-[14px] text-[#1f2a37] outline-none"
								/>
							</div>
						</label>
					</div>

					<StepAddressPicker
						addresses={donorAddresses}
						mode={addressMode}
						selectedAddressId={selectedAddressId}
						onSelectExisting={(id) => {
							setAddressMode("existing");
							setSelectedAddressId(id);
						}}
						onSelectNew={() => setAddressMode("new")}
						zipCode={zipCode}
						onZipCodeChange={setZipCode}
						number={number}
						onNumberChange={setNumber}
						complement={complement}
						onComplementChange={setComplement}
					/>

					<label className="flex flex-col gap-1.5">
						<span className="text-[12px] font-semibold text-[#6b7280]">
							Descrição da etapa
						</span>
						<textarea
							value={stepDescription}
							onChange={(event) => setStepDescription(event.target.value)}
							rows={2}
							placeholder="Descreva o que será feito nesta etapa"
							className="rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none placeholder:text-[#9ca3af]"
						/>
					</label>

					<button
						type="button"
						onClick={handleCreate}
						disabled={createStepMutation.isPending || !date || !stepDescription}
						className="self-start rounded-[10px] bg-[#00458b] px-5 py-2.5 text-[14px] font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
					>
						Agendar etapa
					</button>
				</div>
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
						{!isDone && (
							<p className="text-[11px] font-bold tracking-[0.6px] text-[#00458b]">
								DADOS DO AGENDAMENTO · EDITÁVEL
							</p>
						)}

						{isDone ? (
							<div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:gap-7">
								{step.set_date && (
									<div className="flex items-center gap-2.5">
										<Calendar className="size-4 shrink-0 text-[#9ca3af]" />
										<span className="text-[13px] text-[#6b7280]">
											Data e horário:
										</span>
										<span className="text-[14px] font-semibold text-[#1f2a37]">
											{formatCreatedAt(step.set_date)}
										</span>
									</div>
								)}
								{addressText && (
									<div className="flex items-center gap-2.5">
										<MapPin className="size-4 shrink-0 text-[#9ca3af]" />
										<span className="text-[13px] text-[#6b7280]">
											Endereço:
										</span>
										<span className="text-[14px] font-semibold text-[#1f2a37]">
											{addressText}
										</span>
									</div>
								)}
								{nurseNames && (
									<div className="flex items-center gap-2.5">
										<User className="size-4 shrink-0 text-[#9ca3af]" />
										<span className="text-[13px] text-[#6b7280]">
											Enfermeiro:
										</span>
										<span className="text-[14px] font-semibold text-[#1f2a37]">
											{nurseNames}
										</span>
									</div>
								)}
							</div>
						) : (
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
												onChange={(event) => setDate(event.target.value)}
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
												onChange={(event) => setTime(event.target.value)}
												className="w-full bg-transparent text-[14px] text-[#1f2a37] outline-none"
											/>
										</div>
									</label>
								</div>

								<StepAddressPicker
									addresses={donorAddresses}
									mode={addressMode}
									selectedAddressId={selectedAddressId}
									onSelectExisting={(id) => {
										setAddressMode("existing");
										setSelectedAddressId(id);
									}}
									onSelectNew={() => setAddressMode("new")}
									zipCode={zipCode}
									onZipCodeChange={setZipCode}
									number={number}
									onNumberChange={setNumber}
									complement={complement}
									onComplementChange={setComplement}
								/>

								<button
									type="button"
									onClick={handleSaveSchedule}
									disabled={updateStepMutation.isPending || !scheduleChanged}
									className="self-start rounded-lg bg-[#eef3f8] px-3 py-1.5 text-[12px] font-semibold text-[#00458b] disabled:opacity-60"
								>
									{step.set_date ? "Editar agendamento" : "Criar agendamento"}
								</button>

								<div className="h-px bg-[#e7eaef]" />

								<label className="flex flex-col gap-1.5">
									<span className="text-[12px] font-semibold text-[#6b7280]">
										Descrição da etapa
									</span>
									<textarea
										value={stepDescription}
										onChange={(event) => setStepDescription(event.target.value)}
										rows={2}
										placeholder="Descreva o que será feito nesta etapa"
										className="rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none placeholder:text-[#9ca3af]"
									/>
								</label>

								<button
									type="button"
									onClick={handleSaveSchedule}
									disabled={updateStepMutation.isPending || !descriptionChanged}
									className="self-start rounded-lg bg-[#eef3f8] px-3 py-1.5 text-[12px] font-semibold text-[#00458b] disabled:opacity-60"
								>
									Salvar descrição
								</button>

								<div className="h-px bg-[#e7eaef]" />

								{!jobsQuery.isLoading && (
									<StepJobsSection
										jobs={jobs}
										nurses={nurses}
										disabled={
											createJobMutation.isPending ||
											updateJobMutation.isPending ||
											removeJobMutation.isPending
										}
										onCreate={handleCreateJob}
										onUpdate={handleUpdateJob}
										onRemove={handleRemoveJob}
									/>
								)}
							</>
						)}
					</div>

					<div className="h-px bg-[#e7eaef]" />

					{isDone ? (
						<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex items-center gap-2">
								<span className="text-[13px] font-semibold text-[#6b7280]">
									Status da etapa:
								</span>
								<Status status={step.status} dot />
							</div>
							{step.completed_at && (
								<div className="flex items-center gap-1.5 text-[#16614a]">
									<Check className="size-3.5" />
									<span className="text-[13px] font-semibold">
										Etapa finalizada em {formatDateBR(step.completed_at)}
									</span>
								</div>
							)}
						</div>
					) : (
						<>
							<div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
								<div className="flex flex-1 items-center gap-2">
									<span className="text-[13px] font-semibold text-[#6b7280]">
										Status da etapa:
									</span>
									<select
										value={selectedStatus}
										onChange={(event) =>
											setSelectedStatus(
												event.target.value as EnumDonationStepStatus,
											)
										}
										disabled={updateStepMutation.isPending}
										className="rounded-[10px] border-[1.5px] border-[#00458b] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#00458b] outline-none disabled:opacity-60"
									>
										{nonDoneStatuses.map((status) => (
											<option key={status} value={status}>
												{ADMIN_STEP_STATUS_LABEL[status]}
											</option>
										))}
									</select>
								</div>

								<button
									type="button"
									onClick={handleSaveStatus}
									disabled={updateStepMutation.isPending || !statusChanged}
									className="self-start rounded-lg bg-[#eef3f8] px-3 py-1.5 text-[12px] font-semibold text-[#00458b] disabled:opacity-60"
								>
									Salvar status
								</button>
							</div>

							<div className="h-px bg-[#e7eaef]" />

							<div className="flex flex-col gap-3 rounded-xl border border-[#00458b]/20 bg-[#eef3f8] p-4 lg:flex-row lg:items-center lg:justify-between">
								<div className="flex flex-col gap-0.5">
									<p className="text-[13px] font-bold text-[#00458b]">
										Finalizar etapa
									</p>
									<p className="text-[12px] text-[#6b7280]">
										{stepDescription
											? "A próxima etapa é liberada automaticamente."
											: "Adicione uma descrição da etapa para poder finalizar."}
									</p>
								</div>

								<AlertDialog>
									<AlertDialogTrigger asChild>
										<button
											type="button"
											disabled={
												updateStepMutation.isPending || !stepDescription
											}
											className="flex shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#00458b] px-5 py-2.5 text-[14px] font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
										>
											<Check className="size-4" />
											Finalizar etapa
										</button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<div className="flex size-12 items-center justify-center rounded-full bg-[#e1f1fb]">
												<Check className="size-5 text-[#00458b]" />
											</div>
											<AlertDialogTitle>
												Finalizar {definition.label}?
											</AlertDialogTitle>
											<AlertDialogDescription>
												A etapa será marcada como concluída e a próxima etapa
												será liberada automaticamente. Essa ação não pode ser
												desfeita.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogAction
												onClick={handleFinalize}
												className="bg-[#00458b] hover:bg-[#00335f]"
											>
												Finalizar etapa
											</AlertDialogAction>
											<AlertDialogCancel>Cancelar</AlertDialogCancel>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</>
					)}
				</>
			)}

			{step && (
				<StepTimelineSheet
					open={timelineOpen}
					onOpenChange={setTimelineOpen}
					idDonationStep={step.id_donation_step}
					stepOrder={definition.order}
					stepTitle={definition.label}
				/>
			)}
		</div>
	);
}
