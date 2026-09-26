import { useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

const RESPINGOS = [
	{ dx: -46, dy: -58, tamanho: 7, atraso: 0 },
	{ dx: -24, dy: -84, tamanho: 5, atraso: 30 },
	{ dx: -6, dy: -96, tamanho: 6, atraso: 10 },
	{ dx: 18, dy: -88, tamanho: 5, atraso: 40 },
	{ dx: 38, dy: -64, tamanho: 7, atraso: 15 },
	{ dx: 58, dy: -36, tamanho: 4, atraso: 50 },
	{ dx: -62, dy: -30, tamanho: 4, atraso: 45 },
];

export function HeroGota() {
	const reduzirMovimento = useReducedMotion();

	if (reduzirMovimento) {
		return null;
	}

	return (
		<div
			aria-hidden="true"
			className="gota-do-hero pointer-events-none absolute bottom-[72px] left-[76%] z-[5] sm:bottom-[88px] lg:hidden xl:bottom-[104px] xl:left-[calc(50%+31rem+(50vw-31rem)/2)] xl:block"
		>
			<span className="gota-ondulacao" />
			<span className="gota-ondulacao gota-ondulacao--eco" />

			{RESPINGOS.map((respingo) => (
				<span
					key={`${respingo.dx}-${respingo.dy}`}
					className="gota-respingo"
					style={
						{
							"--dx": `${respingo.dx}px`,
							"--dy": `${respingo.dy}px`,
							"--tamanho": `${respingo.tamanho}px`,
							"--atraso-respingo": `${respingo.atraso}ms`,
						} as CSSProperties
					}
				/>
			))}

			<svg
				aria-hidden="true"
				className="gota-cai"
				width="26"
				height="36"
				viewBox="0 0 26 36"
				fill="none"
			>
				<defs>
					<radialGradient id="gota-do-hero-corpo" cx="38%" cy="62%" r="70%">
						<stop offset="0%" stopColor="#ffffff" />
						<stop offset="70%" stopColor="#f3f7fc" />
						<stop offset="100%" stopColor="#d9e6f5" />
					</radialGradient>
				</defs>
				<path
					d="M13 1C13 1 2 15.5 2 23.5C2 29.85 6.92 35 13 35C19.08 35 24 29.85 24 23.5C24 15.5 13 1 13 1Z"
					fill="url(#gota-do-hero-corpo)"
				/>
				<ellipse
					cx="8.6"
					cy="23"
					rx="2.2"
					ry="4.2"
					fill="#ffffff"
					opacity="0.9"
				/>
			</svg>
		</div>
	);
}
