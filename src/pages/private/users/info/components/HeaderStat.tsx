import { cn } from "@/lib/utils";

type HeaderStatProps = {
	value: string;
	label: string;
	valueClassName?: string;
};

export function HeaderStat({ value, label, valueClassName }: HeaderStatProps) {
	return (
		<div className="flex min-w-0 flex-col gap-0.5 lg:items-end lg:px-5 lg:first:pl-0 lg:last:pr-0">
			<p
				className={cn(
					"text-corpo font-extrabold text-blue-deep lg:text-destaque",
					valueClassName,
				)}
			>
				{value}
			</p>
			<p className="text-rotulo text-ink-3">{label}</p>
		</div>
	);
}
