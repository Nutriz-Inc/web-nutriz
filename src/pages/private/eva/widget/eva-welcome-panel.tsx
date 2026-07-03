import { AvatarEva } from "../components/avatar-eva";
import { SuggestionChips } from "../components/suggestion-chips";
import "../eva.css";
import type { EvaAccessMode } from "./use-eva-access";

type EvaWelcomePanelProps = {
	mode: EvaAccessMode;
	onStart: (initialMessage?: string) => void;
};

export function EvaWelcomePanel({ mode, onStart }: EvaWelcomePanelProps) {
	const isAnonymous = mode === "anonymous";

	return (
		<div className="eva-scope eva-widget-welcome">
			<div className="eva-widget-welcome-hero">
				<AvatarEva size={72} petal={24} variant="hero" />
				<h2 className="eva-widget-welcome-title">
					Olá, eu sou a <span>EVA</span>
				</h2>
				<p className="eva-widget-welcome-sub">
					Tire suas dúvidas sobre doação de leite e amamentação, a qualquer
					hora.
				</p>
			</div>

			<SuggestionChips onSelect={(suggestion) => onStart(suggestion)} />

			{isAnonymous && (
				<div className="eva-widget-lgpd" role="note">
					Este é um chat público. Não compartilhe dados pessoais (CPF, e-mail,
					telefone). Para um atendimento personalizado e seguro,{" "}
					<a className="eva-link" href="/login">
						cadastre-se na Nutriz
					</a>
					.
				</div>
			)}

			<button
				type="button"
				className="eva-btn-primary eva-widget-start"
				onClick={() => onStart()}
			>
				{isAnonymous ? "Entendi, começar conversa" : "Começar conversa"}
			</button>

			<p className="eva-widget-welcome-foot">
				Suas conversas são protegidas. A EVA não substitui avaliação médica.
			</p>
		</div>
	);
}
