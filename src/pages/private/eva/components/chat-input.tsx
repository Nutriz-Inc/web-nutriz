import type { FormEvent } from "react";

type ChatInputProps = {
	desktop: boolean;
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	disabled?: boolean;
	sending?: boolean;
};

export function ChatInput({
	desktop,
	value,
	onChange,
	onSend,
	disabled,
	sending,
}: ChatInputProps) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onSend();
	}

	return (
		<div
			style={
				desktop
					? {
							padding: "10px 8px 20px",
							display: "flex",
							flexDirection: "column",
							gap: 9,
						}
					: {
							padding: "10px 16px 14px",
							background: "rgba(255,255,255,0.92)",
							display: "flex",
							flexDirection: "column",
							gap: 8,
						}
			}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					alignItems: "center",
					gap: desktop ? 12 : 10,
				}}
			>
				<input
					className={desktop ? "eva-input eva-input--desktop" : "eva-input"}
					type="text"
					placeholder="Escreva sua dúvida..."
					aria-label="Escreva sua dúvida"
					value={value}
					onChange={(event) => onChange(event.target.value)}
					disabled={disabled}
				/>
				<button
					type="submit"
					aria-label="Enviar mensagem"
					className="eva-send-btn"
					style={{
						width: desktop ? 54 : 50,
						height: desktop ? 54 : 50,
					}}
					disabled={disabled || sending || value.trim() === ""}
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M10 16V4M4.5 9.5 10 4l5.5 5.5"
							stroke="#FFFFFF"
							strokeWidth="1.8"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</form>
			<p
				style={{
					margin: 0,
					textAlign: "center",
					fontSize: 13,
					color: "#6B6B76",
				}}
			>
				A EVA não substitui avaliação médica.
			</p>
		</div>
	);
}
