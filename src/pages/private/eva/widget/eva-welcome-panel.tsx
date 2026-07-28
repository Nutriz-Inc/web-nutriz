import { useState } from "react";
import { AvatarEva } from "../components/avatar-eva";
import { ChatInput } from "../components/chat-input";
import { SuggestionChips } from "../components/suggestion-chips";
import "../eva.css";
import type { EvaAccessMode } from "./use-eva-access";

type EvaWelcomePanelProps = {
	mode: EvaAccessMode;
	onStart: (initialMessage?: string) => void;
};

export function EvaWelcomePanel({ mode, onStart }: EvaWelcomePanelProps) {
	const isAnonymous = mode === "anonymous";
	// Modo anonimo: input e chips so liberam apos a ciencia do aviso LGPD.
	const [acknowledged, setAcknowledged] = useState(!isAnonymous);
	const [text, setText] = useState("");

	const locked = isAnonymous && !acknowledged;

	function handleSend() {
		const trimmed = text.trim();
		if (trimmed) {
			onStart(trimmed);
		}
	}

	return (
		<div className="eva-scope eva-widget-welcome">
			<div className="eva-widget-welcome-top">
				<AvatarEva size={64} />
				<h2 className="eva-widget-welcome-title">
					Fale com a EVA sobre amamentação
				</h2>

				{isAnonymous && (
					<div className="eva-widget-lgpd" role="note">
						Este é um chat público. Não compartilhe dados pessoais (CPF, e-mail,
						telefone). Para um atendimento personalizado e seguro,{" "}
						<a className="eva-link" href="/registro">
							cadastre-se na Nutriz
						</a>
						.
					</div>
				)}

				{locked ? (
					<button
						type="button"
						className="eva-btn-primary eva-widget-start"
						onClick={() => setAcknowledged(true)}
					>
						Entendi, começar conversa
					</button>
				) : (
					<div className="eva-widget-welcome-suggestions">
						<p className="eva-widget-welcome-label">Comece por aqui</p>
						<SuggestionChips onSelect={(suggestion) => onStart(suggestion)} />
					</div>
				)}
			</div>

			{!locked && (
				<div className="eva-widget-welcome-foot-wrap">
					<ChatInput
						value={text}
						onChange={setText}
						onSend={handleSend}
						placeholder="Pergunte à EVA..."
					/>
					<p className="eva-widget-welcome-foot">
						A EVA pode se enganar e não substitui avaliação médica. Suas
						conversas são protegidas.
					</p>
				</div>
			)}
		</div>
	);
}
