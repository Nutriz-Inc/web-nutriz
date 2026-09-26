import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type FormEvent, useState } from "react";
import { EASE_OUT } from "@/lib/easing";

type ChatInputProps = {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	placeholder?: string;
	disabled?: boolean;
	sending?: boolean;
};

export function ChatInput({
	value,
	onChange,
	onSend,
	placeholder = "Escreva sua dúvida...",
	disabled,
	sending,
}: ChatInputProps) {
	const reduzirMovimento = useReducedMotion();
	const [lancamentos, setLancamentos] = useState(0);
	const voo = reduzirMovimento ? 0 : 16;

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (value.trim() !== "") {
			setLancamentos((atual) => atual + 1);
		}
		onSend();
	}

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: "flex",
				alignItems: "center",
				gap: 8,
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
				style={{ width: 44, height: 44 }}
				disabled={disabled || sending || value.trim() === ""}
			>
				<AnimatePresence mode="popLayout" initial={false}>
					<motion.span
						key={sending ? "enviando" : `seta-${lancamentos}`}
						className="eva-send-icone"
						initial={{ opacity: 0, y: sending ? 0 : voo }}
						animate={{
							opacity: 1,
							y: 0,
							transition: { duration: 0.22, ease: EASE_OUT },
						}}
						exit={{
							opacity: 0,
							y: sending ? 0 : -voo,
							transition: { duration: 0.14, ease: EASE_OUT },
						}}
					>
						{sending ? (
							<svg
								width="18"
								height="18"
								viewBox="0 0 20 20"
								fill="none"
								aria-hidden="true"
								className="eva-send-giro"
							>
								<path
									d="M10 3a7 7 0 1 0 7 7"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
								/>
							</svg>
						) : (
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								aria-hidden="true"
							>
								<path
									d="M10 16V4M4.5 9.5 10 4l5.5 5.5"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						)}
					</motion.span>
				</AnimatePresence>
			</button>
		</form>
	);
}
