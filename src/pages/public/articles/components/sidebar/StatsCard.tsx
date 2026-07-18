import { DONATION_STATS } from "../../constants";

export function StatsCard() {
	return (
		<section className="rounded-xl border border-[#e4e4e7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
			<h2 className="text-[15px] font-bold text-[#09090b]">
				A doação em números
			</h2>
			<div className="mt-3 grid grid-cols-2 gap-2.5">
				{DONATION_STATS.map((stat) => (
					<div key={stat.value} className="rounded-lg bg-[#eef2f7] p-3">
						<p className="text-[20px] font-bold text-[#0d3b6e]">{stat.value}</p>
						<p className="mt-0.5 text-[11.5px] leading-snug text-[#71717a]">
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
