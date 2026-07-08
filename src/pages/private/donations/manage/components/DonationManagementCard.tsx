import { Calendar, CreditCard, Pencil } from "lucide-react";
import { getInitials } from "@/components/layout/utils";
import { formatCpf, formatDateBR } from "@/utils/formatter";
import type { AdminDonationRow } from "../hooks";
import { StatusBadge } from "./StatusBadge";

type DonationManagementCardProps = {
	donation: AdminDonationRow;
	onEdit: () => void;
};

export function DonationManagementCard({
	donation,
	onEdit,
}: DonationManagementCardProps) {
	return (
		<div className="flex flex-col gap-3.5 bg-white p-[18px]">
			<div className="flex items-center gap-3">
				<div className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-[#e1f1fb]">
					<span className="text-[16px] font-bold text-[#00458b]">
						{getInitials(donation.userName)}
					</span>
				</div>
				<div className="flex min-w-0 flex-col gap-0.5">
					<p className="truncate text-[18px] font-bold text-[#1f2a37]">
						{donation.userName}
					</p>
					<p className="text-[13px] text-[#9ca3af]">Doação #{donation.number}</p>
				</div>
			</div>

			<StatusBadge step={donation.currentStepName} />

			<div className="h-px bg-[#e5e7eb]" />

			<div className="flex flex-col gap-2.5">
				<div className="flex items-center gap-2.5">
					<CreditCard className="size-[18px] shrink-0 text-[#9ca3af]" />
					<span className="text-[14px] text-[#6b7280]">CPF:</span>
					<span className="text-[15px] font-semibold text-[#1f2a37]">
						{donation.userCpf ? formatCpf(donation.userCpf) : "—"}
					</span>
				</div>
				<div className="flex items-center gap-2.5">
					<Calendar className="size-[18px] shrink-0 text-[#9ca3af]" />
					<span className="text-[14px] text-[#6b7280]">Criada em:</span>
					<span className="text-[15px] font-semibold text-[#1f2a37]">
						{formatDateBR(donation.createdAt)}
					</span>
				</div>
			</div>

			<button
				type="button"
				onClick={onEdit}
				className="flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#54b2e3] px-4 py-3 text-[15px] font-semibold text-[#00458b] transition-transform active:scale-[0.99]"
			>
				<Pencil className="size-[18px]" />
				Editar doação
			</button>
		</div>
	);
}