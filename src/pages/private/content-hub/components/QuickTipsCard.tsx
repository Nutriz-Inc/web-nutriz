import { Sparkles } from "lucide-react";
import { QUICK_TIPS } from "../constants";

export function QuickTipsCard() {
	return (
		<section className="rounded-xl border border-[#e4e4e7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
			<h2 className="flex items-center gap-2 text-[15px] font-bold text-[#09090b]">
				<Sparkles className="size-4 text-[#f2579f]" aria-hidden />
				Dicas rápidas
			</h2>

			<ol className="mt-4 flex flex-col gap-4">
				{QUICK_TIPS.map((tip, index) => (
					<li key={tip.title} className="flex items-start gap-3">
						<span
							aria-hidden
							className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#fdf1f5] text-[12px] font-bold text-[#e0457a]"
						>
							{index + 1}
						</span>
						<div>
							<p className="text-[14px] font-semibold text-[#09090b]">
								{tip.title}
							</p>
							<p className="mt-0.5 text-[13px] leading-relaxed text-[#71717a]">
								{tip.description}
							</p>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
