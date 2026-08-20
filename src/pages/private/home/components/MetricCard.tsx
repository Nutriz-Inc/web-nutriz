type MetricCardProps = {
	iconBg: string;
	icon: React.ReactNode;
	value: string;
	valueColor: string;
	label: string;
	sublabel: string;
};

export function MetricCard({
	iconBg,
	icon,
	value,
	valueColor,
	label,
	sublabel,
}: MetricCardProps) {
	return (
		<div className="bg-white border border-line flex flex-col gap-2 items-start p-6 rounded-card-sm w-full shadow-soft lg:flex-1 lg:gap-3.5 lg:p-7">
			<div
				className={`${iconBg} flex items-center justify-center rounded-2xl size-14 shrink-0`}
			>
				{icon}
			</div>
			<p
				className={`font-extrabold text-[40px] leading-none lg:text-[46px] ${valueColor}`}
			>
				{value}
			</p>
			<div className="flex flex-col gap-1">
				<p className="font-semibold text-ink text-[18px]">{label}</p>
				<p className="font-normal text-ink-2 text-[13px]">{sublabel}</p>
			</div>
		</div>
	);
}
