import { cn } from "@/lib/utils";

type ActivityBadgeProps = {
	label: string;
	dotColor?: string;
	className?: string;
};

export function ActivityBadge({
	label,
	dotColor = "#2fd9c5",
	className,
}: ActivityBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-[#c7d6f0]",
				className,
			)}
		>
			<span className="relative flex size-2">
				<span
					className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:animate-none"
					style={{ backgroundColor: dotColor }}
				/>
				<span
					className="relative inline-flex size-2 rounded-full"
					style={{ backgroundColor: dotColor }}
				/>
			</span>
			{label}
		</span>
	);
}
