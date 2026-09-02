import {
	AlertCircle,
	CheckCircle2,
	FileText,
	Loader2,
	Save,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { findStepDefinition } from "../../../detail/utils";
import { useUpdateAppointmentDescription } from "../hooks";

type UpdateStepDescriptionFormProps = {
	id_job: string;
	stepName: string;
	description: string;
};

export function UpdateStepDescriptionForm({
	id_job,
	stepName,
	description,
}: UpdateStepDescriptionFormProps) {
	const [value, setValue] = useState(description);
	const { mutate, isPending, isSuccess, isError, reset } =
		useUpdateAppointmentDescription(id_job);

	const definition = findStepDefinition(stepName);
	const StepIcon = definition?.icon ?? FileText;
	const unchanged = value.trim() === description.trim();

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		mutate(value);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-5 rounded-card-sm border border-line bg-surface p-5"
		>
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-2">
					<StepIcon className="size-4 text-ink-3" />
					<span className="text-[12px] font-bold uppercase tracking-wide text-ink-2">
						{definition?.name ?? "Detalhes da etapa"}
					</span>
				</div>
				<p className="text-[13px] text-ink-3">
					Edite a descrição da etapa. O status só pode ser alterado pelo
					responsável pelo agendamento.
				</p>
			</div>

			<div className="flex flex-col gap-2">
				<label
					htmlFor="step-description"
					className="text-[14px] font-semibold text-ink-2"
				>
					Descrição da etapa
				</label>
				<textarea
					id="step-description"
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
						reset();
					}}
					rows={5}
					placeholder="Descreva o que deve ser feito nesta etapa..."
					className="w-full resize-y rounded-xl border border-blue-tint bg-surface px-3.5 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-blue-bright"
				/>
			</div>

			{isSuccess && (
				<div className="flex items-center gap-2 rounded-xl border border-teal-tint bg-success-tint px-4 py-3">
					<CheckCircle2 className="size-4 shrink-0 text-success" />
					<p className="text-[13px] font-semibold text-success">
						Descrição atualizada com sucesso.
					</p>
				</div>
			)}

			{isError && (
				<div className="flex items-center gap-2 rounded-xl border border-danger-tint bg-danger-tint px-4 py-3">
					<AlertCircle className="size-4 shrink-0 text-danger" />
					<p className="text-[13px] font-semibold text-danger">
						Não foi possível salvar. Tente novamente.
					</p>
				</div>
			)}

			<button
				type="submit"
				disabled={isPending || unchanged}
				className="flex h-[46px] w-fit items-center justify-center gap-2 rounded-full bg-blue-deep-fill hover:bg-blue-fill px-6 text-[14px] font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
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
