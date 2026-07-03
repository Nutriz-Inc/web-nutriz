import { useNavigate } from "react-router-dom";
import { AvatarEva } from "./components/avatar-eva";
import { ChatSidebar } from "./components/chat-sidebar";
import { SiteHeader } from "./components/site-header";
import { SuggestionChips } from "./components/suggestion-chips";
import "./eva.css";
import { useIsDesktop } from "./hooks/use-is-desktop";

function StatusPill() {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: 7,
				background: "rgba(255,255,255,0.6)",
				borderRadius: 999,
				padding: "7px 14px",
				fontSize: 13,
				fontWeight: 600,
				color: "#4A3A4F",
			}}
		>
			<span
				aria-hidden="true"
				style={{
					width: 6,
					height: 6,
					borderRadius: "50%",
					background: "#2E8B60",
				}}
			/>
			Resposta em segundos
		</span>
	);
}

function HeroTitle({ desktop }: { desktop: boolean }) {
	return (
		<h1
			style={{
				margin: 0,
				fontSize: desktop ? 40 : 30,
				fontWeight: 700,
				letterSpacing: "-0.02em",
				lineHeight: desktop ? 1.15 : 1.2,
			}}
		>
			Olá, eu sou a <span style={{ color: "#D96B8F" }}>EVA</span>
		</h1>
	);
}

function CapsLabel() {
	return (
		<span
			style={{
				fontSize: 13,
				fontWeight: 700,
				letterSpacing: "0.18em",
				color: "#6E4658",
			}}
		>
			SUA ASSISTENTE 24 HORAS
		</span>
	);
}

