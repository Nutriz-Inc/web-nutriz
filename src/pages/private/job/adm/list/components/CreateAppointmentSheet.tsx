import { LoaderCircle, Plus, Stethoscope } from "lucide-react";
import { useState } from "react";
import agendaVazia from "@/assets/illustrations/agenda-vazia.svg";
import semEnfermeiro from "@/assets/illustrations/sem-enfermeiro.svg";
import { EmptyState } from "@/components/full/EmptyState";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useNurses } from "@/pages/private/donations/adm/info/hooks";
import type { ICreateJobRequest } from "@/services/types/i-job";
import { usePendingDonationSteps } from "../hooks";
import { PendingStepOption } from "./PendingStepOption";

type CreateAppointmentSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: ICreateJobRequest) => void;
	isPending: boolean;
	error?: string;
};

export function CreateAppointmentSheet({
	open,
	onOpenChange,
	onSubmit,
	isPending,
	error,
}: CreateAppointmentSheetProps) {
	const [selectedStepId, setSelectedStepId] = useState("");
	const [nurseId, setNurseId] = useState("");
	const [description, setDescription] = useState("");

	const { data: steps = [], isLoading: isLoadingSteps } =
		usePendingDonationSteps(open);
	const { data: nurses = [], isLoading: isLoadingNurses } = useNurses(open);

	const selectedStep = steps.find(
		(step) => step.id_donation_step === selectedStepId,
	);
	const canSubmit = Boolean(selectedStep && nurseId && description.trim());

	function handleOpenChange(next: boolean) {
		if (isPending) return;

		if (!next) {
			setSelectedStepId("");
			setNurseId("");
			setDescription("");
		}

		onOpenChange(next);
	}

	function handleSubmit() {
		if (!selectedStep || !canSubmit) return;

		onSubmit({
			id_user: nurseId,
			id_step: selectedStep.id_donation_step,
			name: selectedStep.name,
			description: description.trim(),
			date_set: selectedStep.set_date,
		});
	}

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetContent
				side="bottom"
				className="flex max-h-[92vh] flex-col gap-5 rounded-t-2xl border-none p-5 lg:data-[side=bottom]:inset-x-0 lg:data-[side=bottom]:top-1/2 lg:data-[side=bottom]:bottom-auto lg:data-[side=bottom]:left-1/2 lg:data-[side=bottom]:h-auto lg:data-[side=bottom]:max-h-[min(88vh,46rem)] lg:data-[side=bottom]:w-[680px] lg:data-[side=bottom]:-translate-x-1/2 lg:data-[side=bottom]:-translate-y-1/2 lg:data-[side=bottom]:rounded-card lg:data-[side=bottom]:border lg:data-[side=bottom]:border-line lg:data-[side=bottom]:p-8 lg:data-[side=bottom]:shadow-lift"
			>
				<div className="mx-auto -mt-1 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 p-0 text-left">
					<SheetTitle className="text-[24px] font-bold text-ink">
						Novo agendamento
					</SheetTitle>
					<SheetDescription className="text-[13px] text-ink-2">
						Escolha uma etapa pendente e atribua um enfermeiro responsável.
					</SheetDescription>
				</SheetHeader>

				<div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pr-0.5">
					<div className="flex flex-col gap-2.5">
						<div className="flex items-center justify-between gap-3">
							<p className="text-[13px] font-semibold text-ink">
								Etapa da doação
							</p>
							<span className="text-[12px] text-ink-3">
								Selecione apenas uma
							</span>
						</div>

						{isLoadingSteps ? (
							<div className="flex justify-center py-6">
								<LoaderCircle className="size-5 animate-spin text-ink-3" />
							</div>
						) : steps.length === 0 ? (
							<EmptyState
								size="sm"
								illustration={agendaVazia}
								title="Nenhuma etapa pendente"
								description="Não há etapas aguardando agendamento no momento."
							/>
						) : (
							<div className="flex max-h-[280px] flex-col gap-2.5 overflow-y-auto pr-0.5">
								{steps.map((step) => (
									<PendingStepOption
										key={step.id_donation_step}
										step={step}
										selected={step.id_donation_step === selectedStepId}
										onSelect={() => setSelectedStepId(step.id_donation_step)}
									/>
								))}
							</div>
						)}
					</div>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="create-appointment-nurse"
							className="text-[13px] font-semibold text-ink"
						>
							Enfermeiro responsável
						</label>

						{isLoadingNurses ? (
							<div className="flex justify-center py-4">
								<LoaderCircle className="size-5 animate-spin text-ink-3" />
							</div>
						) : nurses.length === 0 ? (
							<EmptyState
								size="sm"
								illustration={semEnfermeiro}
								title="Nenhum enfermeiro cadastrado"
								description="Cadastre um enfermeiro antes de criar o agendamento."
							/>
						) : (
							<div className="flex w-full items-center gap-2.5 rounded-xl bg-canvas px-3.5 py-[13px]">
								<Stethoscope className="size-4 shrink-0 text-ink-3" />
								<select
									id="create-appointment-nurse"
									value={nurseId}
									onChange={(event) => setNurseId(event.target.value)}
									className="w-full bg-transparent text-[14px] text-ink outline-none"
								>
									<option value="">Selecione um enfermeiro</option>
									{nurses.map((nurse) => (
										<option key={nurse.id_user} value={nurse.id_user}>
											{nurse.name}
										</option>
									))}
								</select>
							</div>
						)}
					</div>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="create-appointment-description"
							className="text-[13px] font-semibold text-ink"
						>
							Descrição do agendamento
						</label>
						<textarea
							id="create-appointment-description"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							rows={3}
							placeholder="Descreva o que deve ser feito nesta visita..."
							className="w-full resize-y rounded-xl bg-canvas px-3.5 py-3 text-[14px] text-ink outline-none placeholder:text-ink-3"
						/>
					</div>
				</div>

				{error && <p className="text-[12px] text-danger">{error}</p>}

				<div className="flex shrink-0 items-center justify-between gap-3">
					<button
						type="button"
						onClick={() => handleOpenChange(false)}
						disabled={isPending}
						className="flex h-11 w-full items-center justify-center rounded-full border border-line bg-surface text-[14px] font-semibold text-ink transition-colors hover:bg-surface-3 disabled:opacity-60"
					>
						Cancelar
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={isPending || !canSubmit}
						className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-deep-fill text-[14px] font-semibold text-white transition-colors hover:bg-blue-fill disabled:opacity-60"
					>
						{isPending ? (
							<LoaderCircle className="size-[18px] animate-spin" />
						) : (
							<Plus className="size-[18px]" />
						)}
						{isPending ? "Criando..." : "Criar agendamento"}
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
