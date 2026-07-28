type AvatarEvaProps = {
	size: number;
	pulse?: "slow" | "fast";
};

// Avatar da EVA: circulo com o gradiente da marca (pessego -> rosa -> lilas).
// O gradiente vem do token --eva-grad-brand (classe .eva-avatar).
export function AvatarEva({ size, pulse }: AvatarEvaProps) {
	const pulseClass =
		pulse === "slow"
			? " eva-avatar--pulse-slow"
			: pulse === "fast"
				? " eva-avatar--pulse-fast"
				: "";

	return (
		<div
			className={`eva-avatar${pulseClass}`}
			style={{
				width: size,
				height: size,
				flexShrink: 0,
				borderRadius: "50%",
			}}
		/>
	);
}
