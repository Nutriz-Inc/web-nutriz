import { AvatarEva } from "./avatar-eva";

type TypingIndicatorProps = {
	desktop: boolean;
};

export function TypingIndicator({ desktop }: TypingIndicatorProps) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "flex-end",
				gap: desktop ? 10 : 8,
			}}
		>
			<AvatarEva
				size={desktop ? 30 : 28}
				petal={desktop ? 10 : 9}
				variant="bubble"
				pulse="fast"
			/>
			<div
				aria-label="EVA está digitando"
				role="status"
				style={{
					background: "#F4F2F6",
					borderRadius: "18px 18px 18px 6px",
					padding: desktop ? "16px 17px" : "15px 16px",
					display: "flex",
					gap: 5,
					alignItems: "center",
				}}
			>
				<span className="eva-typing-dot" />
				<span className="eva-typing-dot" />
				<span className="eva-typing-dot" />
			</div>
		</div>
	);
}
