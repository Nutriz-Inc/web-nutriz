import { CountUp } from "@/components/full/CountUp";

type MetricCardProps = {
	iconBg: string;
	icon: React.ReactNode;
	value: number;
	decimals?: number;
	suffix?: string;
	valueColor: string;
	label: string;
	sublabel: string;
};

export function MetricCard({
	iconBg,
	icon,
	value,
	decimals = 0,
	suffix = "",
	valueColor,
	label,
	sublabel,
}: MetricCardProps) {
	return (
		<div className="bg-surface border border-line flex flex-col gap-2 items-start p-6 rounded-card-sm w-full lg:flex-1 lg:gap-3.5 lg:p-7">
			<div
				className={`${iconBg} flex items-center justify-center rounded-2xl size-14 shrink-0`}
			>
				{icon}
			</div>
			<p
				className={`font-extrabold text-numero leading-none lg:text-numero ${valueColor}`}
			>
				<CountUp value={value} decimals={decimals} suffix={suffix} />
			</p>
			<div className="flex flex-col gap-1">
				<p className="font-semibold text-ink text-destaque">{label}</p>
				<p className="font-normal text-ink-2 text-apoio">{sublabel}</p>
			</div>
		</div>
	);
}
