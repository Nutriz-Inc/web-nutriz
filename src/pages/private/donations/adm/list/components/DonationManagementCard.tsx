import { Calendar, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DonationStatusBadge } from "@/components/full/DonationStatusBadge";
import { getInitials } from "@/components/layout/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCpf, formatDateBR } from "@/utils/formatter";
import type { AdminDonationRow } from "../hooks";
import { StatusBadge } from "./StatusBadge";

type DonationManagementCardProps = {
	donation: AdminDonationRow;
};

export function DonationManagementCard({
	donation,
}: DonationManagementCardProps) {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			onClick={() => navigate(`/gestao-doacoes/${donation.id_donation}`)}
			className={cn(
				"flex w-full flex-col gap-3.5 bg-surface p-[18px] text-left transition-colors hover:bg-surface-3",
				"lg:flex-row lg:items-center lg:gap-6 lg:px-6 lg:py-4",
				!donation.isActive && "opacity-70",
			)}
		>
			<div className="flex items-center gap-3 lg:w-[240px] lg:shrink-0">
				<div
					className={cn(
						"flex size-[46px] shrink-0 items-center justify-center rounded-full",
						donation.isActive ? "bg-blue-tint" : "bg-eva-tint",
					)}
				>
					<span
						className={cn(
							"text-[16px] font-bold",
							donation.isActive ? "text-blue-deep" : "text-eva-deep",
						)}
					>
						{getInitials(donation.userName)}
					</span>
				</div>
				<div className="flex min-w-0 flex-col gap-0.5">
					<p className="truncate text-[18px] font-bold text-ink">
						{donation.userName}
					</p>
					<span className="truncate font-mono text-[13px] text-ink-3">
						{donation.id_donation}
					</span>
				</div>
			</div>

			<div className="flex flex-wrap items-center gap-2 lg:w-[260px] lg:shrink-0">
				<DonationStatusBadge
					isActive={donation.isActive}
					hasError={donation.hasError}
				/>
				<StatusBadge step={donation.currentStepName} />
				{donation.isRecurrent && (
					<Badge tone="teal" size="lg">
						Recorrente
					</Badge>
				)}
			</div>

			<div className="h-px bg-blue-tint lg:hidden" />

			<div className="flex flex-col gap-2.5 lg:flex-1 lg:flex-row lg:items-center lg:justify-end lg:gap-6">
				<div className="flex items-center gap-2.5">
					<CreditCard className="size-[18px] shrink-0 text-ink-3" />
					<span className="text-[14px] text-ink-2">CPF:</span>
					<span className="text-[15px] font-semibold text-ink">
						{donation.userCpf ? formatCpf(donation.userCpf) : "—"}
					</span>
				</div>
				<div className="flex items-center gap-2.5">
					<Calendar className="size-[18px] shrink-0 text-ink-3" />
					<span className="text-[14px] text-ink-2">Criada em:</span>
					<span className="text-[15px] font-semibold text-ink">
						{formatDateBR(donation.createdAt)}
					</span>
				</div>
			</div>
		</button>
	);
}
