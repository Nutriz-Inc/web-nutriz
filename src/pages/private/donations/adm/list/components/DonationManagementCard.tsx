import { Calendar, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "@/components/full/StatusBadge";
import { StepBadge } from "@/components/full/StepBadge";
import { getInitials } from "@/components/layout/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCpf, formatDateBR } from "@/utils/formatter";
import { donationToken, STEP_DISPLAY } from "@/utils/status";
import { getStepDefinitions } from "../../../common/info/constants";
import type { AdminDonationRow } from "../hooks";

type DonationManagementCardProps = {
	donation: AdminDonationRow;
};

function rotuloDaEtapa(donation: AdminDonationRow) {
	const etapa = donation.currentStepName;
	if (!etapa) return undefined;

	const etapas = getStepDefinitions(donation.isRecurrent);
	const definicao = etapas.find((item) => item.name === etapa);
	if (!definicao) return undefined;

	return `${definicao.order}/${etapas.length} · ${STEP_DISPLAY[etapa].label}`;
}

export function DonationManagementCard({
	donation,
}: DonationManagementCardProps) {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			onClick={() => navigate(`/gestao-doacoes/${donation.id_donation}`)}
			className={cn(
				"flex w-full flex-col gap-3.5 rounded-card-sm border border-line bg-surface p-4 text-left transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-soft",
				"lg:flex-row lg:items-center lg:gap-6 lg:px-5 lg:py-3.5",
			)}
		>
			<div className="flex min-w-0 items-center gap-3 lg:w-[250px] lg:shrink-0">
				<span
					className={cn(
						"flex size-10 shrink-0 items-center justify-center rounded-full text-[14px] font-bold",
						donation.isActive
							? "bg-blue-tint text-blue-deep"
							: "bg-surface-3 text-ink-2",
					)}
				>
					{getInitials(donation.userName)}
				</span>
				<div className="flex min-w-0 flex-col">
					<p className="truncate text-[16px] font-semibold text-ink">
						{donation.userName}
					</p>
					<span className="truncate text-[12px] text-ink-3">
						{donation.id_donation}
					</span>
				</div>
			</div>

			<div className="flex flex-wrap items-center gap-1.5 lg:w-[300px] lg:shrink-0">
				<StatusBadge
					token={donationToken(donation.isActive, donation.hasError)}
					gender="f"
					size="md"
				/>
				<StepBadge
					step={donation.currentStepName}
					label={rotuloDaEtapa(donation)}
					size="md"
				/>
				{donation.isRecurrent && (
					<Badge tone="teal" size="md">
						Recorrente
					</Badge>
				)}
			</div>

			<div className="h-px bg-line lg:hidden" />

			<div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:flex-1 lg:justify-end">
				<div className="flex items-center gap-2">
					<CreditCard className="size-4 shrink-0 text-ink-3" />
					<span className="text-[13px] text-ink-2">CPF</span>
					<span className="text-[14px] font-semibold tabular-nums text-ink">
						{donation.userCpf ? formatCpf(donation.userCpf) : "—"}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<Calendar className="size-4 shrink-0 text-ink-3" />
					<span className="text-[13px] text-ink-2">Criada em</span>
					<span className="text-[14px] font-semibold text-ink">
						{formatDateBR(donation.createdAt)}
					</span>
				</div>
			</div>
		</button>
	);
}
