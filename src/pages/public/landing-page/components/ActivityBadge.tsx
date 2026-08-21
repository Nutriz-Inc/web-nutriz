import { cn } from "@/lib/utils";

type ActivityBadgeProps = {
	label: string;
	className?: string;
};

/**
 * Pilula com bolinha pulsante sobre fundo escuro (hero e CTA final).
 * A bolinha usa o token `--mint`; antes vinha por `style` com hex solto.
 */
export function ActivityBadge({ label, className }: ActivityBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-blue-tint-2",
				className,
			)}
		>
			<span className="relative flex size-2" aria-hidden="true">
				<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75 motion-reduce:animate-none" />
				<span className="relative inline-flex size-2 rounded-full bg-mint" />
			</span>
			{label}
		</span>
	);
}
