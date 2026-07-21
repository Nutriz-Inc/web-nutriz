import { Milk } from "lucide-react";

type Props = {
	quantityDonated: number;
};

export function DonationSummaryCard({ quantityDonated }: Props) {
	return (
		<div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0px_6px_10px_rgba(10,38,77,0.04)]">
			<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e1f5ee] text-[#0f6e56]">
				<Milk className="size-5" />
			</div>
			<div className="flex flex-col">
				<span className="text-[12px] font-semibold text-[#6b8faa]">
					Quantidade doada
				</span>
				<span className="text-[16px] font-bold text-[#0e2a45]">
					{quantityDonated} ml
				</span>
			</div>
		</div>
	);
}
