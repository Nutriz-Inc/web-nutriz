import { Badge, type BadgeTone } from "@/components/ui/badge";
import { EnumDonationStepStatus } from "@/services/types/i-donation";

const statusConfig: Record<
	EnumDonationStepStatus,
	{ label: string; tone: BadgeTone }
> = {
	[EnumDonationStepStatus.Pending]: { label: "Pendente", tone: "warning" },
	[EnumDonationStepStatus.Review]: { label: "Em análise", tone: "success" },
	[EnumDonationStepStatus.Failed]: { label: "Erro", tone: "error" },
	[EnumDonationStepStatus.Done]: { label: "Concluído", tone: "success" },
	[EnumDonationStepStatus.Warn]: { label: "Aviso", tone: "error" },
};

type StatusProps = {
	status: EnumDonationStepStatus;
	size?: "sm" | "lg";
	dot?: boolean;
};

export function Status({ status, size = "sm", dot = false }: StatusProps) {
	const config = statusConfig[status];

	return (
		<Badge
			tone={config.tone}
			dot={dot}
			size={size === "lg" ? "md" : "sm"}
			caps={size === "lg"}
		>
			{config.label}
		</Badge>
	);
}
