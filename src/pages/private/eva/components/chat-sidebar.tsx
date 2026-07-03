import type { Conversation } from "../types";

const CONVERSATIONS: Conversation[] = [
	{
		id: "1",
		title: "Doação com bebê de 4 meses",
		timeLabel: "Agora",
		active: true,
	},
	{
		id: "2",
		title: "Como armazenar o leite",
		timeLabel: "Ontem · 21:10",
		active: false,
	},
	{
		id: "3",
		title: "Primeira ordenha",
		timeLabel: "Seg · 08:32",
		active: false,
	},
	{
		id: "4",
		title: "Cadastro no Lactare",
		timeLabel: "12 jun",
		active: false,
	},
];

type ChatSidebarProps = {
	variant: "empty" | "history";
	onNewConversation: () => void;
};

export function ChatSidebar({ variant, onNewConversation }: ChatSidebarProps) {
	const history = variant === "history";

	return (
		<div
			style={{
				width: 280,
				flexShrink: 0,
				background: "#FAF9FB",
				borderRadius: "0 24px 0 0",
				padding: history ? "24px 16px" : "24px 20px",
				display: "flex",
				flexDirection: "column",
				gap: history ? 22 : 24,
			}}
		>
			<button
				type="button"
				className="eva-btn-primary"
				onClick={onNewConversation}
				style={{
					height: 50,
					margin: history ? "0 4px" : undefined,
					fontSize: 15,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 9,
				}}
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M8 3v10M3 8h10"
						stroke="#FFFFFF"
						strokeWidth="1.8"
						strokeLinecap="round"
					/>
				</svg>
				Nova conversa
			</button>
			{history ? (
				<div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
					<span
						style={{
							fontSize: 13,
							fontWeight: 700,
							letterSpacing: "0.18em",
							color: "#6B6B76",
							padding: "0 8px 8px",
						}}
					>
						CONVERSAS
					</span>
					{CONVERSATIONS.map((conversation) => (
						<button
							key={conversation.id}
							type="button"
							className={
								conversation.active
									? "eva-sidebar-item eva-sidebar-item--active"
									: "eva-sidebar-item"
							}
						>
							<span
								style={{
									fontSize: 14,
									fontWeight: conversation.active ? 700 : 600,
									color: "#1C1B1F",
								}}
							>
								{conversation.title}
							</span>
							<span style={{ fontSize: 13, color: "#6B6B76" }}>
								{conversation.timeLabel}
							</span>
						</button>
					))}
				</div>
			) : (
				<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
					<span
						style={{
							fontSize: 13,
							fontWeight: 700,
							letterSpacing: "0.18em",
							color: "#6B6B76",
						}}
					>
						CONVERSAS
					</span>
					<p
						style={{
							margin: 0,
							fontSize: 14,
							lineHeight: 1.55,
							color: "#6B6B76",
						}}
					>
						Suas conversas com a EVA ficarão guardadas aqui.
					</p>
				</div>
			)}
		</div>
	);
}
