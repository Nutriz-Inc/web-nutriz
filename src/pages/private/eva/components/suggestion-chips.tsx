import { motion, useReducedMotion } from "framer-motion";
import { EVA_SUGGESTIONS } from "../constants";

type SuggestionChipsProps = {
	onSelect: (suggestion: string) => void;
};

/**
 * Chips "Comece por aqui" da tela de boas-vindas: clicar envia a pergunta.
 * Grade de 2 colunas para a tela inicial caber sem scroll. Entram em cascata,
 * um apos o outro; com `prefers-reduced-motion` aparecem juntos e parados.
 */
export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
	const reduzirMovimento = useReducedMotion();

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: 8,
				width: "100%",
			}}
		>
			{EVA_SUGGESTIONS.map((suggestion, indice) => {
				const entrada = reduzirMovimento
					? {}
					: {
							initial: { opacity: 0, y: 10 },
							animate: { opacity: 1, y: 0 },
							transition: {
								duration: 0.3,
								delay: 0.06 * indice,
								ease: [0.22, 1, 0.36, 1] as const,
							},
						};

				return (
					<motion.button
						key={suggestion}
						{...entrada}
						type="button"
						className="eva-chip"
						onClick={() => onSelect(suggestion)}
					>
						{suggestion}
					</motion.button>
				);
			})}
		</div>
	);
}
