import { DONATION_STATS } from "../constants";

export function StatsCard() {
	return (
		<section className="rounded-card-sm border border-line bg-surface p-5 shadow-soft">
			<h2 className="text-[15px] font-bold text-ink">A doação em números</h2>
			<div className="mt-3 grid grid-cols-2 gap-2.5">
				{DONATION_STATS.map((stat) => (
					<div key={stat.value} className="rounded-lg bg-surface-3 p-3">
						<p className="text-[20px] font-bold text-blue-deep">{stat.value}</p>
						<p className="mt-0.5 text-[11px] leading-snug text-ink-2">
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
