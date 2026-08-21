type EvaIconProps = {
	size?: number;
	className?: string;
};

/**
 * Marca da EVA: uma bolha de conversa com uma gota dentro — conversa sobre
 * leite, dito sem texto. Traco unico, cantos redondos, na mesma linguagem dos
 * icones lucide que o app ja usa (stroke 1.8, sem preenchimento chapado).
 *
 * E ela que aparece na bolinha flutuante e nos avatares do chat. Usa
 * `currentColor`, entao herda a cor de quem a coloca.
 */
export function EvaIcon({ size = 24, className }: EvaIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			className={className}
			aria-hidden="true"
			focusable="false"
		>
			{/* Bolha de conversa com a ponta embaixo a esquerda */}
			<path
				d="M12 3.75c-4.55 0-8.25 3.02-8.25 6.75 0 2.1 1.17 3.98 3.01 5.22.2.13.31.36.28.6l-.35 2.6a.6.6 0 0 0 .89.6l2.83-1.6c.16-.09.34-.12.52-.09.35.05.71.07 1.07.07 4.55 0 8.25-3.02 8.25-6.75S16.55 3.75 12 3.75Z"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinejoin="round"
			/>
			{/* Gota de leite */}
			<path
				d="M12 7.4c1.28 1.42 2.05 2.62 2.05 3.62a2.05 2.05 0 1 1-4.1 0c0-1 .77-2.2 2.05-3.62Z"
				fill="currentColor"
			/>
		</svg>
	);
}
