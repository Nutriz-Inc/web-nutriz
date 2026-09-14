import "@fontsource/playfair-display/latin-500-italic.css";
import "@fontsource/playfair-display/latin-600-italic.css";
import type { CSSProperties } from "react";

const SERIFA: CSSProperties = {
	fontFamily: '"Playfair Display", Georgia, serif',
	fontStyle: "italic",
	fontWeight: 600,
};

type HeroDouradoProps = {
	children: string;
};

export function HeroDourado({ children }: HeroDouradoProps) {
	return (
		<span style={SERIFA} className="inline-block px-[0.02em] text-amber">
			{children}
		</span>
	);
}
