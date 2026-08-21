import { motion, useReducedMotion } from "framer-motion";
import {
	CalendarCheck,
	Droplet,
	type LucideIcon,
	Snowflake,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import { AvatarEva } from "../components/avatar-eva";
import { ChatInput } from "../components/chat-input";
import { EVA_SUGGESTIONS } from "../constants";
import "../eva.css";
import type { EvaAccessMode } from "./use-eva-access";

type EvaWelcomePanelProps = {
	mode: EvaAccessMode;
	onStart: (initialMessage?: string) => void;
};

/**
 * Icone de cada sugestao, na ordem de `EVA_SUGGESTIONS`. Fica aqui, e nao nas
 * constantes, porque e decisao de aparencia — a lista de perguntas continua
 * sendo so texto.
 */
const ICONES: LucideIcon[] = [Droplet, Sparkles, Snowflake, CalendarCheck];

/**
 * Abertura da EVA, no desenho da referencia (eva.jpeg):
 *
 * - identidade em linha — quadrado de cantos macios com o pastel a esquerda,
 *   nome e descricao a direita;
 * - sugestoes como pilulas do tamanho do proprio texto, empilhadas e
 *   alinhadas a esquerda, cada uma com um icone de traco fino;
 * - tres pontinhos rosa antes do campo;
 * - campo de escrever largo, em cinza bem claro, com o botao circular colado.
 *
 * Tudo cabe sem rolagem, inclusive com o aviso do modo anonimo.
 */
export function EvaWelcomePanel({ mode, onStart }: EvaWelcomePanelProps) {
	const isAnonymous = mode === "anonymous";
	const [text, setText] = useState("");
	const reduzirMovimento = useReducedMotion();

	function handleSend() {
		const trimmed = text.trim();
		if (trimmed) {
			onStart(trimmed);
		}
	}

	const entrada = (indice: number) =>
		reduzirMovimento
			? {}
			: {
					initial: { opacity: 0, y: 12 },
					animate: { opacity: 1, y: 0 },
					transition: {
						duration: 0.36,
						delay: 0.06 * indice,
						ease: [0.22, 1, 0.36, 1] as const,
					},
				};

	return (
		<div className="eva-scope eva-widget-welcome">
			<motion.div {...entrada(0)} className="eva-welcome-id">
				<AvatarEva size={76} squircle />

				<div className="eva-welcome-id-text">
					<p className="eva-welcome-name">Assistente EVA</p>
					<p className="eva-welcome-sub">
						Tire dúvidas sobre doação de leite, ordenha e amamentação.
					</p>
				</div>
			</motion.div>

			{isAnonymous && (
				<motion.p {...entrada(1)} className="eva-widget-lgpd" role="note">
					Chat público.{" "}
					<a className="eva-link" href="/registro">
						Cadastre-se
					</a>{" "}
					para um atendimento personalizado.
				</motion.p>
			)}

			<div className="eva-welcome-pills">
				{EVA_SUGGESTIONS.map((suggestion, indice) => {
					const Icone = ICONES[indice] ?? Sparkles;

					return (
						<motion.button
							key={suggestion}
							{...entrada(2 + indice)}
							type="button"
							className="eva-pill"
							onClick={() => onStart(suggestion)}
						>
							<Icone size={18} strokeWidth={1.6} aria-hidden="true" />
							{suggestion}
						</motion.button>
					);
				})}
			</div>

			<div className="eva-welcome-espaco" aria-hidden="true">
				<span className="eva-welcome-dots">
					<span className="eva-typing-dot" />
					<span className="eva-typing-dot" />
					<span className="eva-typing-dot" />
				</span>
			</div>

			<div className="eva-widget-welcome-foot-wrap">
				{isAnonymous ? (
					// Modo anonimo: o aviso LGPD e bloqueante. O botao de ciencia leva
					// ao chat preservando uma eventual pergunta vinda de um CTA (o
					// input so aparece na conversa, apos a ciencia).
					<button
						type="button"
						className="eva-btn-primary eva-widget-start"
						onClick={() => onStart()}
					>
						Entendi, começar conversa
					</button>
				) : (
					<ChatInput
						value={text}
						onChange={setText}
						onSend={handleSend}
						placeholder="Comece a conversar..."
					/>
				)}

				<p className="eva-widget-welcome-foot">
					A EVA não substitui avaliação médica.
				</p>
			</div>
		</div>
	);
}
