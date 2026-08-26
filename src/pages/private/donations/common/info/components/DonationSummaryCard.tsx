import { Milk } from "lucide-react";

type Props = {
	quantityDonated: number;
};

export function DonationSummaryCard({ quantityDonated }: Props) {
	return (
		<div className="flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-soft">
			<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success-tint text-success">
				<Milk className="size-5" />
			</div>
			<div className="flex flex-col">
				<span className="text-[12px] font-semibold text-ink-2">
					Quantidade doada
				</span>
				<span className="text-[16px] font-bold text-ink">
					{quantityDonated} ml
				</span>
			</div>
		</div>
	);
}
