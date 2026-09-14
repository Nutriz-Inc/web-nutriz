import { HERO_GLASS_SOFT } from "./tokens";

type HeroEyebrowProps = {
	label: string;
};

export function HeroEyebrow({ label }: HeroEyebrowProps) {
	return (
		<span
			style={{ backgroundColor: HERO_GLASS_SOFT }}
			className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-sm"
		>
			<span aria-hidden="true" className="relative flex size-2">
				<span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-bright opacity-75 motion-reduce:animate-none" />
				<span className="relative inline-flex size-2 rounded-full bg-mint-bright" />
			</span>
			{label}
		</span>
	);
}
