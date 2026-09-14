import { ArrowRight } from "lucide-react";

type HeroCtaProps = {
	label: string;
	onClick: () => void;
};

export function HeroCta({ label, onClick }: HeroCtaProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="group inline-flex h-12 items-center gap-3 rounded-full bg-surface-on-fill px-7 text-[15px] font-semibold text-ink-on-fill shadow-lift outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-mint/60"
		>
			{label}
			<ArrowRight
				aria-hidden="true"
				className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
			/>
		</button>
	);
}
