import { ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { DonationStatusBadge } from "@/components/full/DonationStatusBadge";
import { StatusBadge } from "@/pages/private/donations/adm/list/components/StatusBadge";
import type { IDonationResponse } from "@/services/types/i-donation";
import { formatDateBR } from "@/utils/formatter";
import { DONATIONS_GRID_COLS } from "../constants";
import { formatML } from "../utils";

type UserDonationRowProps = {
	donation: IDonationResponse;
};

export function UserDonationRow({ donation }: UserDonationRowProps) {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<button
			type="button"
			onClick={() =>
				navigate(`/gestao-doacoes/${donation.id_donation}`, {
					state: { backTo: location.pathname },
				})
			}
			className={`flex w-full flex-col gap-2.5 p-4 text-left transition-colors hover:bg-[#f8fafc] lg:grid ${DONATIONS_GRID_COLS} lg:items-center lg:gap-3 lg:px-4 lg:py-3`}
		>
			<div className="flex items-center justify-between lg:block">
				<span className="font-mono text-[13px] font-semibold text-[#1f2a37]">
					{donation.id_donation.slice(0, 16)}
				</span>
				<ChevronRight className="size-4 text-[#9ca3af] lg:hidden" />
			</div>
			<StatusBadge step={donation.current_step ?? null} />
			<span className="text-[14px] text-[#6b7280]">
				<span className="lg:hidden">Data: </span>
				{formatDateBR(donation.created_at)}
			</span>
			<span className="text-[14px] font-semibold text-[#1f2a37]">
				<span className="font-normal text-[#6b7280] lg:hidden">Volume: </span>
				{formatML(donation.quantity_donated)}
			</span>
			<DonationStatusBadge
				isActive={donation.is_active}
				hasError={donation.has_error}
			/>
			<ChevronRight className="hidden size-4 text-[#9ca3af] lg:block" />
		</button>
	);
}
