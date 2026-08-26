import lotus from "@/assets/images/eva-lotus.png";

type AvatarEvaProps = {
	size: number;
	pulse?: boolean;
	squircle?: boolean;
};

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
