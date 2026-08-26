import { Heart } from "lucide-react";

export function ActiveDonationNotice() {
	return (
		<div className="rounded-card-sm flex gap-3 border border-eva/25 bg-eva-tint p-4">
			<span
				aria-hidden="true"
				className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-eva-deep shadow-soft"
			>
				<Heart className="size-4 fill-eva" />
			</span>

			<p className="min-w-0 text-[13px] leading-[19px] text-ink">
				<strong className="font-bold">
					Você já tem uma doação em andamento.
				</strong>{" "}
				Assim que ela for concluída, você pode iniciar outra por aqui.
			</p>
		</div>
	);
}
