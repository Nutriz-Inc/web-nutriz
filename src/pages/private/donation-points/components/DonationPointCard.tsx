import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IDonationPointResponse } from "@/services/types/i-donation";

type DonationPointCardProps = {
	point: IDonationPointResponse;
	selected?: boolean;
	onSelect?: () => void;
};

export function DonationPointCard({
	point,
	selected,
	onSelect,
}: DonationPointCardProps) {
	const isOpen = !!point.opening_hours;
	const donationLabel = point.has_home ? "Doação - Retirada" : "Retirada";
	const address = point.address
		? `${point.address.street}, ${point.address.number ?? "s/n"}`
		: "Endereço não informado";

	return (
		<button
			type="button"
			onClick={onSelect}
			className={cn(
				"flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
				selected
					? "border-[#387ccd] bg-[#387ccd]/10"
					: "border-[#e0e0e0] bg-white",
			)}
		>
			<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#387ccd]/25">
				<MapPin className="size-[22px] text-[#387ccd]" />
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-1.5">
				<div className="flex items-start justify-between gap-2">
					<p className="truncate text-[13px] font-bold text-[#1a1a1a]">
						{point.name}
					</p>
					{point.distance_from_you != null && (
						<span className="shrink-0 text-[11px] text-[#888]">
							{point.distance_from_you.toFixed(1).replace(".", ",")} km
						</span>
					)}
				</div>

				<p className="text-[11px] text-[#888]">{address}</p>

				<div className="flex flex-wrap items-center gap-1.5">
					<span
						className={cn(
							"rounded-md px-2 py-1 text-[10px] font-bold",
							isOpen
								? "bg-[#d6ff9f] text-[#3b6d11]"
								: "bg-[#df5a7a]/30 text-[#d92e2e]",
						)}
					>
						{isOpen ? "Aberto" : "Fechado"}
					</span>
					<span className="rounded-md bg-[#e8fcf9] px-2 py-1 text-[10px] font-bold text-[#0f6e56]">
						{donationLabel}
					</span>
				</div>
			</div>
		</button>
	);
}
