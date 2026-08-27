import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type ReadOnlyFieldProps = {
	label: string;
	value: string;
	className?: string;
};

export function ReadOnlyField({ label, value, className }: ReadOnlyFieldProps) {
	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-2">
				{label}
				<Lock aria-hidden="true" className="size-3.5 text-ink-3" />
				<span className="sr-only">(não editável)</span>
			</p>
			<p className="flex min-h-11 items-center break-words rounded-xl border border-line bg-surface-3 px-4 py-2 text-[15px] text-ink-2">
				{value || "—"}
			</p>
		</div>
	);
}
