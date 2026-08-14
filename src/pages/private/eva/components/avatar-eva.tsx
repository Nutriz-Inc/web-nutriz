type AvatarEvaProps = {
	size: number;
	pulse?: boolean;
};

// Avatar da EVA: circulo com o gradiente da marca (pessego -> rosa -> lilas).
// O gradiente vem do token --eva-grad-brand (classe .eva-avatar).
export function AvatarEva({ size, pulse }: AvatarEvaProps) {
	return (
		<div
			className={pulse ? "eva-avatar eva-avatar--pulse" : "eva-avatar"}
			style={{
				width: size,
				height: size,
				flexShrink: 0,
				borderRadius: "50%",
			}}
		/>
	);
}
