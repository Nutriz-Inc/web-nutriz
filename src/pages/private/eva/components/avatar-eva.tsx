type AvatarEvaProps = {
	size: number;
	pulse?: boolean;
	/** Quadrado de cantos macios, como na abertura da referencia. */
	squircle?: boolean;
};

/**
 * Avatar da EVA: bloco com o pastel da marca (lavanda -> rosa), redondo nas
 * bolhas do chat e quadrado de cantos macios na abertura. Ver eva.css.
 */
export function AvatarEva({ size, pulse, squircle }: AvatarEvaProps) {
	const classes = ["eva-avatar"];

	if (pulse) classes.push("eva-avatar--pulse");
	if (squircle) classes.push("eva-avatar--squircle");

	return (
		<div
			aria-hidden="true"
			className={classes.join(" ")}
			style={{
				width: size,
				height: size,
				flexShrink: 0,
				borderRadius: "50%",
			}}
		/>
	);
}
