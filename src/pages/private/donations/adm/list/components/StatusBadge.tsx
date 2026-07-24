/* eslint-disable react-refresh/only-export-components */
import { cn } from "@/lib/utils";
import { EnumDonationStepName } from "@/services/types/i-donation";

export const STEP_DISPLAY: Record<
	EnumDonationStepName,
	{ label: string; bg: string; dot: string; text: string }
> = {
	[EnumDonationStepName.BloodTest]: {
		label: "Exames",
		bg: "bg-[#fcf4f7]",
		dot: "bg-[#f25ca2]",
		text: "text-[#f25ca2]",
	},
	[EnumDonationStepName.CollectMilk]: {
		label: "Coleta",
		bg: "bg-[#e1f1fb]",
		dot: "bg-[#00458b]",
		text: "text-[#00458b]",
	},
	[EnumDonationStepName.DeliverMilkingKit]: {
		label: "Entrega do Kit",
		bg: "bg-[#d9f7f4]",
		dot: "bg-[#0e9e94]",
		text: "text-[#0e9e94]",
	},
	[EnumDonationStepName.MilkAnalysis]: {
		label: "Análise",
		bg: "bg-[#f2d4ff]",
		dot: "bg-[#84009e]",
		text: "text-[#84009e]",
	},
};

type StatusBadgeProps = {
	step: EnumDonationStepName | null;
};

export function StatusBadge({ step }: StatusBadgeProps) {
	const display = step ? STEP_DISPLAY[step] : null;

	return (
		<span
			className={cn(
				"flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold",
				display?.bg ?? "bg-[#f3f4f6]",
				display?.text ?? "text-[#6b7280]",
			)}
		>
			<span
				className={cn("size-2 rounded-full", display?.dot ?? "bg-[#9ca3af]")}
			/>
			{display?.label ?? "Sem etapa"}
		</span>
	);
}
