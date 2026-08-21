import { EvaIcon } from "./eva-icon";

type AvatarEvaProps = {
	size: number;
	/** Anel pulsante ao redor, usado enquanto a EVA digita. */
	pulse?: boolean;
};

/**
 * Avatar da EVA: orbe azul com a marca dela dentro e um halo que gira
 * devagar (azul virando rosa). Ver .eva-avatar em eva.css.
 */
export function AvatarEva({ size, pulse }: AvatarEvaProps) {
	return (
		<div
			aria-hidden="true"
			className={pulse ? "eva-avatar eva-avatar--pulse" : "eva-avatar"}
			style={{
				width: size,
				height: size,
				flexShrink: 0,
				borderRadius: "50%",
			}}
		>
			<EvaIcon size={Math.round(size * 0.58)} />
		</div>
	);
}
