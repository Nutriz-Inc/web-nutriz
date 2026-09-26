import { Milk } from "lucide-react";
import { BottleSummaryList } from "@/components/full/BottleSummaryList";
import type { Bottle } from "@/services/types/i-donation";

type Props = {
	bottles: Bottle[];
};

export function DonationSummaryCard({ bottles }: Props) {
	return (
		<div className="flex flex-col gap-3 rounded-card-sm border border-line bg-surface p-4">
			<div className="flex items-center gap-3">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success-tint text-success">
					<Milk className="size-5" />
				</div>
				<span className="text-corpo font-bold text-ink">Frascos da doação</span>
			</div>

			<BottleSummaryList bottles={bottles} />
		</div>
	);
}
