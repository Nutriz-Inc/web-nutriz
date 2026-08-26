import { Sparkles } from "lucide-react";
import { QUICK_TIPS } from "../constants";

export function QuickTipsCard() {
	return (
		<section className="rounded-card-sm border border-line bg-surface p-5 shadow-soft">
			<h2 className="flex items-center gap-2 text-[15px] font-bold text-ink">
				<Sparkles className="size-4 text-eva-deep" aria-hidden />
				Dicas rápidas
			</h2>

			<ol className="mt-4 flex flex-col gap-4">
				{QUICK_TIPS.map((tip, index) => (
					<li key={tip.title} className="flex items-start gap-3">
						<span
							aria-hidden
							className="flex size-6 shrink-0 items-center justify-center rounded-full bg-eva-tint text-[12px] font-bold text-eva-deep"
						>
							{index + 1}
						</span>
						<div>
							<p className="text-[14px] font-semibold text-ink">{tip.title}</p>
							<p className="mt-0.5 text-[13px] leading-relaxed text-ink-2">
								{tip.description}
							</p>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
