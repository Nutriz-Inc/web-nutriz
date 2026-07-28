import { AvatarEva } from "./avatar-eva";

export function TypingIndicator() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "flex-end",
				gap: 8,
			}}
		>
			<AvatarEva size={28} pulse="fast" />
			<div
				aria-label="EVA está digitando"
				role="status"
				style={{
					background: "var(--eva-bubble-eva)",
					borderRadius: "18px 18px 18px 6px",
					padding: "15px 16px",
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
