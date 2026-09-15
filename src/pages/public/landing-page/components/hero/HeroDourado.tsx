import "@fontsource/playfair-display/latin-500-italic.css";
import "@fontsource/playfair-display/latin-600-italic.css";
import type { CSSProperties } from "react";
import { HERO_DESTAQUE } from "./tokens";

const SERIFA: CSSProperties = {
	fontFamily: '"Playfair Display", Georgia, serif',
	fontStyle: "italic",
	fontWeight: 600,
	color: HERO_DESTAQUE,
};

type HeroDouradoProps = {
	children: string;
};

export function HeroDourado({ children }: HeroDouradoProps) {
	return (
		<span style={SERIFA} className="mr-[0.06em] inline-block">
			{children}
		</span>
	);
}
