import { cn } from "@/lib/utils";

type HeaderStatProps = {
	value: string;
	label: string;
	valueClassName?: string;
};

export function HeaderStat({ value, label, valueClassName }: HeaderStatProps) {
	return (
		<div className="flex flex-col gap-0.5 px-5 first:pl-0 last:pr-0 lg:items-end">
			<p
				className={cn(
					"text-[20px] font-extrabold text-blue-deep",
					valueClassName,
				)}
			>
				{value}
			</p>
			<p className="text-[12px] text-ink-3">{label}</p>
		</div>
	);
}
