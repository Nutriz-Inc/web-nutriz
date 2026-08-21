import { EvaIcon } from "./eva-icon";

type AvatarEvaProps = {
	size: number;
	/** Anel pulsante ao redor, usado enquanto a EVA digita. */
	pulse?: boolean;
};

/**
 * Avatar da EVA: disco rosa pastel com a marca dela dentro (ver eva-icon).
 * Era um circulo de gradiente vazio, sem simbolo nenhum.
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
