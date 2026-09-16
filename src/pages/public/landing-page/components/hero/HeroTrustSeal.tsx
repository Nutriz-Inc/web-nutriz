import { ShieldCheck } from "lucide-react";

export function HeroTrustSeal() {
	return (
		<span className="inline-flex items-center gap-2 text-[13px] font-medium text-canvas-on-fill">
			<ShieldCheck aria-hidden="true" className="size-4 text-mint-bright" />
			Conteúdo validado por rBLH e Fiocruz
		</span>
	);
}
