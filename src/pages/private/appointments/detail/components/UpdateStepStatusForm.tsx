import {
	AlertCircle,
	CheckCircle2,
	ClipboardEdit,
	Loader2,
	Save,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import type { AppointmentStatus } from "../../types";
import { STATUS_OPTION_ORDER } from "../constants";
import { useUpdateAppointment } from "../hooks";
import { StatusRadioOption } from "./StatusRadioOption";

type UpdateStepStatusFormProps = {
	id_job: string;
	currentStatus: AppointmentStatus;
	stepName: string;
};

export function UpdateStepStatusForm({
	id_job,
	currentStatus,
	stepName,
}: UpdateStepStatusFormProps) {
	const [status, setStatus] = useState<AppointmentStatus>(currentStatus);
	const [report, setReport] = useState("");
	const { mutate, isPending, isSuccess, isError, reset } =
		useUpdateAppointment(id_job);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		mutate({ status, report });
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-5 rounded-2xl border border-[#e7ecf2] bg-white p-5"
		>
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-2">
					<ClipboardEdit className="size-4 text-[#94a3b8]" />
					<span className="text-[12px] font-bold uppercase tracking-wide text-[#6b7280]">
						Atualizar status da etapa
					</span>
				</div>
				<p className="text-[13px] text-[#9ca3af]">
					Selecione o novo status e registre o relatório desta etapa
					{stepName ? ` (${stepName})` : ""}.
				</p>
			</div>

			<div className="flex flex-col gap-2.5">
				{STATUS_OPTION_ORDER.map((option) => (
					<StatusRadioOption
						key={option}
						status={option}
						selected={status === option}
						isCurrent={currentStatus === option}
						onSelect={(next) => {
							setStatus(next);
							reset();
						}}
					/>
				))}
			</div>

			<div className="flex flex-col gap-2">
				<label
					htmlFor="step-report"
					className="text-[14px] font-semibold text-[#374151]"
				>
					Relatório de etapa
				</label>
				<textarea
					id="step-report"
					value={report}
					onChange={(event) => {
						setReport(event.target.value);
						reset();
					}}
					rows={4}
					placeholder="Descreva o resultado desta etapa e os próximos passos..."
					className="w-full resize-y rounded-xl border border-[#e2e8f0] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none transition-colors placeholder:text-[#c0c7d1] focus:border-[#387ccd]"
				/>
			</div>

			{isSuccess && (
				<div className="flex items-center gap-2 rounded-xl border border-[#c7e9db] bg-[#e9f6f0] px-4 py-3">
					<CheckCircle2 className="size-4 shrink-0 text-[#0f6e56]" />
					<p className="text-[13px] font-semibold text-[#0f6e56]">
						Status atualizado com sucesso.
					</p>
				</div>
			)}

			{isError && (
				<div className="flex items-center gap-2 rounded-xl border border-[#f5c9c9] bg-[#fdecec] px-4 py-3">
					<AlertCircle className="size-4 shrink-0 text-[#cf3030]" />
					<p className="text-[13px] font-semibold text-[#cf3030]">
						Não foi possível salvar. Tente novamente.
					</p>
				</div>
			)}

			<button
				type="submit"
				disabled={isPending}
				className="flex h-[46px] w-fit items-center justify-center gap-2 rounded-xl bg-[#00458b] px-6 text-[14px] font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
			>
				{isPending ? (
					<Loader2 className="size-4 animate-spin" />
				) : (
					<Save className="size-4" />
				)}
				{isPending ? "Salvando..." : "Salvar Alterações"}
			</button>
		</form>
	);
}
