type HeroEyebrowProps = {
	label: string;
};

export function HeroEyebrow({ label }: HeroEyebrowProps) {
	return (
		<span className="font-display text-[11px] font-bold uppercase tracking-[0.06em] text-canvas-on-fill">
			{label}
		</span>
	);
}
