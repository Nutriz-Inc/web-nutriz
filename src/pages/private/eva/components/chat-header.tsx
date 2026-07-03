import { AvatarEva } from "./avatar-eva";

type ChatHeaderProps = {
	desktop: boolean;
	onBack?: () => void;
	onNewConversation?: () => void;
};

function OnlineStatus() {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: 6,
				fontSize: 13,
				fontWeight: 600,
				color: "#2E8B60",
			}}
		>
			<span
				aria-hidden="true"
				style={{
					width: 7,
					height: 7,
					borderRadius: "50%",
					background: "#4CAF7D",
				}}
			/>
			online
		</span>
	);
}

export function ChatHeader({
	desktop,
	onBack,
	onNewConversation,
}: ChatHeaderProps) {
	if (desktop) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 12,
					padding: "18px 8px 14px",
				}}
			>
				<AvatarEva size={42} petal={14} pulse="slow" />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						flex: 1,
					}}
				>
					<span style={{ fontSize: 16, fontWeight: 700 }}>EVA</span>
					<OnlineStatus />
				</div>
				<button
					type="button"
					className="eva-outline-btn"
					onClick={onNewConversation}
				>
					Nova conversa
				</button>
			</div>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 12,
				padding: "14px 20px",
				background: "rgba(255,255,255,0.92)",
				boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
			}}
		>
			<button
				type="button"
				aria-label="Voltar"
				className="eva-back-btn"
				onClick={onBack}
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M12.5 4.5 7 10l5.5 5.5"
						stroke="#1C1B1F"
						strokeWidth="1.7"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<AvatarEva size={40} petal={13} pulse="slow" />
			<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<span style={{ fontSize: 16, fontWeight: 700 }}>EVA</span>
				<OnlineStatus />
			</div>
		</div>
	);
}
