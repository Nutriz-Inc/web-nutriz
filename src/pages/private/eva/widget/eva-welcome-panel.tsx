import { motion, useReducedMotion } from "framer-motion";
import {
	AlertTriangle,
	BookOpen,
	CalendarCheck,
	ChartColumn,
	CheckCircle2,
	Droplet,
	FlaskConical,
	ListChecks,
	type LucideIcon,
	MapPin,
	Route,
	Snowflake,
	Sparkles,
	Timer,
} from "lucide-react";
import { useState } from "react";
import { AvatarEva } from "../components/avatar-eva";
import { ChatInput } from "../components/chat-input";
import { EVA_PERSONAS } from "../constants";
import "../eva.css";
import type { EvaAccessMode } from "./use-eva-access";

type EvaWelcomePanelProps = {
	mode: EvaAccessMode;
	onStart: (initialMessage?: string) => void;
};

const ICONES: Record<string, LucideIcon> = {
	gota: Droplet,
	brilho: Sparkles,
	floco: Snowflake,
	agenda: CalendarCheck,
	etapas: ListChecks,
	mapa: MapPin,
	grafico: ChartColumn,
	frasco: FlaskConical,
	rota: Route,
	check: CheckCircle2,
	guia: BookOpen,
	relogio: Timer,
	alerta: AlertTriangle,
};

export function EvaWelcomePanel({ mode, onStart }: EvaWelcomePanelProps) {
	const isAnonymous = mode === "anonymous";
	const persona = EVA_PERSONAS[mode];
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
			<span className="eva-welcome-topo" aria-hidden="true" />

			<motion.div {...entrada(0)} className="eva-welcome-id">
				<AvatarEva size={76} squircle />

				<div className="eva-welcome-id-text">
					<p className="eva-welcome-name">
						Assistente EVA
						{persona.rotuloDoModo ? (
							<span className="eva-widget-modo">{persona.rotuloDoModo}</span>
						) : null}
					</p>
					<p className="eva-welcome-sub">{persona.descricao}</p>
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

			<span className="eva-welcome-meio" aria-hidden="true" />

			<div className="eva-welcome-pills">
				{persona.sugestoes.map((suggestion, indice) => {
					const Icone = ICONES[persona.icones[indice]] ?? Sparkles;

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
