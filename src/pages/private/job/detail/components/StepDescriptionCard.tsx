import { FileText } from "lucide-react";
import { findStepDefinition } from "../utils";

type StepDescriptionCardProps = {
	stepName: string;
	description: string;
};

export function StepDescriptionCard({
	stepName,
	description,
}: StepDescriptionCardProps) {
	const definition = findStepDefinition(stepName);
	const StepIcon = definition?.icon ?? FileText;

	return (
		<div className="flex flex-col gap-3 rounded-card-sm border border-line bg-surface p-5">
			<div className="flex items-center gap-2">
				<StepIcon className="size-4 text-ink-3" />
				<span className="text-[12px] font-bold uppercase tracking-wide text-ink-2">
					{definition?.name ?? "Detalhes da etapa"}
				</span>
			</div>

			{definition && (
				<p className="text-[13px] text-ink-3">{definition.description}</p>
			)}

			<p className="whitespace-pre-line text-[14px] leading-relaxed text-ink-2">
				{description || "Nenhum detalhe informado para esta etapa."}
			</p>
		</div>
	);
}
