import { Dialog } from "radix-ui";
import { useCallback, useState } from "react";
import { EVA_PERSONAS } from "../constants";
import { useEvaChat } from "../hooks/use-eva-chat";
import { marcarBoasVindasVistas } from "./eva-boas-vindas";
import { EvaBotaoFechar } from "./eva-botao-fechar";
import { EvaChatPanel } from "./eva-chat-panel";
import { EvaHelpPanel } from "./eva-help-panel";
import { EvaTransicaoDeVisao } from "./eva-transicao-de-visao";
import { EvaWelcomePanel } from "./eva-welcome-panel";
import type { EvaAccessMode } from "./use-eva-access";

export type EvaVisao = "welcome" | "chat" | "ajuda";

type EvaModalConteudoProps = {
	mode: EvaAccessMode;
	userId: string | null;
	visaoInicial: EvaVisao;
	mensagemInicial?: string;
	onFechar: () => void;
};

export function EvaModalConteudo({
	mode,
	userId,
	visaoInicial,
	mensagemInicial,
	onFechar,
}: EvaModalConteudoProps) {
	const rotuloDoModo = EVA_PERSONAS[mode].rotuloDoModo;
	const lembraDasBoasVindas = mode !== "anonymous";
	const mostrarAjuda = mode !== "anonymous";

	const chat = useEvaChat(mensagemInicial);
	const { enviarAoConectar } = chat;

	const [view, setView] = useState<EvaVisao>(visaoInicial);
	const [viewAnterior, setViewAnterior] = useState<EvaVisao>("welcome");

	function abrirAjuda() {
		setViewAnterior(view === "ajuda" ? "welcome" : view);
		setView("ajuda");
	}

	const startChat = useCallback(
		(message?: string) => {
			if (lembraDasBoasVindas) {
				marcarBoasVindasVistas(userId);
			}

			if (message) {
				enviarAoConectar(message);
			}

			setView("chat");
		},
		[lembraDasBoasVindas, userId, enviarAoConectar],
	);

	return (
		<EvaTransicaoDeVisao visao={view}>
			{view === "ajuda" ? null : view === "welcome" ? (
				<>
					{mostrarAjuda ? (
						<button
							type="button"
							className="eva-widget-ajuda eva-widget-ajuda--solto"
							onClick={abrirAjuda}
							aria-label="Como usar a EVA"
						>
							?
						</button>
					) : null}
					<div className="eva-widget-header eva-widget-header--bare">
						<EvaBotaoFechar />
						<Dialog.Title className="sr-only">Assistente EVA</Dialog.Title>
					</div>
				</>
			) : (
				<div className="eva-widget-header eva-widget-header--chat">
					{mostrarAjuda ? (
						<button
							type="button"
							className="eva-widget-ajuda"
							onClick={abrirAjuda}
							aria-label="Como usar a EVA"
						>
							?
						</button>
					) : (
						<span className="eva-widget-ajuda-vazio" />
					)}
					<Dialog.Title className="eva-widget-header-title">
						EVA
						{rotuloDoModo ? (
							<span className="eva-widget-modo">{rotuloDoModo}</span>
						) : null}
					</Dialog.Title>
					<EvaBotaoFechar />
				</div>
			)}

			{view === "ajuda" ? (
				<>
					<Dialog.Title className="sr-only">Como usar a EVA</Dialog.Title>
					<EvaHelpPanel
						mode={mode}
						onBack={() => setView(viewAnterior)}
						onPerguntar={(pergunta) => startChat(pergunta)}
					/>
				</>
			) : view === "welcome" ? (
				<EvaWelcomePanel mode={mode} onStart={startChat} />
			) : (
				<EvaChatPanel chat={chat} onClose={onFechar} />
			)}
		</EvaTransicaoDeVisao>
	);
}
