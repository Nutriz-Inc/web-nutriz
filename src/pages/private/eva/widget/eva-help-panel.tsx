import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Lightbulb, ShieldCheck } from "lucide-react";
import { EVA_AJUDA, EVA_PERSONAS } from "../constants";
import "../eva.css";
import { AvatarEva } from "../components/avatar-eva";
import type { EvaAccessMode } from "./use-eva-access";

type EvaHelpPanelProps = {
	mode: EvaAccessMode;
	onBack: () => void;
	onPerguntar: (pergunta: string) => void;
};

export function EvaHelpPanel({ mode, onBack, onPerguntar }: EvaHelpPanelProps) {
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
						delay: 0.045 * indice,
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
					aria-label="Voltar"
				>
					<ArrowLeft size={18} strokeWidth={1.8} aria-hidden="true" />
				</button>
				<span className="eva-help-topo-titulo">Como usar a EVA</span>
			</div>

			<div className="eva-help-corpo sem-barra">
				<motion.div {...entrada(0)} className="eva-help-capa">
					<span className="eva-help-capa-placa">
						<AvatarEva size={44} squircle />
					</span>
					<div className="eva-help-capa-texto">
						{persona.rotuloDoModo ? (
							<span className="eva-widget-modo eva-help-capa-modo">
								{persona.rotuloDoModo}
							</span>
						) : null}
						<p className="eva-help-capa-descricao">{persona.descricao}</p>
					</div>
				</motion.div>

				<motion.section {...entrada(1)} className="eva-help-bloco">
					<h3 className="eva-help-secao">Experimente perguntar</h3>
					<div className="eva-help-perguntas">
						{ajuda.oQuePerguntar.map((item) => (
							<button
								key={item}
								type="button"
								className="eva-help-pergunta"
								onClick={() => onPerguntar(item)}
							>
								<span>{item}</span>
								<ArrowUpRight
									size={15}
									strokeWidth={2}
									aria-hidden="true"
									className="eva-help-pergunta-seta"
								/>
							</button>
						))}
					</div>
				</motion.section>

				<motion.section
					{...entrada(2)}
					className="eva-help-bloco eva-help-cartao eva-help-cartao--limite"
				>
					<h3 className="eva-help-secao eva-help-secao--cartao">
						<ShieldCheck size={14} strokeWidth={2} aria-hidden="true" />O que
						ela não faz
					</h3>
					<ul className="eva-help-lista">
						{ajuda.oQueNaoFaz.map((item) => (
							<li key={item} className="eva-help-item">
								{item}
							</li>
						))}
					</ul>
				</motion.section>

				<motion.section
					{...entrada(3)}
					className="eva-help-bloco eva-help-cartao eva-help-cartao--dica"
				>
					<h3 className="eva-help-secao eva-help-secao--cartao">
						<Lightbulb size={14} strokeWidth={2} aria-hidden="true" />
						Dicas
					</h3>
					<ul className="eva-help-lista">
						{ajuda.dicas.map((item) => (
							<li key={item} className="eva-help-item">
								{item}
							</li>
						))}
					</ul>
				</motion.section>

				<motion.p {...entrada(4)} className="eva-help-rodape">
					A EVA não substitui avaliação médica nem decisão da equipe.
				</motion.p>
			</div>
		</div>
	);
}