export function EvaWelcomeScreen() {
	const navigate = useNavigate();
	const isDesktop = useIsDesktop();

	function startConversation() {
		navigate("/eva/chat");
	}

	function selectSuggestion(suggestion: string) {
		navigate("/eva/chat", { state: { initialMessage: suggestion } });
	}

	if (isDesktop) {
		return (
			<div
				className="eva-scope"
				style={{
					minHeight: "100dvh",
					background: "#FFFFFF",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<SiteHeader />
				<div style={{ flex: 1, display: "flex", minHeight: 0 }}>
					<ChatSidebar variant="empty" onNewConversation={startConversation} />
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							gap: 26,
							padding: 40,
						}}
					>
						<div
							style={{
								width: 720,
								maxWidth: "100%",
								position: "relative",
								borderRadius: 28,
								overflow: "hidden",
								background:
									"radial-gradient(120% 130% at 12% 0%, #F8BBD0 0%, rgba(248,187,208,0) 55%), radial-gradient(100% 110% at 90% 12%, #CE93D8 0%, rgba(206,147,216,0) 60%), radial-gradient(130% 140% at 55% 115%, #B39DDB 0%, rgba(179,157,219,0) 58%), #FDF4F8",
								boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: 14,
								padding: "52px 60px 46px",
								textAlign: "center",
							}}
						>
							<div
								style={{
									position: "relative",
									width: "100%",
									height: 170,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<div
									style={{
										position: "absolute",
										left: "50%",
										top: "50%",
										transform: "translate(-50%, -50%)",
										width: 120,
										height: 120,
										borderRadius: "50%",
										background: "rgba(255,255,255,0.35)",
									}}
								/>
								<div
									style={{
										position: "absolute",
										left: "50%",
										top: "50%",
										transform: "translate(-50%, -50%)",
										width: 180,
										height: 180,
										borderRadius: "50%",
										border: "1px solid rgba(255,255,255,0.65)",
									}}
								/>
								<div
									style={{
										position: "absolute",
										left: "50%",
										top: "50%",
										transform: "translate(-50%, -50%)",
										width: 244,
										height: 244,
										borderRadius: "50%",
										border: "1px solid rgba(255,255,255,0.4)",
									}}
								/>
								<AvatarEva size={96} petal={31} variant="hero" />
							</div>
							<StatusPill />
							<CapsLabel />
							<HeroTitle desktop />
							<p
								style={{
									margin: 0,
									fontSize: 16,
									lineHeight: 1.55,
									color: "#52505A",
									maxWidth: 400,
								}}
							>
								Tire suas dúvidas sobre doação de leite e amamentação, a
								qualquer hora.
							</p>
						</div>
						<SuggestionChips desktop onSelect={selectSuggestion} />
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: 14,
							}}
						>
							<button
								type="button"
								className="eva-btn-primary"
								onClick={startConversation}
								style={{ height: 54, padding: "0 44px", fontSize: 16 }}
							>
								Começar conversa
							</button>
							<a className="eva-link" href="#faq">
								Ver perguntas frequentes
							</a>
						</div>
						<p style={{ margin: 0, fontSize: 13, color: "#6B6B76" }}>
							Suas conversas são protegidas. A EVA não substitui avaliação
							médica.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className="eva-scope"
			style={{
				minHeight: "100dvh",
				background: "#FFFFFF",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					position: "relative",
					flex: 1,
					background:
						"radial-gradient(130% 90% at 15% 8%, #F8BBD0 0%, rgba(248,187,208,0) 58%), radial-gradient(110% 85% at 88% 18%, #CE93D8 0%, rgba(206,147,216,0) 62%), radial-gradient(140% 110% at 55% 105%, #B39DDB 0%, rgba(179,157,219,0) 60%), #FDF4F8",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "18px 20px",
					}}
				>
					<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
						<AvatarEva size={28} petal={10} />
						<span
							style={{
								fontSize: 17,
								fontWeight: 800,
								letterSpacing: "-0.01em",
							}}
						>
							Nutriz
						</span>
					</div>
					<button
						type="button"
						aria-label="Abrir menu"
						className="eva-menu-btn"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M3 6.5h14M3 13.5h14"
								stroke="#1C1B1F"
								strokeWidth="1.6"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</div>
				<div
					style={{
						position: "relative",
						height: 250,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							position: "absolute",
							width: 132,
							height: 132,
							borderRadius: "50%",
							background: "rgba(255,255,255,0.35)",
						}}
					/>
					<div
						style={{
							position: "absolute",
							width: 196,
							height: 196,
							borderRadius: "50%",
							border: "1px solid rgba(255,255,255,0.65)",
						}}
					/>
					<div
						style={{
							position: "absolute",
							width: 260,
							height: 260,
							borderRadius: "50%",
							border: "1px solid rgba(255,255,255,0.4)",
						}}
					/>
					<AvatarEva size={104} petal={34} variant="hero" />
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 12,
						padding: "18px 32px 40px",
						textAlign: "center",
					}}
				>
					<StatusPill />
					<CapsLabel />
					<HeroTitle desktop={false} />
					<p
						style={{
							margin: 0,
							fontSize: 15,
							lineHeight: 1.55,
							color: "#52505A",
							maxWidth: 290,
						}}
					>
						Tire suas dúvidas sobre doação de leite e amamentação, a qualquer
						hora.
					</p>
				</div>
			</div>
			<div
				style={{
					background: "#FFFFFF",
					borderRadius: "28px 28px 0 0",
					marginTop: -24,
					padding: "26px 24px 22px",
					display: "flex",
					flexDirection: "column",
					gap: 18,
					boxShadow: "0 -8px 24px rgba(0,0,0,0.04)",
				}}
			>
				<SuggestionChips onSelect={selectSuggestion} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 14,
					}}
				>
					<button
						type="button"
						className="eva-btn-primary"
						onClick={startConversation}
						style={{ width: "100%", height: 54, fontSize: 16 }}
					>
						Começar conversa
					</button>
					<a className="eva-link" href="#faq">
						Ver perguntas frequentes
					</a>
				</div>
				<p
					style={{
						margin: 0,
						textAlign: "center",
						fontSize: 13,
						lineHeight: 1.5,
						color: "#6B6B76",
					}}
				>
					Suas conversas são protegidas. A EVA não substitui avaliação médica.
				</p>
			</div>
		</div>
	);
}
