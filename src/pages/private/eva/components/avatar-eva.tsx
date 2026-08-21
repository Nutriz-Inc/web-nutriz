import lotus from "@/assets/images/eva-lotus.png";

type AvatarEvaProps = {
	size: number;
	pulse?: boolean;
	/** Quadrado de cantos macios, como na abertura. */
	squircle?: boolean;
};

/**
 * Marca da EVA: a flor de lotus em branco sobre o degrade rosa -> roxo.
 *
 * O degrade e a versao saturada do pastel. O pastel claro ficou so nas
 * superficies: com ele atras, a flor branca dava 1,1:1 e sumia — abaixo dos
 * 3:1 que um simbolo funcional precisa.
 *
 * A flor e um PNG preto; `brightness(0) invert(1)` a deixa branca sem precisar
 * de uma segunda arte.
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
		>
			<img
				src={lotus}
				alt=""
				className="eva-avatar-mark"
				style={{ width: size * 0.52, height: size * 0.52 }}
			/>
		</div>
	);
}
