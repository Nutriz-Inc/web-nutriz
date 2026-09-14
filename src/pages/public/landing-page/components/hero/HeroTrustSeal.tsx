import { ShieldCheck } from "lucide-react";
import { HERO_GLASS_SOFT } from "./tokens";

export function HeroTrustSeal() {
	return (
		<span
			style={{ backgroundColor: HERO_GLASS_SOFT }}
			className="inline-flex items-center gap-2.5 rounded-full border border-white/20 py-2 pr-4 pl-3 text-[12px] font-semibold text-canvas-on-fill backdrop-blur-sm"
		>
			<ShieldCheck aria-hidden="true" className="size-4 text-mint-bright" />
			Conteúdo validado por rBLH e Fiocruz
		</span>
	);
}
