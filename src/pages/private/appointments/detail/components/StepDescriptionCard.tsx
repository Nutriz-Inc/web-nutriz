import { FileText } from "lucide-react";
import { findStepDefinition } from "../../steps";

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
		<div className="flex flex-col gap-3 rounded-2xl border border-[#e7ecf2] bg-white p-5">
			<div className="flex items-center gap-2">
				<StepIcon className="size-4 text-[#94a3b8]" />
				<span className="text-[12px] font-bold uppercase tracking-wide text-[#6b7280]">
					{definition?.name ?? "Detalhes da etapa"}
				</span>
			</div>

			{definition && (
				<p className="text-[13px] text-[#9ca3af]">{definition.description}</p>
			)}

			<p className="whitespace-pre-line text-[14px] leading-relaxed text-[#374151]">
				{description || "Nenhum detalhe informado para esta etapa."}
			</p>
		</div>
	);
}
