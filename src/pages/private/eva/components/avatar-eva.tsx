type AvatarEvaProps = {
	size: number;
	petal: number;
	variant?: "brand" | "bubble" | "hero";
	pulse?: "slow" | "fast";
};

const gradients = {
	brand: "linear-gradient(135deg, #F8BBD0, #CE93D8 55%, #B39DDB)",
	bubble: "linear-gradient(135deg, #F8BBD0, #B39DDB)",
};

export function AvatarEva({
	size,
	petal,
	variant = "brand",
	pulse,
}: AvatarEvaProps) {
	const isHero = variant === "hero";

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
				position: "relative",
				width: size,
				height: size,
				flexShrink: 0,
				borderRadius: "50%",
				background: isHero ? "rgba(255,255,255,0.92)" : gradients[variant],
				boxShadow: isHero
					? "0 0 44px rgba(255,255,255,0.9), 0 12px 32px rgba(179,157,219,0.35)"
					: undefined,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					width: petal,
					height: petal,
					background: isHero
						? "linear-gradient(135deg, #E9A7C3, #B39DDB)"
						: "#FFFFFF",
					borderRadius: "0 50% 50% 50%",
					transform: "rotate(45deg)",
				}}
			/>
		</div>
	);
}
