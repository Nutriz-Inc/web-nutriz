import type { ChatMessage } from "../types";
import { AvatarEva } from "./avatar-eva";

type MessageBubbleProps = {
	message: ChatMessage;
	desktop: boolean;
	greeting?: boolean;
};

export function MessageBubble({
	message,
	desktop,
	greeting,
}: MessageBubbleProps) {
	if (message.role === "nutriz") {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-end",
					gap: 5,
				}}
			>
				<div
					style={{
						maxWidth: desktop ? "68%" : "76%",
						background: "linear-gradient(135deg, #FBE4EC, #EFDFF4)",
						borderRadius: "18px 18px 6px 18px",
						padding: desktop ? "13px 16px" : "12px 15px",
						fontSize: 15,
						lineHeight: 1.55,
					}}
				>
					{message.paragraphs.join("\n\n")}
				</div>
				{message.time && (
					<span style={{ fontSize: 13, color: "#6B6B76", paddingRight: 4 }}>
						{message.time}
					</span>
				)}
			</div>
		);
	}

	const paragraphs = message.paragraphs.map((text, index) => ({
		key: `${message.id}-${index}`,
		text,
	}));

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
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 5,
					maxWidth: desktop ? (greeting ? "68%" : "72%") : "80%",
				}}
			>
				<div
					style={{
						background: "#F4F2F6",
						borderRadius: "18px 18px 18px 6px",
						padding: desktop
							? greeting
								? "13px 16px"
								: "14px 16px"
							: "13px 15px",
						fontSize: 15,
						lineHeight: 1.55,
						display: "flex",
						flexDirection: "column",
						gap: 10,
					}}
				>
					{paragraphs.map((paragraph) => (
						<p key={paragraph.key} style={{ margin: 0 }}>
							{paragraph.text}
						</p>
					))}
				</div>
				{message.time && (
					<span style={{ fontSize: 13, color: "#6B6B76", paddingLeft: 4 }}>
						{message.time}
					</span>
				)}
			</div>
		</div>
	);
}
