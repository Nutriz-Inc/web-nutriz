import { useId } from "react";

type FrascoDeLeiteProps = {
	nivel: number;
};

export function FrascoDeLeite({ nivel }: FrascoDeLeiteProps) {
	const recorte = useId();
	const altura = 118;
	const topo = 36;
	const cheio = Math.min(Math.max(nivel, 0), 1);
	const y = topo + altura * (1 - cheio);

	return (
		<svg
			viewBox="0 0 96 164"
			aria-hidden="true"
			className="h-40 w-auto shrink-0 overflow-visible"
		>
			<defs>
				<clipPath id={recorte}>
					<path d="M20 36 h56 a10 10 0 0 1 10 10 v96 a18 18 0 0 1 -18 18 h-40 a18 18 0 0 1 -18 -18 v-96 a10 10 0 0 1 10 -10 z" />
				</clipPath>
			</defs>
			<rect
				x="30"
				y="6"
				width="36"
				height="22"
				rx="6"
				className="fill-blue-bright"
			/>
			<rect
				x="26"
				y="24"
				width="44"
				height="12"
				rx="4"
				className="fill-blue-deep"
			/>
			<g clipPath={`url(#${recorte})`}>
				<rect x="0" y="0" width="96" height="164" className="fill-surface" />
				<g
					className="motion-safe:[animation:nz-subir-leite_1100ms_var(--ease-out)_both]"
					style={{ transform: `translateY(${y}px)` }}
				>
					<path
						d="M0 6 C 16 0, 32 12, 48 6 S 80 0, 96 6 V 170 H 0 Z"
						className="fill-blue-tint-2"
					/>
				</g>
			</g>
			<path
				d="M20 36 h56 a10 10 0 0 1 10 10 v96 a18 18 0 0 1 -18 18 h-40 a18 18 0 0 1 -18 -18 v-96 a10 10 0 0 1 10 -10 z"
				className="fill-none stroke-blue-deep"
				strokeWidth="3"
			/>
			{[0.25, 0.5, 0.75].map((marca) => (
				<line
					key={marca}
					x1="70"
					x2="80"
					y1={topo + altura * marca}
					y2={topo + altura * marca}
					className="stroke-blue-deep/40"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			))}
		</svg>
	);
}
