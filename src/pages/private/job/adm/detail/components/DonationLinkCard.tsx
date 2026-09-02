import { ChevronRight, Droplets } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type DonationLinkCardProps = {
	id_donation: string;
};

export function DonationLinkCard({ id_donation }: DonationLinkCardProps) {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<button
			type="button"
			onClick={() =>
				navigate(`/gestao-doacoes/${id_donation}`, {
					state: { backTo: location.pathname },
				})
			}
			className="flex w-full items-center gap-3 rounded-card-sm border border-line bg-surface p-5 text-left transition-colors hover:border-blue-tint-2 hover:bg-surface-2"
		>
			<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue-deep">
				<Droplets className="size-[18px]" />
			</span>

			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<span className="text-[12px] font-bold uppercase tracking-wide text-ink-2">
					Doação vinculada
				</span>
				<span className="truncate font-mono text-[13px] font-semibold text-ink">
					{id_donation.slice(0, 16)}
				</span>
			</div>

			<ChevronRight className="size-4 shrink-0 text-ink-3" />
		</button>
	);
}
