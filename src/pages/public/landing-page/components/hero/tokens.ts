const navy = (porcentagem: number) =>
	`color-mix(in srgb, var(--blue-deep-fill) ${porcentagem}%, transparent)`;

export const HERO_GLASS = navy(72);
export const HERO_GLASS_SOFT = navy(58);

export const HERO_OVERLAY_DESKTOP = [
	`linear-gradient(180deg, ${navy(8)} 0%, transparent 60%, ${navy(24)} 100%)`,
	`linear-gradient(to right, ${navy(95)} 0px, ${navy(92)} 620px, ${navy(50)} 740px, ${navy(12)} 860px, transparent 950px)`,
].join(", ");

export const HERO_OVERLAY_MOBILE = `linear-gradient(to top, ${navy(8)} 0px, ${navy(15)} 80px, ${navy(50)} 165px, ${navy(93)} 224px, ${navy(95)} 100%)`;
