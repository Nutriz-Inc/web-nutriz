import { motion, useReducedMotion } from "framer-motion";
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
 * Boas-vindas da EVA — uma tela so, sem rolagem.
 *
 * O que manda o desenho e a altura: tudo precisa caber nos ~556px uteis do
 * modal (620px menos o cabecalho), inclusive com o aviso LGPD do modo
 * anonimo, que e o caso mais alto. Por isso as sugestoes voltaram a duas
 * colunas e os blocos sao compactos.
 *
 * A forma e a mesma do resto do app — superficie branca, `rounded-card-sm`,
 * borda `line`, tipografia Geist. O rosa entra como acento (avatar, marcador
 * de estado, barra de hover), nao como banho de cor.
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
					initial: { opacity: 0, y: 10 },
					animate: { opacity: 1, y: 0 },
					transition: {
						duration: 0.32,
						delay: 0.05 * indice,
						ease: [0.22, 1, 0.36, 1] as const,
					},
				};

	return (
		<div className="eva-scope eva-widget-welcome">
			<motion.div {...entrada(0)} className="eva-welcome-hero">
				<AvatarEva size={56} />
				<h2 className="eva-widget-welcome-title">Oi, eu sou a EVA</h2>
				<p className="eva-welcome-sub">
					Doação de leite, ordenha e amamentação — pergunte a qualquer hora.
				</p>
			</motion.div>

			{isAnonymous && (
				<motion.p {...entrada(1)} className="eva-widget-lgpd" role="note">
					Chat público: não compartilhe dados pessoais.{" "}
					<a className="eva-link" href="/registro">
						Cadastre-se
					</a>{" "}
					para um atendimento personalizado.
				</motion.p>
			)}

			<div className="eva-welcome-suggestions">
				<p className="eva-widget-welcome-label">Comece por aqui</p>

				<div className="eva-welcome-grid">
					{EVA_SUGGESTIONS.map((suggestion, indice) => (
						<motion.button
							key={suggestion}
							{...entrada(2 + indice)}
							type="button"
							className="eva-welcome-row"
							onClick={() => onStart(suggestion)}
						>
							{suggestion}
						</motion.button>
					))}
				</div>
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
						placeholder="Pergunte à EVA..."
					/>
				)}
				<p className="eva-widget-welcome-foot">
					A EVA não substitui avaliação médica.
				</p>
			</div>
		</div>
	);
}
