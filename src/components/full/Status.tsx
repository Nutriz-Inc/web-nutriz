import { cn } from "@/lib/utils";
import { EnumDonationStepStatus } from "@/services/types/i-donation";

const badgeConfig: Record<
	EnumDonationStepStatus,
	{ label: string; className: string; dotClassName: string }
> = {
	[EnumDonationStepStatus.Pending]: {
		label: "Pendente",
		className: "bg-[#faeeda] text-[#854f0b]",
		dotClassName: "bg-[#854f0b]",
	},
	[EnumDonationStepStatus.Review]: {
		label: "Em análise",
		className: "bg-[#e1f5ee] text-[#0f6e56]",
		dotClassName: "bg-[#0f6e56]",
	},
	[EnumDonationStepStatus.Failed]: {
		label: "Erro",
		className: "bg-[#fcebeb] text-[#a32d2d]",
		dotClassName: "bg-[#a32d2d]",
	},
	[EnumDonationStepStatus.Done]: {
		label: "Concluído",
		className: "bg-[#e1f5ee] text-[#0f6e56]",
		dotClassName: "bg-[#0f6e56]",
	},
	[EnumDonationStepStatus.Warn]: {
		label: "Aviso",
		className: "bg-[#fcebeb] text-[#a32d2d]",
		dotClassName: "bg-[#a32d2d]",
	},
};

type StatusProps = {
	status: EnumDonationStepStatus;
	size?: "sm" | "lg";
	dot?: boolean;
};

export function Status({ status, size = "sm", dot = false }: StatusProps) {
	const badge = badgeConfig[status];
	return (
		<span
			className={cn(
				"inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold",
				size === "lg"
					? "px-3.5 py-[7px] text-[11px] uppercase tracking-[0.3px]"
					: "px-2.5 py-1 text-[12px]",
				badge.className,
			)}
		>
			{dot && (
				<span className={cn("size-[7px] rounded-full", badge.dotClassName)} />
			)}
			{badge.label}
		</span>
	);
}
