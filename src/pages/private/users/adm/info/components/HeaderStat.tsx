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
					"text-[20px] font-extrabold text-[#00458b]",
					valueClassName,
				)}
			>
				{value}
			</p>
			<p className="text-[12px] text-[#9ca3af]">{label}</p>
		</div>
	);
}
