import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, Lightbulb, X } from "lucide-react";
import { EVA_AJUDA, EVA_PERSONAS } from "../constants";
import "../eva.css";
import type { EvaAccessMode } from "./use-eva-access";

type EvaHelpPanelProps = {
	mode: EvaAccessMode;
	onBack: () => void;
};

export function EvaHelpPanel({ mode, onBack }: EvaHelpPanelProps) {
	const persona = EVA_PERSONAS[mode];
	const ajuda = EVA_AJUDA[mode];
	const reduzirMovimento = useReducedMotion();

	const entrada = (indice: number) =>
		reduzirMovimento
			? {}
			: {
					initial: { opacity: 0, y: 10 },
					animate: { opacity: 1, y: 0 },
					transition: {
						duration: 0.3,
						delay: 0.05 * indice,
						ease: [0.22, 1, 0.36, 1] as const,
					},
				};

	return (
		<div className="eva-scope eva-help">
			<div className="eva-help-topo">
				<button
					type="button"
					className="eva-help-voltar"
					onClick={onBack}
					aria-label="Voltar para a conversa"
				>
					<ArrowLeft size={18} strokeWidth={1.8} aria-hidden="true" />
				</button>
				<p className="eva-help-titulo">
					Como usar a EVA
					{persona.rotuloDoModo ? (
						<span className="eva-widget-modo">{persona.rotuloDoModo}</span>
					) : null}
				</p>
			</div>

			<div className="eva-help-corpo">
				<motion.section {...entrada(0)} className="eva-help-bloco">
					<h3 className="eva-help-secao">O que você pode perguntar</h3>
					<ul className="eva-help-lista">
						{ajuda.oQuePerguntar.map((item) => (
							<li key={item} className="eva-help-item">
								<span className="eva-help-marca eva-help-marca--ok">
									<Check size={12} strokeWidth={2.4} aria-hidden="true" />
								</span>
								{item}
							</li>
						))}
					</ul>
				</motion.section>

				<motion.section {...entrada(1)} className="eva-help-bloco">
					<h3 className="eva-help-secao">O que ela não faz</h3>
					<ul className="eva-help-lista">
						{ajuda.oQueNaoFaz.map((item) => (
							<li key={item} className="eva-help-item">
								<span className="eva-help-marca eva-help-marca--nao">
									<X size={12} strokeWidth={2.4} aria-hidden="true" />
								</span>
								{item}
							</li>
						))}
					</ul>
				</motion.section>

				<motion.section {...entrada(2)} className="eva-help-bloco">
					<h3 className="eva-help-secao">Dicas</h3>
					<ul className="eva-help-lista">
						{ajuda.dicas.map((item) => (
							<li key={item} className="eva-help-item">
								<span className="eva-help-marca eva-help-marca--dica">
									<Lightbulb size={12} strokeWidth={2.2} aria-hidden="true" />
								</span>
								{item}
							</li>
						))}
					</ul>
				</motion.section>

				<motion.p {...entrada(3)} className="eva-help-rodape">
					A EVA não substitui avaliação médica nem decisão da equipe.
				</motion.p>
			</div>

			<button
				type="button"
				className="eva-btn-primary eva-help-cta"
				onClick={onBack}
			>
				Voltar para a conversa
			</button>
		</div>
	);
}
