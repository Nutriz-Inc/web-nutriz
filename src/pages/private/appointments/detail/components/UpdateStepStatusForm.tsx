import { CheckCircle2, ClipboardEdit, Save } from "lucide-react";
import { type FormEvent, useState } from "react";
import type { AppointmentStatus } from "../../types";
import { STATUS_OPTION_ORDER } from "../constants";
import { StatusRadioOption } from "./StatusRadioOption";

type UpdateStepStatusFormProps = {
	currentStatus: AppointmentStatus;
	stepName: string;
};

export function UpdateStepStatusForm({
	currentStatus,
	stepName,
}: UpdateStepStatusFormProps) {
	const [status, setStatus] = useState<AppointmentStatus>(currentStatus);
	const [report, setReport] = useState("");
	const [saved, setSaved] = useState(false);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// NOTE: mock — quando o endpoint existir, chamar a mutation de atualização
		// da etapa (services.job.update / donation step) com { status, report }.
		setSaved(true);
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
							setSaved(false);
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
						setSaved(false);
					}}
					rows={4}
					placeholder="Descreva o resultado desta etapa e os próximos passos..."
					className="w-full resize-y rounded-xl border border-[#e2e8f0] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none transition-colors placeholder:text-[#c0c7d1] focus:border-[#387ccd]"
				/>
			</div>

			{saved && (
				<div className="flex items-center gap-2 rounded-xl border border-[#c7e9db] bg-[#e9f6f0] px-4 py-3">
					<CheckCircle2 className="size-4 shrink-0 text-[#0f6e56]" />
					<p className="text-[13px] font-semibold text-[#0f6e56]">
						Status atualizado com sucesso.
					</p>
				</div>
			)}

			<button
				type="submit"
				className="flex h-[46px] w-fit items-center justify-center gap-2 rounded-xl bg-[#00458b] px-6 text-[14px] font-semibold text-white transition-transform active:scale-[0.98]"
			>
				<Save className="size-4" />
				Salvar Alterações
			</button>
		</form>
	);
}
