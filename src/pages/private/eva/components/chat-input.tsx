import type { FormEvent } from "react";

type ChatInputProps = {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	placeholder?: string;
	disabled?: boolean;
	sending?: boolean;
};

// Linha de input do chat: pill de texto + botao circular preto de enviar.
// O rodape de aviso medico fica a cargo de cada painel (textos diferem).
export function ChatInput({
	value,
	onChange,
	onSend,
	placeholder = "Escreva sua dúvida...",
	disabled,
	sending,
}: ChatInputProps) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onSend();
	}

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: "flex",
				alignItems: "center",
				gap: 10,
			}}
		>
			<input
				className="eva-input"
				type="text"
				placeholder={placeholder}
				aria-label={placeholder}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				disabled={disabled}
			/>
			<button
				type="submit"
				aria-label="Enviar mensagem"
				className="eva-send-btn"
				style={{ width: 50, height: 50 }}
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
	);
}
